import User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Car from '../models/Car.js'
import imagekit from "../configs/imagekit.js"
import Review from "../models/Review.js";
//* JWT token
const generateToken = (userId) => {
  const payload = userId;
  return jwt.sign(payload, process.env.JWT_SECRET);
}

//* Register user
export const registerUser = async (req, res) => {
  try {
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

    res.json({ success: true, token });

  } catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message })
  }
}


//*Login User
export const loginUser = async (req, res) => {
  try {

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

    const token = generateToken(user._id.toString());
    res.json({ success: true, token });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
}


//* get user data using Token (JWT)
export const getUserData = async (req, res) => {
  try {
    const { user } = req;
    res.json({ success: true, user });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
}

//* get all user cars

export const getCars = async (req, res) => {
  try {
    const cars = await Car.find({ isAvaliable: true });
    res.json({ success: true, cars });
  } catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message })
  }
}

//* Add Review
export const addReview = async (req, res) => {
  try {
    const { _id } = req.user;
    console.log(req.body)
    const { name, email, location, rating, review } = req.body;
    const imageFile = req.file;

    if (!imageFile) {
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

  } catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message })
  }
}

//* Get Reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json({ success: true, reviews });
  } catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message })
  }
} 