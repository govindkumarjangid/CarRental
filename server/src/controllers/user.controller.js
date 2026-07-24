import * as userService from "../services/user.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

//* GET /api/v1/user/data
export const getUserData = asyncHandler(async (req, res) => {
  const user = await userService.getUserProfile(req.user._id);
  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: "User profile fetched successfully",
    user,
    data: { user },
  });
});

//* GET /api/v1/user/cars
export const getCars = asyncHandler(async (req, res) => {
  const result = await userService.getCars({
    page: req.query.page,
    limit: req.query.limit,
  });

  if (result.totalPages !== undefined) {
    return res.status(200).json({
      success: true,
      cars: result.cars,
      total: result.total,
      page: result.page,
      totalPages: result.totalPages,
    });
  }

  return res.status(200).json({ success: true, cars: result.cars });
});

//* POST /api/v1/user/add-review
export const addReview = asyncHandler(async (req, res) => {
  const newReview = await userService.addReview({
    userId: req.user._id,
    name: req.body.name,
    email: req.body.email,
    location: req.body.location,
    rating: req.body.rating,
    review: req.body.review,
    file: req.file,
  });

  return res.status(201).json(
    new ApiResponse(201, { review: newReview }, "Review added successfully")
  );
});

//* GET /api/v1/user/get-reviews
export const getReviews = asyncHandler(async (req, res) => {
  const reviews = await userService.getReviews();
  return res.status(200).json({ success: true, reviews });
});

//* GET /api/v1/user/user-cardetails/:id
export const getCarDetails = asyncHandler(async (req, res) => {
  const { car, owner } = await userService.getCarDetails(req.params.id);
  return res.status(200).json({ success: true, car, owner });
});

//* POST /api/v1/user/subscribe
export const subscribeNewsletter = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const result = await userService.subscribeNewsletter(email);

  if (result.isAlreadySubscribed) {
    return res.status(200).json({
      success: true,
      message: "You are already subscribed to our newsletter!",
      alreadySubscribed: true,
    });
  }

  return res.status(201).json(
    new ApiResponse(201, null, "Subscribed successfully! Check your inbox for confirmation.")
  );
});
