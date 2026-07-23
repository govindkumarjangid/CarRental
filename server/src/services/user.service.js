import * as userRepository from "../repositories/user.repository.js";
import ApiError from "../utils/ApiError.js";
import { uploadToCloudinary } from "../configs/cloudinary.config.js";

export const getUserProfile = async (userId) => {
  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return user;
};

export const getCars = async ({ page = 1, limit = 6 }) => {
  const parsedPage = parseInt(page) || 1;
  const parsedLimit = parseInt(limit) || 6;
  const query = {};

  if (parsedLimit > 0) {
    const skip = (parsedPage - 1) * parsedLimit;
    const { cars, total } = await userRepository.findCarsPaginated(query, skip, parsedLimit);
    return {
      cars,
      total,
      page: parsedPage,
      totalPages: Math.ceil(total / parsedLimit),
    };
  } else {
    const cars = await userRepository.findAllCars(query);
    return { cars };
  }
};

export const addReview = async ({ userId, name, email, location, rating, review, file }) => {
  let optimizedImageUrl = "";
  if (file) {
    optimizedImageUrl = await uploadToCloudinary(file.buffer, file.originalname, file.mimetype);
  }

  const newReview = await userRepository.createReview({
    userId,
    name,
    email,
    location,
    rating: Number(rating),
    review,
    imageUrl: optimizedImageUrl,
  });

  return newReview;
};

export const getReviews = async () => {
  return await userRepository.findAllReviewsSorted();
};

export const getCarDetails = async (carId) => {
  if (!carId) {
    throw new ApiError(400, "Car ID is required");
  }

  const car = await userRepository.findCarById(carId);
  if (!car) {
    throw new ApiError(404, "Car not found");
  }

  return { car, owner: car.owner };
};
