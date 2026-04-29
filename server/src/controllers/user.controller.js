import User from "../models/user.model.js";
import bcrypt from 'bcrypt'
import Car from '../models/car.model.js'
import imagekit from "../utils/imagekit.js"
import Review from "../models/review.model.js";
import { sendEmail } from "../utils/sendEmail.js";
import { generateToken } from "../configs/generateToken.js";
import wrapAsync from "../configs/wrapAsync.js";
import { welcomeEmailTemplate } from "../utils/emailTemplates.js";

//* Register user
export const registerUser = wrapAsync(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: false, message: 'All fields are required' })
  }

  if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) === false) {
    return res.json({ success: false, message: 'Invalid email format!' });
  }

  if (password.length < 8) {
    return res.json({ success: false, message: 'Password must be greater than 8 characters!' });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.json({ success: false, message: 'User already exists.' });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashPassword });
  const token = generateToken(user._id.toString());

  await sendEmail({
    email: email,
    subject: 'Welcome to CarRenatl! 🚗',
    htmlMessage: welcomeEmailTemplate(name),
  });

  res.json({
    success: true, token, user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
      isBlocked: user.isBlocked,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  });
});

//*Login User
export const loginUser = wrapAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "All fields are required" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ success: false, message: 'User not found!' });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.json({ success: false, message: 'Invalid Password' });
  }
  if (user.isBlocked) {
    return res.json({ success: false, message: "User is blocked" })
  }

  const token = generateToken(user._id.toString());
  res.json({
    success: true, token, user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
      isBlocked: user.isBlocked,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  });
});

//* get user data using Token (JWT)
export const getUserData = wrapAsync(async (req, res) => {
  const { user } = req;
  res.json({ success: true, user });
});

//* get all user cars
export const getCars = wrapAsync(async (_, res) => {
  const cars = await Car.find({ isAvaliable: true });
  res.json({ success: true, cars });
});

//* Add Review
export const addReview = wrapAsync(async (req, res) => {
  const { _id } = req.user;
  const { name, email, location, rating, review } = req.body;
  const imageFile = req.file;

  if (!req.file) {
    return res.status(400).json({ message: "No image file provided" });
  }

  if (!name || !location || !rating || !review) {
    return res.json({ success: false, message: 'All fields are required' })
  }

  const response = await imagekit.files.upload({
    file: imageFile.buffer.toString("base64"),
    fileName: imageFile.originalname,
    folder: "/reviews",
    useUniqueFileName: true,
  });
  const optimizedImageUrl = response.url + "?tr=w-1280,q-auto,f-webp";

  const image = optimizedImageUrl;

  await Review.create({
    userId: _id,
    name,
    email,
    location,
    rating: Number(rating),
    review,
    imageUrl: image,
  })

  res.json({ success: true, message: "Review added successfully" });
});

//* Get Reviews
export const getReviews = wrapAsync(async (req, res) => {
  const reviews = await Review.find().sort({ createdAt: -1 });
  res.json({ success: true, reviews });
});

//* get user car details
export const getCarDetails = wrapAsync(async (req, res) => {
  const { id } = req.params;
  // console.log(id)
  const car = await Car.findById(id);
  if (!car) {
    return res.json({ success: false, message: "Car not found", });
  }
  return res.json({ success: true, car, owner: car.owner });
});
