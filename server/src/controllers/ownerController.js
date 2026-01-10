import User from "../models/User.js";
import imagekit from '../configs/imagekit.js';
import Car from "../models/Car.js";
import Booking from "../models/Booking.js";
import Chat from "../models/Chat.js";

//* change role to owner
export const changeRoleToOwner = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { role: "owner" });
    res.json({ success: true, message: "Now you can list cars" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
}

//* list cars
export const addCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const imageFile = req.file;
    const {
      brand,
      model,
      year,
      pricePerDay,
      category,
      transmission,
      fuel_type,
      seating_capacity,
      location,
      description,
    } = req.body;

    if (!imageFile) {
      return res.json({ message: "No image file provided" });
    }

    if (!brand || !model || !year || !pricePerDay || !category || !transmission || !fuel_type || !seating_capacity || !location || !description) {
      return res.json({ message: "All fields are required" });
    }

    // Upload to ImageKit
    const response = await imagekit.files.upload({
      file: imageFile.buffer.toString("base64"),
      fileName: imageFile.originalname,
      folder: "/cars",
      useUniqueFileName: true,
    });

    // Optimized Image URL
    const optimizedImageUrl = response.url + "?tr=w-1280,q-auto,f-webp";

    const image = optimizedImageUrl;

    await Car.create({
      brand,
      model,
      year: Number(year),
      pricePerDay: Number(pricePerDay),
      category,
      transmission,
      fuel_type,
      seating_capacity: Number(seating_capacity),
      location,
      description,
      image,
      owner: _id,
    });

    res.json({ success: true, message: "Car added successfully" });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
}

//* get owner cars
export const getOwnerCars = async (req, res) => {
  try {
    const { _id } = req.user;
    const cars = await Car.find({ owner: _id });
    res.json({ success: true, cars });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
}

//* toggle car availability
export const toggleCarAvailability = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId);
    if (car.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "You are not authorized" });
    }
    car.isAvaliable = !car.isAvaliable;
    await car.save();
    res.json({ success: true, message: "Car availability Toggled" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
}

//* delete car
export const deleteCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId);
    if (car.owner.toString() !== _id.toString())
      return res.json({ success: false, message: "You are not authorized" });
    car.owner = null;
    car.isAvaliable = false;
    await car.save();
    res.json({ success: true, message: "Car removed successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
}

//* edit car
export const editCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId, imageUrl, ...data } = req.body;
    let finalImage = imageUrl;
    const car = await Car.findById(carId);
    if (!car) return res.json({ success: false, message: "Car not found" });
    if (car.owner.toString() !== _id.toString())
      return res.json({ success: false, message: "You are not authorized" });

    if (!data.brand || !data.model || !data.year || !data.pricePerDay || !data.category || !data.transmission || !data.fuel_type || !data.seating_capacity || !data.location || !data.description)
      return res.json({ success: false, message: "All fields are required" });

    if (req.file) {
      const uploaded = await imagekit.files.upload({
        file: req.file.buffer.toString("base64"),
        fileName: req.file.originalname,
        folder: "/cars",
      });
      finalImage = uploaded.url;
    }
    await Car.findByIdAndUpdate(carId, { ...data, image: finalImage });
    return res.json({ success: true, message: "Car updated successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

//* get owner dashboard data
export const getDashboardData = async (req, res) => {
  try {
    const { _id, role } = req.user;

    if (role !== "owner") {
      return res.json({ success: false, message: "You are not authorized" });
    }
    const cars = await Car.find({ owner: _id });
    const bookings = await Booking.find({ owner: _id }).populate('car').sort({ createdAt: -1 });
    const pendingBookings = await Booking.find({ owner: _id, status: 'pending' });
    const completedBookings = await Booking.find({ owner: _id, status: 'confirmed' });
    const cancelledBookings = await Booking.find({ owner: _id, status: 'cancelled' });
    const monthlyRevenue = bookings.slice().filter(booking => booking.status === 'confirmed').reduce((acc, booking) => (acc + booking.price), 0);

    const dashboardData = {
      totalCars: cars.length,
      totalBookings: bookings.length,
      pendingBookings: pendingBookings.length,
      completedBookings: completedBookings.length,
      cancelledBookings: cancelledBookings.length,
      recentBookings: bookings.slice(0, 3),
      monthlyRevenue
    };

    res.json({ success: true, dashboardData });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
}

//* update image
export const updateUserImage = async (req, res) => {
  try {
    const { _id } = req.user;
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({ message: "No image file provided" });
    }

    // Upload to ImageKit
    const response = await imagekit.files.upload({
      file: imageFile.buffer.toString("base64"),
      fileName: imageFile.originalname,
      folder: "/users",
      useUniqueFileName: true,
    });
    // console.log(response);

    // Optimized Image URL
    const optimizedImageUrl = response.url + "?tr=w-1280,q-auto,f-webp";

    // console.log(optimizedImageUrl);

    const image = optimizedImageUrl;
    await User.findByIdAndUpdate(_id, { image });
    res.json({ success: true, message: "Image updated" });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
}

//* get all users (for admin)

export const getAllUsers = async (_, res) => {
  try {
    const users = await User.find({ role: 'user' }).select('-password');
    res.json({ success: true, users });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
}

//* block unblock user (for admin)
export const blockUnblockUser = async (req, res) => {
  try {
    const { userId, isBlocked } = req.body;
    await User.findByIdAndUpdate(userId, { isBlocked: isBlocked });
    res.json({ success: true, message: isBlocked ? "User blocked successfully" : "User unblocked successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
}

//* get owner data

export const getOwnerDetails = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id)
    const owner = await User.findById(id).select('-password');
    res.json({ success: true, owner });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
}

//* get all chats

export const getMyChats = async (req, res) => {
  try {
    const userId = req.user._id;

    const chats = await Chat.find(
      {
        $or: [{ user: userId }, { owner: userId }],
      })
      .populate("user", "name image")
      .populate("owner", "name image")
      .populate("car", "brand model image")
      .populate({
        path: "lastMessage",
        select: "message createdAt",
      }).sort({ updatedAt: -1 });
    res.json({ success: true, chats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
