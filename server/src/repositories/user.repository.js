import User from "../models/user.model.js";
import Car from "../models/car.model.js";
import Review from "../models/review.model.js";

export const findUserById = async (userId) => {
  return await User.findById(userId).select("-password -refreshToken").lean();
};

export const findCarsPaginated = async (query, skip, limit) => {
  const [cars, total] = await Promise.all([
    Car.find(query).skip(skip).limit(limit).lean(),
    Car.countDocuments(query),
  ]);
  return { cars, total };
};

export const findAllCars = async (query = {}) => {
  return await Car.find(query).lean();
};

export const findCarById = async (carId) => {
  return await Car.findById(carId).lean();
};

export const createReview = async (reviewData) => {
  return await Review.create(reviewData);
};

export const findAllReviewsSorted = async () => {
  return await Review.find().sort({ createdAt: -1 }).lean();
};
