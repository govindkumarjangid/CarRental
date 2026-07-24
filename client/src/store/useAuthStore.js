import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

const getStoredAuth = () => {
    try {
        const stored = Cookies.get('auth-data');
        return stored ? JSON.parse(stored) : null;
    } catch {
        return null;
    }
};

const saveAuth = (data) => {
    try {
        Cookies.set('auth-data', JSON.stringify(data), {
            expires: 7,
            secure: true,
            sameSite: 'strict'
        });
    } catch (e) {
        console.error('Failed to save auth data:', e);
    }
};

const clearAuth = () => {
    Cookies.remove('auth-data');
};

const storedAuth = getStoredAuth();

export const useAuthStore = create((set, get) => ({
    user: storedAuth?.user || null,
    isAuthenticated: storedAuth?.isAuthenticated || false,
    isLoading: false,
    error: null,
    isOwner: storedAuth?.isOwner || false,
    token: storedAuth?.token || null,

    dashboardData: {
        totalCars: 0,
        totalBookings: 0,
        pendingBookings: 0,
        completedBookings: 0,
        cancelledBookings: 0,
        recentBookings: [],
        monthlyRevenue: 0,
    },
    dashboardLoading: false,

    allUsers: [],
    allUsersLoading: false,

    showLogin: false,
    setShowLogin: (value) => set({ showLogin: value }),

    showReview: false,
    setShowReview: (value) => set({ showReview: value }),
    reviews: [],
    reviewLoading: false,

    ownerDetails: {},
    ownerDetailsLoading: false,

    fetchDashboardData: async () => {
        set({ dashboardLoading: true });
        try {
            const { data } = await axiosInstance.get("/api/v1/owner/dashboard");
            if (data.success) {
                set({ dashboardData: data.dashboardData, dashboardLoading: false });
            } else {
                toast.error(data.message);
                set({ dashboardLoading: false });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Failed to load dashboard data");
            set({ dashboardLoading: false });
        }
    },

    fetchReviews: async () => {
        set({ reviewLoading: true });
        try {
            const { data } = await axiosInstance.get("/api/v1/user/get-reviews");
            if (data.success) {
                set({ reviews: data.reviews, reviewLoading: false });
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            set({ reviewLoading: false });
        }
    },

    addReview: async (formData) => {
        try {
            // console.log("Submitting review with formData:", Object.fromEntries(formData.entries()));
            const { data } = await axiosInstance.post("/api/v1/user/add-review", formData);
            // console.log("Add Review Response:", data);
            if (data.success) {
                toast.success(data.message);
                set({ showReview: false });
                await get().fetchReviews();
                return true;
            } else {
                toast.error(data.message);
                return false;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Failed to add review");
            return false;
        }
    },

    updateProfileImage: async (imageFile) => {
        try {
            const formData = new FormData();
            formData.append("image", imageFile);
            const { data } = await axiosInstance.post("/api/v1/owner/update-image", formData);
            if (data.success) {
                toast.success(data.message);
                await get().fetchUser();
                return true;
            } else {
                toast.error(data.message || "Failed to update image");
                return false;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Server error");
            return false;
        }
    },

    updateProfileDetails: async (profileData) => {
        try {
            const { data } = await axiosInstance.post("/api/v1/user/update-profile", profileData);
            if (data.success) {
                toast.success(data.message || "Profile updated successfully!");
                await get().fetchUser();
                return true;
            } else {
                toast.error(data.message || "Failed to update profile");
                return false;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Failed to update profile");
            return false;
        }
    },

    fetchUser: async () => {
        set({ isLoading: true, error: null });
        try {
            const { data } = await axiosInstance.get("/api/v1/user/data");
            if (data?.success) {
                const userObj = data.data?.user || data.user;
                if (!userObj) {
                    set({ user: null, token: null, isOwner: false, isAuthenticated: false, isLoading: false });
                    clearAuth();
                    return;
                }
                const isOwnerRole = userObj.role === "owner";
                set({
                    user: userObj,
                    isOwner: isOwnerRole,
                    isAuthenticated: true,
                    isLoading: false,
                });
                saveAuth({
                    user: userObj,
                    token: get().token,
                    isAuthenticated: true,
                    isOwner: isOwnerRole,
                });
            } else {
                set({ user: null, token: null, isOwner: false, isAuthenticated: false, isLoading: false });
                clearAuth();
            }
        } catch (error) {
            set({ isAuthenticated: false, isLoading: false, error: error?.message || "Something went wrong" });
        }
    },

    signup: async (userData) => {
        set({ isLoading: true, error: null });
        try {
            const { data } = await axiosInstance.post("/api/v1/auth/register", userData);
            if (data.success) {
                const userObj = data.data?.user || data.user;
                const tokenVal = data.data?.token || data.token;
                const authData = {
                    token: tokenVal,
                    user: userObj,
                    isOwner: userObj?.role === "owner",
                    isAuthenticated: true,
                };
                set({ ...authData, isLoading: false, showLogin: false });
                saveAuth(authData);
                toast.success(data.message || "Account created successfully!");
                return true;
            } else {
                set({ isLoading: false });
                toast.error(data.message);
                return false;
            }
        } catch (error) {
            set({ isLoading: false, error: error?.message || "Something went wrong" });
            toast.error(error.response?.data?.message || error.message || "Something went wrong");
            return false;
        }
    },

    login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
            const { data } = await axiosInstance.post("/api/v1/auth/login", credentials);
            if (data.success) {
                const userObj = data.data?.user || data.user;
                const tokenVal = data.data?.token || data.token;
                const authData = {
                    token: tokenVal,
                    user: userObj,
                    isOwner: userObj?.role === "owner",
                    isAuthenticated: true,
                };
                set({ ...authData, isLoading: false, showLogin: false });
                saveAuth(authData);
                toast.success(data.message || "Logged in successfully!");
                return true;
            } else {
                set({ isLoading: false });
                toast.error(data.message);
                return false;
            }
        } catch (error) {
            set({ isLoading: false, error: error?.message || "Something went wrong" });
            toast.error(error.response?.data?.message || error.message || "Something went wrong");
            return false;
        }
    },

    googleLogin: async (credentialResponse, role = "user", mode = "login") => {
        set({ isLoading: true, error: null });
        try {
            const payload = {
                credential: credentialResponse.credential,
                role,
                mode
            };
            const endpoint = mode === "register" ? "/api/v1/auth/google/register" : "/api/v1/auth/google/login";
            const { data } = await axiosInstance.post(endpoint, payload);
            if (data.success) {
                const userObj = data.data?.user || data.user;
                const tokenVal = data.data?.token || data.token;
                const authData = {
                    token: tokenVal,
                    user: userObj,
                    isOwner: userObj?.role === "owner",
                    isAuthenticated: true,
                };
                set({ ...authData, isLoading: false, showLogin: false });
                saveAuth(authData);
                toast.success(data.message || (mode === "register" ? "Registered with Google!" : "Logged in with Google!"));
                return true;
            } else {
                set({ isLoading: false });
                toast.error(data.message || "Google auth failed");
                return false;
            }
        } catch (error) {
            set({ isLoading: false, error: error?.response?.data?.message || error?.message || "Google auth error" });
            toast.error(error.response?.data?.message || error.message || "Google auth error");
            return false;
        }
    },

    changeRole: async () => {
        try {
            const { data } = await axiosInstance.post("/api/v1/owner/change-role");
            if (data?.success) {
                const currentUser = get().user;
                const updatedUser = { ...currentUser, role: "owner" };
                set({ isOwner: true, user: updatedUser });
                saveAuth({
                    user: updatedUser,
                    token: get().token,
                    isAuthenticated: true,
                    isOwner: true,
                });
                toast.success(data.message || "Now you can list cars");
            } else {
                toast.error(data?.message || "Something went wrong");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message || "Server error");
        }
    },

    logout: async (navigate) => {
        try {
            await axiosInstance.post("/api/v1/auth/logout");
        } catch {
            // ignore network errors on logout
        }
        set({
            user: null,
            token: null,
            isOwner: false,
            isAuthenticated: false,
        });
        clearAuth();
        toast.success("Logged out successfully");
        if (navigate) navigate("/");
    },

    loadRazorpay: async () => {
        if (window.Razorpay) return true;

        return new Promise(resolve => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    },

    fetchAllUsers: async () => {
        set({ allUsersLoading: true });
        try {
            const { data } = await axiosInstance.get("/api/v1/owner/allusers");
            if (data.success) {
                set({ allUsers: data.users, allUsersLoading: false });
            } else {
                toast.error("Failed to fetch users");
                set({ allUsersLoading: false });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Failed to fetch users");
            set({ allUsersLoading: false });
        }
    },

    handleBlockToggle: async (userId, isBlocked) => {
        try {
            const { data } = await axiosInstance.post("/api/v1/owner/block-unblock", {
                userId,
                isBlocked,
            });
            if (data.success) {
                toast.success(data.message);
                await get().fetchAllUsers();
            } else {
                toast.error("Failed to update user status");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Failed to update user status");
        }
    },

    fetchOwnerDetails: async (ownerId) => {
        set({ ownerDetailsLoading: true });
        try {
            const { data } = await axiosInstance.get(`/api/v1/owner/owner-details/${ownerId}`);
            if (data.success) {
                set({ ownerDetails: data.owner });
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Failed to fetch owner details");
        } finally {
            set({ ownerDetailsLoading: false });
        }
    },

}));
