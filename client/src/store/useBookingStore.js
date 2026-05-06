import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useBookingStore = create((set, get) => ({
    bookings: [],
    bookingLoading: false,
    pickupDate: null,
    returnDate: null,
    ownerBookings: [],
    ownerBookingLoading: true,
    setPickupDate: (date) => set({ pickupDate: date }),
    setReturnDate: (date) => set({ returnDate: date }),

    fetchUserBookings: async () => {
        set({ bookingLoading: true });
        try {
            const { data } = await axiosInstance.get("/api/bookings/user");
            if (data.success) {
                set({ bookings: data.bookings, bookingLoading: false });
            } else {
                toast.error(data.message);
                set({ bookingLoading: false });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Failed to fetch bookings");
            set({ bookingLoading: false });
        }
    },

    createUserBooking: async (bookingData, navigate) => {
        set({ bookingLoading: true });
        try {
            const { data } = await axiosInstance.post("/api/bookings/create", bookingData);
            if (data.success) {
                toast.success("Booking Created");
                set({ bookingLoading: false });
                navigate("/my-bookings");
            } else {
                toast.error(data.message);
                set({ bookingLoading: false });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Failed to create booking");
            set({ bookingLoading: false });
        }
    },

    createOnlineBooking: async (bookingData) => {
        set({ bookingLoading: true });
        try {
            const { data } = await axiosInstance.post("/api/bookings/create-online", bookingData);
            if (data.success) {
                set({ bookingLoading: false });
                return data;
            } else {
                toast.error(data.message);
                set({ bookingLoading: false });
                return null;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Failed to create online booking");
            set({ bookingLoading: false });
            return null;
        }
    },

    verifyPayment: async (payload) => {
        try {
            const { data } = await axiosInstance.post("/api/bookings/verify-payment", payload);
            return data;
        } catch (error) {
            return { success: false };
        }
    },

    fetchOwnerBookings: async () => {
        set({ ownerBookingLoading: true });
        try {
            const { data } = await axiosInstance.get("/api/bookings/owner");
            if (data.success) {
                set({ ownerBookings: data.bookings, ownerBookingLoading: false });
            } else {
                toast.error(data.message);
                set({ ownerBookingLoading: false });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Failed to fetch owner bookings");
            set({ ownerBookingLoading: false });
        }
    },

    changeBookingStatus: async (bookingId, status) => {
        set({ ownerBookingLoading: true });
        try {
            const { data } = await axiosInstance.post("/api/bookings/change-status", {
                bookingId,
                status,
            });
            if (data.success) {
                toast.success(data.message);
                await get().fetchOwnerBookings();
            } else {
                toast.error(data.message);
                set({ ownerBookingLoading: false });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Failed to change booking status");
            set({ ownerBookingLoading: false });
        }
    },

    changePaymentStatus: async (bookingId, status) => {
        set({ ownerBookingLoading: true });
        try {
            const { data } = await axiosInstance.post("/api/bookings/change-payment-status", {
                bookingId,
                status,
            });
            if (data.success) {
                toast.success(data.message);
                await get().fetchOwnerBookings();
            } else {
                toast.error(data.message);
                set({ ownerBookingLoading: false });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Failed to change payment status");
            set({ ownerBookingLoading: false });
        }
    },

    deleteBooking: async (bookingId) => {
        set({ ownerBookingLoading: true });
        try {
            const { data } = await axiosInstance.post("/api/bookings/delete-booking", { bookingId });
            if (data.success) {
                toast.success(data.message);
                await get().fetchOwnerBookings();
            } else {
                toast.error(data.message);
                set({ ownerBookingLoading: false });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Failed to delete booking");
            set({ ownerBookingLoading: false });
        }
    }
}));

