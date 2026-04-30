import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useCarStore = create((set, get) => ({
    cars: [],
    ownerCars: [],
    availableCars: [],
    loading: true,
    showEditCar: false,
    editCar: null,
    carDetails: {},
    carDetailsLoading: false,
    carOwner: "",
    setShowEditCar: (val) => set({ showEditCar: val }),
    setEditCar: (car) => set({ editCar: car }),

    checkAvailability: async (location, pickupDate, returnDate) => {
        set({ loading: true });
        try {
            const { data } = await axiosInstance.post("/api/bookings/check-availability", {
                location,
                pickupDate,
                returnDate,
            });
            if (data.success) {
                set({ availableCars: data.cars });
                toast.success(`${data.cars.length} cars available for you!`);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Error checking car availability");
        } finally {
            set({ loading: false });
        }
    },

    fetchCars: async () => {
        set({ loading: true });
        try {
            const { data } = await axiosInstance.get("/api/user/cars");
            if (data.success) {
                set({ cars: data.cars, loading: false });
            } else {
                toast.error(data.message);
                set({ loading: false });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Failed to fetch cars");
            set({ loading: false });
        }
    },

    fetchOwnerCars: async () => {
        set({ loading: true });
        try {
            const { data } = await axiosInstance.get("/api/owner/cars");
            if (data.success) {
                set({ ownerCars: data.cars, loading: false });
            } else {
                toast.error(data.message);
                set({ loading: false });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Failed to fetch owner cars");
            set({ loading: false });
        }
    },

    updateCarStatus: async (carId, status) => {
        try {
            const { data } = await axiosInstance.post("/api/owner/update-status", { carId, status });
            if (data.success) {
                toast.success(data.message);
                get().fetchOwnerCars();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Failed to update car status");
        }
    },

    updateCar: async (carData, image) => {
        try {
            const fd = new FormData();
            fd.append("carId", get().editCar._id);
            Object.entries(carData).forEach(([key, value]) => {
                if (key !== "image") {
                    fd.append(key, value);
                }
            });
            if (image) fd.append("image", image);
            else if (carData?.image) fd.append("imageUrl", carData.image);
            const { data } = await axiosInstance.post("/api/owner/edit-car", fd, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (data.success) {
                toast.success(data.message);
                set({ showEditCar: false });
                get().fetchOwnerCars();
            } else {
                toast.error(data.message);
            }
            return data;
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Failed to update car");
            return null;
        }
    },

    addCar: async (carData, image) => {
        try {
            const formData = new FormData();
            formData.append("image", image);
            Object.entries(carData).forEach(([key, value]) => {
                formData.append(key, value);
            });
            const { data } = await axiosInstance.post("/api/owner/add-car", formData);
            if (data.success) {
                toast.success("Car added successfully");
                return true;
            } else {
                toast.error(data.message || "Failed to add car");
                return false;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Failed to add car");
            return false;
        }
    },

    deleteCar: async (carId) => {
        try {
            const { data } = await axiosInstance.post("/api/owner/delete-car", { carId });
            if (data.success) {
                toast.success("Car deleted successfully");
                get().fetchOwnerCars();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Failed to delete car");
        }
    },

    fetchUserCarDetails: async (carId) => {
        set({ carDetailsLoading: true });
        try {
            const { data } = await axiosInstance.get(`/api/user/user-cardetails/${carId}`);
            if (data.success) {
                set({ carDetails: data.car, carOwner: data.owner });
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Failed to fetch car details");
        } finally {
            set({ carDetailsLoading: false });
        }
    },

}));
