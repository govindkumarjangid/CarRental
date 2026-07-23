import User from "../models/user.model.js";
import Car from "../models/car.model.js";
import Review from "../models/review.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { uploadToCloudinary } from "../configs/cloudinary.js";

//* GET /api/v1/user/data - Get authenticated user profile data
export const getUserData = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password -refreshToken").lean();
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: "User profile fetched successfully",
    user,
    data: { user }
  });
});


//* GET /api/v1/user/cars - Get cars with pagination & filtering
export const getCars = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;

  let query = {};

  if (limit > 0) {
    const skip = (page - 1) * limit;
    const [cars, total] = await Promise.all([
      Car.find(query).skip(skip).limit(limit).lean(),
      Car.countDocuments(query)
    ]);
    return res.status(200).json({
      success: true,
      cars,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } else {
    const cars = await Car.find(query).lean();
    return res.status(200).json({ success: true, cars });
  }
});


//* POST /api/v1/user/add-review - Add customer review with uploaded photo
export const addReview = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { name, email, location, rating, review } = req.body;

  console.log("Received review data:", { name, email, location, rating, review });
  console.log("Received file data:", req.file);

  let optimizedImageUrl = "";
  if (req.file) {
    optimizedImageUrl = await uploadToCloudinary(req.file.buffer, req.file.originalname, req.file.mimetype);
  }

  const newReview = await Review.create({
    userId: _id,
    name,
    email,
    location,
    rating: Number(rating),
    review,
    imageUrl: optimizedImageUrl,
  });

  return res.status(201).json(
    new ApiResponse(201, { review: newReview }, "Review added successfully")
  );
});


//* GET /api/v1/user/get-reviews - Get list of recent customer reviews
export const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find().sort({ createdAt: -1 }).lean();
  return res.status(200).json({ success: true, reviews });
});


//* GET /api/v1/user/user-cardetails/:id - Get details of specific car
export const getCarDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const car = await Car.findById(id).lean();
  if (!car) {
    throw new ApiError(404, "Car not found");
  }
  return res.status(200).json({ success: true, car, owner: car.owner });
});
