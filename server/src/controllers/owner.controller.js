import * as ownerService from "../services/owner.service.js";
import asyncHandler from "../utils/asyncHandler.js";

//* change role to owner
export const changeRoleToOwner = asyncHandler(async (req, res) => {
  const message = await ownerService.becomeOwner(req.user._id);
  return res.status(200).json({ success: true, message });
});

//* add car
export const addCar = asyncHandler(async (req, res) => {
  const message = await ownerService.addCar(req.user._id, req.body, req.file);
  return res.status(201).json({ success: true, message });
});

//* get owner cars
export const getOwnerCars = asyncHandler(async (req, res) => {
  const result = await ownerService.getOwnerCars(req.user._id, {
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

//* update car status
export const updateCarStatus = asyncHandler(async (req, res) => {
  const message = await ownerService.updateCarStatus(req.user._id, req.body.carId, req.body.status);
  return res.status(200).json({ success: true, message });
});

//* delete car
export const deleteCar = asyncHandler(async (req, res) => {
  const message = await ownerService.deleteCar(req.user._id, req.body.carId);
  return res.status(200).json({ success: true, message });
});

//* edit car
export const editCar = asyncHandler(async (req, res) => {
  const message = await ownerService.editCar(req.user._id, req.body, req.file);
  return res.status(200).json({ success: true, message });
});

//* update service times
export const updateServiceTimes = asyncHandler(async (req, res) => {
  const message = await ownerService.updateServiceTimes(
    req.user._id,
    req.body.carId,
    req.body.cleaningTime,
    req.body.maintenanceTime
  );
  return res.status(200).json({ success: true, message });
});

//* get owner dashboard data
export const getDashboardData = asyncHandler(async (req, res) => {
  const dashboardData = await ownerService.getDashboardData(req.user._id, req.user.role);
  return res.status(200).json({ success: true, dashboardData });
});

//* update image
export const updateUserImage = asyncHandler(async (req, res) => {
  const image = await ownerService.updateUserImage(req.user._id, req.file);
  return res.status(200).json({ success: true, message: "Image updated", image });
});

//* get all users (for admin)
export const getAllUsers = asyncHandler(async (req, res) => {
  const result = await ownerService.getAllUsers({
    page: req.query.page,
    limit: req.query.limit,
  });

  if (result.totalPages !== undefined) {
    return res.status(200).json({
      success: true,
      users: result.users,
      total: result.total,
      page: result.page,
      totalPages: result.totalPages,
    });
  }

  return res.status(200).json({ success: true, users: result.users });
});

//* block unblock user (for admin)
export const blockUnblockUser = asyncHandler(async (req, res) => {
  const message = await ownerService.blockUnblockUser(req.body.userId, req.body.isBlocked);
  return res.status(200).json({ success: true, message });
});

//* get owner data
export const getOwnerDetails = asyncHandler(async (req, res) => {
  const owner = await ownerService.getOwnerDetails(req.params.id);
  return res.status(200).json({ success: true, owner });
});

//* get all chats
export const getMyChats = asyncHandler(async (req, res) => {
  const chats = await ownerService.getMyChats(req.user._id);
  return res.status(200).json({ success: true, chats });
});

//* GET /api/v1/owner/subscribers
export const getSubscribers = asyncHandler(async (req, res) => {
  const { page, limit, search } = req.query;
  const result = await ownerService.getSubscribers({ page, limit, search });
  return res.status(200).json({
    success: true,
    ...result,
  });
});

//* DELETE /api/v1/owner/subscribers/:id
export const deleteSubscriber = asyncHandler(async (req, res) => {
  const message = await ownerService.deleteSubscriber(req.params.id);
  return res.status(200).json(
    new ApiResponse(200, null, message)
  );
});
