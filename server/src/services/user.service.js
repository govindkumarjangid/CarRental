import * as userRepository from "../repositories/user.repository.js";
import ApiError from "../utils/ApiError.js";
import { uploadToCloudinary } from "../configs/cloudinary.config.js";
import Subscriber from "../models/subscriber.model.js";
import sendEmail from "../utils/sendEmail.js";
import { subscriptionWelcomeTemplate } from "../utils/emailTemplates.js";

export const getUserProfile = async (userId) => {
  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return user;
};

export const getCars = async ({ page, limit } = {}) => {
  const parsedPage = parseInt(page) || 1;
  const parsedLimit = (limit !== undefined && limit !== null && limit !== "") ? parseInt(limit) : 6;
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

export const subscribeNewsletter = async (email) => {
  if (!email || typeof email !== "string" || !email.trim()) {
    throw new ApiError(400, "Valid email address is required");
  }

  const formattedEmail = email.trim().toLowerCase();

  const existing = await Subscriber.findOne({ email: formattedEmail });
  if (existing) {
    if (existing.status === "active") {
      return { isAlreadySubscribed: true, subscriber: existing };
    } else {
      existing.status = "active";
      existing.subscribedAt = new Date();
      await existing.save();
    }
  } else {
    await Subscriber.create({ email: formattedEmail });
  }

  // Trigger automated email using Resend
  try {
    const htmlMessage = subscriptionWelcomeTemplate({ email: formattedEmail });
    await sendEmail({
      email: formattedEmail,
      subject: "Welcome to CarRental Newsletter!",
      htmlMessage,
    });
  } catch (emailError) {
    console.error("Failed to send subscription welcome email:", emailError);
    // Don't throw error if DB save succeeded
  }

  return { isAlreadySubscribed: false };
};
