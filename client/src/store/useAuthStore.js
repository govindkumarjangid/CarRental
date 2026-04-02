import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useAuthStore = create(persist(
    (set, get) => ({
        user: JSON.parse(localStorage.getItem("user")) || null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        isOwner: false,
        token: localStorage.getItem("token") || null,

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

        fetchDashboardData: async () => {
            set({ dashboardLoading: true });
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    axiosInstance.defaults.headers.common["Authorization"] = token;
                }
                const { data } = await axiosInstance.get("/api/owner/dashboard");
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

        showReview: false,
        setShowReview: (value) => set({ showReview: value }),
        reviews: [],
        reviewLoading: false,

        fetchReviews: async () => {
            set({ reviewLoading: true });
            try {
                const { data } = await axiosInstance.get("/api/user/get-reviews");
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
                const token = localStorage.getItem("token");
                if (token) {
                    axiosInstance.defaults.headers.common["Authorization"] = token;
                }
                const { data } = await axiosInstance.post("/api/user/add-review", formData);
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
                const token = localStorage.getItem("token");
                if (token) {
                    axiosInstance.defaults.headers.common["Authorization"] = token;
                }
                const formData = new FormData();
                formData.append("image", imageFile);
                const { data } = await axiosInstance.post("/api/owner/update-image", formData);
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

        fetchUser: async () => {
            set({ isLoading: true, error: null });
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    axiosInstance.defaults.headers.common["Authorization"] = token;
                }
                const { data } = await axiosInstance.get("/api/user/data");
                if (data.success) {
                    set({
                        user: data.user,
                        isOwner: data.user.role === "owner",
                        isAuthenticated: true,
                        isLoading: false,
                    });
                    localStorage.setItem("user", JSON.stringify(data.user));
                } else {
                    set({ user: null, token: null, isOwner: false, isAuthenticated: false, isLoading: false });
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                }
            } catch (error) {
                toast.error(error.message)
                set({ isAuthenticated: false, isLoading: false, error: error?.message || "Something went wrong" });
            }
        },

        signup: async (userData) => {
            set({ isLoading: true, error: null });
            try {
                const { data } = await axiosInstance.post("/api/user/register", userData);
                if (data.success) {
                    localStorage.setItem("token", data.token);
                    axiosInstance.defaults.headers.common["Authorization"] = data.token;

                    const userRes = await axiosInstance.get("/api/user/data");
                    if (userRes.data.success) {
                        localStorage.setItem("user", JSON.stringify(userRes.data.user));
                        set({
                            token: data.token,
                            user: userRes.data.user,
                            isOwner: userRes.data.user.role === "owner",
                            isAuthenticated: true,
                            isLoading: false,
                        });
                    }
                    toast.success("Account created successfully!");
                } else {
                    set({ isLoading: false });
                    toast.error(data.message);
                }
            } catch (error) {
                set({ isLoading: false, error: error?.message || "Something went wrong" });
                toast.error(error.response?.data?.message || error.message || "Something went wrong");
            }
        },

        showLogin: false,
        setShowLogin: (value) => set({ showLogin: value }),

        login: async (credentials) => {
            set({ isLoading: true, error: null });
            try {
                const { data } = await axiosInstance.post("/api/user/login", credentials);
                if (data.success) {
                    localStorage.setItem("token", data.token);
                    axiosInstance.defaults.headers.common["Authorization"] = data.token;

                    const userRes = await axiosInstance.get("/api/user/data");
                    if (userRes.data.success) {
                        localStorage.setItem("user", JSON.stringify(userRes.data.user));
                        set({
                            token: data.token,
                            user: userRes.data.user,
                            isOwner: userRes.data.user.role === "owner",
                            isAuthenticated: true,
                            isLoading: false,
                        });
                    }
                    toast.success("Logged in successfully!");
                } else {
                    set({ isLoading: false });
                    toast.error(data.message);
                }
            } catch (error) {
                set({ isLoading: false, error: error?.message || "Something went wrong" });
                toast.error(error.response?.data?.message || error.message || "Something went wrong");
            }
        },

        changeRole: async () => {
            try {
                const { data } = await axiosInstance.post("/api/owner/change-role");
                if (data?.success) {
                    set({ isOwner: true });
                    const stored = JSON.parse(localStorage.getItem("user"));
                    if (stored) {
                        stored.role = "owner";
                        localStorage.setItem("user", JSON.stringify(stored));
                    }
                    toast.success(data.message || "Now you can list cars");
                } else {
                    toast.error(data?.message || "Something went wrong");
                }
            } catch (error) {
                toast.error(error?.response?.data?.message || error?.message || "Server error");
            }
        },

        logout: async (navigate) => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            axiosInstance.defaults.headers.common["Authorization"] = "";
            set({
                user: null,
                token: null,
                isOwner: false,
                isAuthenticated: false,
            });
            toast.success("Logged out successfully");
            if (navigate) navigate("/");
        },

        loadRazorpay: async () => {
            return new Promise(resolve => {
                const script = document.createElement("script");
                script.src = "https://checkout.razorpay.com/v1/checkout.js";
                script.onload = () => resolve(true);
                script.onerror = () => resolve(false);
                document.body.appendChild(script);
            });
        },

        allUsers: [],
        allUsersLoading: false,

        fetchAllUsers: async () => {
            set({ allUsersLoading: true });
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    axiosInstance.defaults.headers.common["Authorization"] = token;
                }
                const { data } = await axiosInstance.get("/api/owner/allusers");
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
                const token = localStorage.getItem("token");
                if (token) {
                    axiosInstance.defaults.headers.common["Authorization"] = token;
                }
                const { data } = await axiosInstance.post("/api/owner/block-unblock", {
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

        ownerDetails: {},
        ownerDetailsLoading: false,

        fetchOwnerDetails: async (ownerId) => {
            set({ ownerDetailsLoading: true });
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    axiosInstance.defaults.headers.common["Authorization"] = token;
                }
                const { data } = await axiosInstance.get(`/api/owner/owner-details/${ownerId}`);
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

    }),
    {
        name: 'auth-storage',
        getStorage: () => localStorage,
        partialize: (state) => ({
            user: state.user,
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            isOwner: state.isOwner,
        }),
    }
));