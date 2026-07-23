import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useCarStore = create((set, get) => ({
    cars: [],
    ownerCars: [],
    availableCars: [],
    carsLoading: false,
    loadingMore: false,
    pagination: {
        page: 1,
        limit: 6,
        total: 0,
        totalPages: 1,
        hasMore: false,
    },
    ownerCarsLoading: false,
    availableCarsLoading: false,
    showEditCar: false,
    editCar: null,
    carDetails: {},
    carDetailsLoading: false,
    carOwner: "",
    setShowEditCar: (val) => set({ showEditCar: val }),
    setEditCar: (car) => set({ editCar: car }),

    checkAvailability: async (location, pickupDate, returnDate) => {
        set({ availableCarsLoading: true });
        try {
            const { data } = await axiosInstance.post("/api/v1/bookings/check-availability", {
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
            set({ availableCarsLoading: false });
        }
    },

    fetchCars: async (page = 1, limit = 6, append = false) => {
        if (append)
            set({ loadingMore: true });
        else
            set({ carsLoading: true });

        try {
            const { data } = await axiosInstance.get(`/api/v1/user/cars?page=${page}&limit=${limit}`);
            if (data.success) {
                const newCars = data.cars || [];
                const pageNum = data.page || page;
                const totalPages = data.totalPages || Math.ceil((data.total || newCars.length) / limit);
                const hasMore = data.totalPages ? pageNum < data.totalPages : (newCars.length >= limit);
                set((state) => ({
                    cars: append ? [...state.cars, ...newCars] : newCars,
                    pagination: {
                        page: pageNum,
                        limit,
                        total: data.total || (append ? state.cars.length + newCars.length : newCars.length),
                        totalPages,
                        hasMore,
                    },
                }));
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Failed to fetch cars");
        } finally {
            set({ carsLoading: false, loadingMore: false });
        }
    },

    loadMoreCars: async () => {
        const { pagination, loadingMore, fetchCars } = get();
        if (loadingMore || !pagination.hasMore) return;
        const nextPage = pagination.page + 1;
        await fetchCars(nextPage, pagination.limit, true);
    },

    fetchOwnerCars: async () => {
        set({ ownerCarsLoading: true });
        try {
            const { data } = await axiosInstance.get("/api/v1/owner/cars");
            if (data.success) {
                set({ ownerCars: data.cars });
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Failed to fetch owner cars");
        } finally {
            set({ ownerCarsLoading: false });
        }
    },

    updateCarStatus: async (carId, status) => {
        try {
            const { data } = await axiosInstance.post("/api/v1/owner/update-status", { carId, status });
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
            const carId = carData._id || get().editCar?._id;
            if (!carId) {
                toast.error("Car ID not found");
                return null;
            }
            fd.append("carId", carId);
            Object.entries(carData).forEach(([key, value]) => {
                if (key !== "image") {
                    fd.append(key, value);
                }
            });
            if (image) fd.append("image", image);
            else if (carData?.image) fd.append("imageUrl", carData.image);
            const { data } = await axiosInstance.post("/api/v1/owner/edit-car", fd, {
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
            const { data } = await axiosInstance.post("/api/v1/owner/add-car", formData);
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
            const { data } = await axiosInstance.post("/api/v1/owner/delete-car", { carId });
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
            const { data } = await axiosInstance.get(`/api/v1/user/user-cardetails/${carId}`);
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
