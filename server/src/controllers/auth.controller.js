import * as authService from "../services/auth.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { setAuthCookies, clearAuthCookies } from "../utils/cookie.helper.js";

//* Helper for sending standardized auth response
const sendAuthResponse = (res, statusCode, result) => {
  setAuthCookies(res, result.accessToken, result.refreshToken);

  const responseObj = {
    user: result.user,
    token: result.accessToken,
    accessToken: result.accessToken,
  };

  return res.status(statusCode).json({
    success: statusCode < 400,
    statusCode,
    message: result.message,
    user: result.user,
    token: result.accessToken,
    accessToken: result.accessToken,
    data: responseObj,
  });
};

//* POST /api/v1/auth/register
export const registerUser = asyncHandler(async (req, res) => {
  const result = await authService.registerUser(req.body);
  return sendAuthResponse(res, 201, result);
});

//* POST /api/v1/auth/login
export const loginUser = asyncHandler(async (req, res) => {
  const result = await authService.loginUser(req.body);
  return sendAuthResponse(res, 200, result);
});

//* POST /api/v1/auth/google
export const googleAuth = asyncHandler(async (req, res) => {
  const mode = req.body.mode || "auth";
  const result = await authService.googleAuth(req.body, mode);
  return sendAuthResponse(res, 200, result);
});

//* POST /api/v1/auth/google/register
export const googleRegister = asyncHandler(async (req, res) => {
  const result = await authService.googleAuth(req.body, "register");
  return sendAuthResponse(res, 200, result);
});

//* POST /api/v1/auth/google/login
export const googleLogin = asyncHandler(async (req, res) => {
  const result = await authService.googleAuth(req.body, "login");
  return sendAuthResponse(res, 200, result);
});

//* POST /api/v1/auth/logout
export const logoutUser = asyncHandler(async (req, res) => {
  if (req.user?._id) {
    await authService.logoutUser(req.user._id);
  }
  clearAuthCookies(res);
  return res.status(200).json(new ApiResponse(200, {}, "Logged out successfully"));
});

//* POST /api/v1/auth/refresh-token
export const refreshToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
  const { accessToken, refreshToken: newRefreshToken } = await authService.refreshTokens(incomingRefreshToken);

  setAuthCookies(res, accessToken, newRefreshToken);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        token: accessToken,
        accessToken,
      },
      "Access token refreshed successfully"
    )
  );
});
