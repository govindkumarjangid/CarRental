import User from "../models/user.model.js";
import imagekit from '../configs/imagekit.js';
import Car from "../models/car.model.js";
import Booking from "../models/booking.model.js";
import Chat from "../models/chat.model.js";
import asyncHandler from "../utils/asyncHandler.js";

//* change role to owner
export const changeRoleToOwner = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { role: "owner" });
  res.json({ success: true, message: "Now you can list cars" });
});

//* list cars
export const addCar = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const imageFile = req.file;
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
  } = req.body;

  if (!imageFile) return res.json({ message: "No image file provided" });

  if (!brand || !model || !year || !pricePerHour || !category || !transmission || !fuel_type || !seating_capacity || !location || !description)
    return res.json({ message: "All fields are required" });

  // Upload to ImageKit
  const response = await imagekit.files.upload({
    file: imageFile.buffer.toString("base64"),
    fileName: imageFile.originalname,
    folder: "/cars",
    useUniqueFileName: true,
  });

  // Optimized Image URL
  const optimizedImageUrl = response.url + "?tr=w-1280,q-auto,f-avif";

  const image = optimizedImageUrl;

  const { cleaningTime, maintenanceTime } = req.body;
  let finalStatus = "available";

  if (Number(cleaningTime) > 120 || Number(maintenanceTime) > 120)
    finalStatus = "unavailable";

  await Car.create({
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
    owner: _id,
    cleaningTime: Number(cleaningTime) || 30,
    maintenanceTime: Number(maintenanceTime) || 60,
    status: finalStatus,
  });

  res.json({ success: true, message: "Car added successfully" });
});

//* get owner cars
export const getOwnerCars = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 0;

  if (limit > 0) {
    const skip = (page - 1) * limit;
    const [cars, total] = await Promise.all([
      Car.find({ owner: _id }).skip(skip).limit(limit).lean(),
      Car.countDocuments({ owner: _id })
    ]);
    res.json({ success: true, cars, total, page, totalPages: Math.ceil(total / limit) });
  } else {
    const cars = await Car.find({ owner: _id }).lean();
    res.json({ success: true, cars });
  }
});

//* update car status
export const updateCarStatus = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { carId, status } = req.body;
  const car = await Car.findById(carId);
  if (!car) return res.json({ success: false, message: "Car not found" });

  if (car.owner.toString() !== _id.toString())
    return res.json({ success: false, message: "You are not authorized" });

  if (!["available", "cleaning", "maintenance", "unavailable"].includes(status))
    return res.json({ success: false, message: "Invalid status" });

  car.status = status;
  await car.save();
  res.json({ success: true, message: `Car status updated to ${status}` });
});

//* delete car
export const deleteCar = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { carId } = req.body;
  const car = await Car.findById(carId);
  if (!car) return res.json({ success: false, message: "Car not found" });

  if (car.owner.toString() !== _id.toString())
    return res.json({ success: false, message: "You are not authorized" });
  car.owner = null;
  car.status = "maintenance";
  await car.save();
  res.json({ success: true, message: "Car removed successfully" });
});

//* edit car
export const editCar = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { carId, imageUrl, cleaningTime, maintenanceTime, ...data } = req.body;
  let finalImage = imageUrl;
  const car = await Car.findById(carId);
  if (!car) return res.json({ success: false, message: "Car not found" });
  if (car.owner.toString() !== _id.toString())
    return res.json({ success: false, message: "You are not authorized" });

  if (!data.brand || !data.model || !data.year || !data.pricePerHour || !data.category || !data.transmission || !data.fuel_type || !data.seating_capacity || !data.location || !data.description)
    return res.json({ success: false, message: "All fields are required" });

  let updateData = { ...data, cleaningTime: Number(cleaningTime), maintenanceTime: Number(maintenanceTime) };
  if (Number(cleaningTime) > 120 || Number(maintenanceTime) > 120)
    updateData.status = "unavailable";

  if (req.file) {
    const uploaded = await imagekit.files.upload({
      file: req.file.buffer.toString("base64"),
      fileName: req.file.originalname,
      folder: "/cars",
    });
    finalImage = uploaded.url;
  }
  await Car.findByIdAndUpdate(carId, { ...updateData, image: finalImage });
  return res.json({ success: true, message: "Car updated successfully" });
});

//* update service times
export const updateServiceTimes = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { carId, cleaningTime, maintenanceTime } = req.body;

  const car = await Car.findById(carId);
  if (!car) return res.json({ success: false, message: "Car not found" });

  if (car.owner.toString() !== _id.toString())
    return res.json({ success: false, message: "You are not authorized" });

  car.cleaningTime = Number(cleaningTime);
  car.maintenanceTime = Number(maintenanceTime);

  if (car.cleaningTime > 120 || car.maintenanceTime > 120)
    car.status = "unavailable";

  await car.save();
  res.json({ success: true, message: "Service times updated successfully" });
});

// * get owner dashboard data (Optimized with Parallel execution & .lean())
export const getDashboardData = asyncHandler(async (req, res) => {
  const { _id, role } = req.user;

  if (role !== "owner")
    return res.json({ success: false, message: "You are not authorized" });

  const [cars, bookings] = await Promise.all([
    Car.find({ owner: _id }).lean(),
    Booking.find({ owner: _id }).populate('car').sort({ createdAt: -1 }).lean(),
  ]);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // Current Month Revenue
  const monthlyRevenue = bookings.filter(booking => {
    const bDate = new Date(booking.createdAt);
    return booking.status === 'completed' &&
      bDate.getMonth() === currentMonth &&
      bDate.getFullYear() === currentYear;
  }).reduce((acc, booking) => (acc + booking.price), 0);

  // Revenue History
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

  const dashboardData = {
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

  res.json({ success: true, dashboardData });
});

//* update image
export const updateUserImage = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const imageFile = req.file;

  if (!imageFile)
    return res.status(400).json({ message: "No image file provided" });

  // Upload to ImageKit
  const response = await imagekit.files.upload({
    file: imageFile.buffer.toString("base64"),
    fileName: imageFile.originalname,
    folder: "/users",
    useUniqueFileName: true,
  });

  // Optimized Image URL
  const optimizedImageUrl = response.url + "?tr=w-1280,q-auto,f-webp";

  const image = optimizedImageUrl;
  await User.findByIdAndUpdate(_id, { image });
  res.json({ success: true, message: "Image updated" });
});

//* get all users (for admin)
export const getAllUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 0;

  if (limit > 0) {
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
      User.find().select('-password').skip(skip).limit(limit).lean(),
      User.countDocuments()
    ]);
    res.json({ success: true, users, total, page, totalPages: Math.ceil(total / limit) });
  } else {
    const users = await User.find().select('-password').lean();
    res.json({ success: true, users });
  }
});

//* block unblock user (for admin)
export const blockUnblockUser = asyncHandler(async (req, res) => {
  const { userId, isBlocked } = req.body;
  await User.findByIdAndUpdate(userId, { isBlocked: isBlocked });
  res.json({ success: true, message: isBlocked ? "User blocked successfully" : "User unblocked successfully" });
});

//* get owner data
export const getOwnerDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const owner = await User.findById(id).select('-password').lean();
  res.json({ success: true, owner });
});

//* get all chats
export const getMyChats = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const chats = await Chat.find({
    $or: [{ user: userId }, { owner: userId }],
  })
    .populate("user", "name image")
    .populate("owner", "name image")
    .populate("car", "brand model image")
    .populate({
      path: "lastMessage",
      select: "message createdAt",
    })
    .sort({ updatedAt: -1 })
    .lean();

  res.json({ success: true, chats });
});
