import * as ownerRepository from "../repositories/owner.repository.js";
import ApiError from "../utils/ApiError.js";
import { uploadToCloudinary } from "../configs/cloudinary.config.js";
import Subscriber from "../models/subscriber.model.js";

export const becomeOwner = async (userId) => {
  await ownerRepository.updateUserRole(userId, "owner");
  return "Now you can list cars";
};

export const addCar = async (userId, body, file) => {
  const {
    brand,
    model,
    year,
    pricePerHour,
    lateFeePerHour,
    category,
    transmission,
    fuel_type,
    seating_capacity,
    location,
    description,
    cleaningTime,
    maintenanceTime,
  } = body;

  if (!brand || !model || !year || !pricePerHour || !category || !transmission || !fuel_type || !seating_capacity || !location || !description) {
    throw new ApiError(400, "All fields are required");
  }

  const image = file ? await uploadToCloudinary(file.buffer, file.originalname, file.mimetype) : "";
  let finalStatus = "available";

  if (Number(cleaningTime) > 120 || Number(maintenanceTime) > 120) {
    finalStatus = "unavailable";
  }

  await ownerRepository.createCar({
    brand,
    model,
    year: Number(year),
    pricePerHour: Number(pricePerHour),
    lateFeePerHour: Number(lateFeePerHour || 0),
    category,
    transmission,
    fuel_type,
    seating_capacity: Number(seating_capacity),
    location,
    description,
    image,
    owner: userId,
    cleaningTime: Number(cleaningTime) || 30,
    maintenanceTime: Number(maintenanceTime) || 60,
    status: finalStatus,
  });

  return "Car added successfully";
};

export const getOwnerCars = async (userId, { page = 1, limit = 0 }) => {
  const parsedPage = parseInt(page) || 1;
  const parsedLimit = parseInt(limit) || 0;

  if (parsedLimit > 0) {
    const skip = (parsedPage - 1) * parsedLimit;
    const { cars, total } = await ownerRepository.findOwnerCarsPaginated(userId, skip, parsedLimit);
    return {
      cars,
      total,
      page: parsedPage,
      totalPages: Math.ceil(total / parsedLimit),
    };
  } else {
    const cars = await ownerRepository.findOwnerCarsAll(userId);
    return { cars };
  }
};

export const updateCarStatus = async (userId, carId, status) => {
  const car = await ownerRepository.findCarById(carId);
  if (!car) {
    throw new ApiError(404, "Car not found");
  }

  if (car.owner.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized");
  }

  if (!["available", "cleaning", "maintenance", "unavailable"].includes(status)) {
    throw new ApiError(400, "Invalid status");
  }

  car.status = status;
  await car.save();
  return `Car status updated to ${status}`;
};

export const deleteCar = async (userId, carId) => {
  const car = await ownerRepository.findCarById(carId);
  if (!car) {
    throw new ApiError(404, "Car not found");
  }

  if (car.owner.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized");
  }

  car.owner = null;
  car.status = "maintenance";
  await car.save();
  return "Car removed successfully";
};

export const editCar = async (userId, body, file) => {
  const { carId, imageUrl, cleaningTime, maintenanceTime, ...data } = body;
  let finalImage = imageUrl;

  const car = await ownerRepository.findCarById(carId);
  if (!car) {
    throw new ApiError(404, "Car not found");
  }

  if (car.owner.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized");
  }

  if (!data.brand || !data.model || !data.year || !data.pricePerHour || !data.category || !data.transmission || !data.fuel_type || !data.seating_capacity || !data.location || !data.description) {
    throw new ApiError(400, "All fields are required");
  }

  let updateData = { ...data, cleaningTime: Number(cleaningTime), maintenanceTime: Number(maintenanceTime) };
  if (Number(cleaningTime) > 120 || Number(maintenanceTime) > 120) {
    updateData.status = "unavailable";
  }

  if (file) {
    finalImage = await uploadToCloudinary(file.buffer, file.originalname, file.mimetype);
  }

  await ownerRepository.updateCarById(carId, { ...updateData, image: finalImage });
  return "Car updated successfully";
};

export const updateServiceTimes = async (userId, carId, cleaningTime, maintenanceTime) => {
  const car = await ownerRepository.findCarById(carId);
  if (!car) {
    throw new ApiError(404, "Car not found");
  }

  if (car.owner.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized");
  }

  car.cleaningTime = Number(cleaningTime);
  car.maintenanceTime = Number(maintenanceTime);

  if (car.cleaningTime > 120 || car.maintenanceTime > 120) {
    car.status = "unavailable";
  }

  await car.save();
  return "Service times updated successfully";
};

export const getDashboardData = async (userId, role) => {
  if (role !== "owner") {
    throw new ApiError(403, "You are not authorized");
  }

  const { cars, bookings } = await ownerRepository.findDashboardCarsAndBookings(userId);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthlyRevenue = bookings.filter(booking => {
    const bDate = new Date(booking.createdAt);
    return booking.status === 'completed' &&
      bDate.getMonth() === currentMonth &&
      bDate.getFullYear() === currentYear;
  }).reduce((acc, booking) => (acc + booking.price), 0);

  const revenueHistory = [];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const m = d.getMonth();
    const y = d.getFullYear();
    const rev = bookings.filter(booking => {
      const bDate = new Date(booking.createdAt);
      return booking.status === 'completed' &&
        bDate.getMonth() === m &&
        bDate.getFullYear() === y;
    }).reduce((acc, booking) => (acc + booking.price), 0);

    revenueHistory.push({
      label: `${monthNames[m]} ${y}`,
      revenue: rev
    });
  }

  const availableCars = cars.filter(car => car.status === 'available').length;
  const cleaningCars = cars.filter(car => car.status === 'cleaning').length;
  const maintenanceCars = cars.filter(car => car.status === 'maintenance').length;
  const unavailableCars = cars.filter(car => car.status === 'unavailable').length;

  const bookingStatusCounts = {
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length
  };

  const paymentStatusCounts = {
    pending: bookings.filter(b => b.paymentStatus === 'pending').length,
    confirmed: bookings.filter(b => b.paymentStatus === 'confirmed').length,
    failed: bookings.filter(b => b.paymentStatus === 'failed').length
  };

  return {
    totalCars: cars.length,
    availableCars,
    cleaningCars,
    maintenanceCars,
    unavailableCars,
    totalBookings: bookings.length,
    bookingStatusCounts,
    paymentStatusCounts,
    monthlyRevenue,
    revenueHistory,
    recentBookings: bookings.slice(0, 5)
  };
};

export const updateUserImage = async (userId, imageFile) => {
  if (!imageFile) {
    throw new ApiError(400, "No image file provided");
  }

  const image = await uploadToCloudinary(imageFile.buffer, imageFile.originalname, imageFile.mimetype);
  await ownerRepository.updateUserImage(userId, image);
  return image;
};

export const getAllUsers = async ({ page = 1, limit = 0 }) => {
  const parsedPage = parseInt(page) || 1;
  const parsedLimit = parseInt(limit) || 0;

  if (parsedLimit > 0) {
    const skip = (parsedPage - 1) * parsedLimit;
    const { users, total } = await ownerRepository.findAllUsersPaginated(skip, parsedLimit);
    return {
      users,
      total,
      page: parsedPage,
      totalPages: Math.ceil(total / parsedLimit),
    };
  } else {
    const users = await ownerRepository.findAllUsersAll();
    return { users };
  }
};

export const blockUnblockUser = async (userId, isBlocked) => {
  await ownerRepository.updateUserBlockStatus(userId, isBlocked);
  return isBlocked ? "User blocked successfully" : "User unblocked successfully";
};

export const getOwnerDetails = async (ownerId) => {
  const owner = await ownerRepository.findOwnerById(ownerId);
  return owner;
};

export const getMyChats = async (userId) => {
  return await ownerRepository.findUserChatsWithUnread(userId);
};

export const getSubscribers = async ({ page = 1, limit = 10, search = "" }) => {
  const parsedPage = parseInt(page) || 1;
  const parsedLimit = parseInt(limit) || 10;
  const skip = (parsedPage - 1) * parsedLimit;

  const query = {};
  if (search && search.trim()) {
    query.email = { $regex: search.trim(), $options: "i" };
  }

  const [subscribers, total] = await Promise.all([
    Subscriber.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parsedLimit),
    Subscriber.countDocuments(query),
  ]);

  return {
    subscribers,
    total,
    page: parsedPage,
    totalPages: Math.ceil(total / parsedLimit),
  };
};

export const deleteSubscriber = async (subscriberId) => {
  const deleted = await Subscriber.findByIdAndDelete(subscriberId);
  if (!deleted) {
    throw new ApiError(404, "Subscriber not found");
  }
  return "Subscriber removed successfully";
};
