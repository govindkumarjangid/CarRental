import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { sendEmail } from "../utils/sendEmail.js";
import { googleClient } from "../configs/google.js";
import { welcomeEmailTemplate } from "../utils/emailTemplates.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken
} from "../utils/jwt.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
};

//* Helper to send ONLY access token in JSON response & HTTP-only cookies
const sendTokenResponse = async (user, statusCode, res, message) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  const safeUser = await User.findById(user._id).select("-password -refreshToken");

  const responseObj = {
    user: safeUser,
    token: accessToken,
    accessToken,
  };

  return res
    .status(statusCode)
    .cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000, // 15 mins
    })
    .cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    .json({
      success: statusCode < 400,
      statusCode,
      message,
      user: safeUser,
      token: accessToken,
      accessToken,
      data: responseObj,
    });
};

//* POST /api/v1/auth/register
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "All required fields (name, email, password) must be provided");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ApiError(400, "User with this email already exists");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashPassword,
    role: ["user", "owner"].includes(role) ? role : "user",
  });

  try {
    await sendEmail({
      email: user.email,
      subject: "Welcome to CarRental! 🚗",
      htmlMessage: welcomeEmailTemplate(user.name),
    });
  } catch (error) {
    console.error("Welcome Email Error:", error.message);
  }

  return sendTokenResponse(user, 201, res, "User registered successfully");
});

//* POST /api/v1/auth/login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found with this email");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  if (user.isBlocked) {
    throw new ApiError(403, "Your account has been blocked");
  }

  return sendTokenResponse(user, 200, res, "Logged in successfully");
});

//* Helper to decode Google credential / ID Token payload
const parseGooglePayload = (body) => {
  let email = body.email;
  let name = body.name;
  let picture = body.picture || body.image || body.avatar;
  let googleId = body.googleId || body.sub;

  const rawToken = body.credential || body.idToken || body.token;
  if (rawToken && typeof rawToken === 'string' && rawToken.includes('.')) {
    try {
      const parts = rawToken.split('.');
      if (parts.length === 3) {
        const base64Payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
        const payloadJson = Buffer.from(base64Payload, 'base64').toString('utf-8');
        const decoded = JSON.parse(payloadJson);
        email = email || decoded.email;
        name = name || decoded.name || decoded.given_name || (decoded.email ? decoded.email.split('@')[0] : "Google User");
        picture = picture || decoded.picture;
        googleId = googleId || decoded.sub;
      }
    } catch (e) {
      console.warn("Failed to parse Google ID Token payload:", e.message);
    }
  }

  return { email, name, picture, googleId };
};

//* POST /api/v1/auth/google
export const googleAuth = asyncHandler(async (req, res) => {
  const { email, name, picture } = parseGooglePayload(req.body);
  const { role, mode } = req.body; // mode: "register" | "login"

  if (!email) {
    throw new ApiError(400, "Valid email or Google ID token is required for Google authentication");
  }

  let user = await User.findOne({ email });

  // Mode-based validation checks
  if (mode === "register" && user) {
    throw new ApiError(400, "An account with this Google email already exists. Please log in instead.");
  }

  if (mode === "login" && !user) {
    throw new ApiError(404, "No account found with this Google email. Please register first.");
  }

  if (!user) {
    // Register new user via Google
    const randomPassword = Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10);
    const hashPassword = await bcrypt.hash(randomPassword, 10);

    user = await User.create({
      name: name || email.split("@")[0] || "Google User",
      email,
      password: hashPassword,
      image: picture || "",
      role: ["user", "owner"].includes(role) ? role : "user",
    });

    try {
      await sendEmail({
        email: user.email,
        subject: "Welcome to CarRental! 🚗",
        htmlMessage: welcomeEmailTemplate(user.name),
      });
    } catch (error) {
      console.error("Google Welcome Email Error:", error.message);
    }
  } else {
    // Update missing user profile fields if available
    let updated = false;
    if (!user.image && picture) {
      user.image = picture;
      updated = true;
    }
    if ((!user.name || user.name === "Google User") && name) {
      user.name = name;
      updated = true;
    }
    if (updated) {
      await user.save({ validateBeforeSave: false });
    }
  }

  if (user.isBlocked) {
    throw new ApiError(403, "Your account has been blocked");
  }

  const message = mode === "register" ? "Registered successfully with Google!" : "Logged in successfully with Google!";
  return sendTokenResponse(user, 200, res, message);
});

//* POST /api/v1/auth/google/register
export const googleRegister = asyncHandler(async (req, res, next) => {
  req.body.mode = "register";
  return googleAuth(req, res, next);
});

//* POST /api/v1/auth/google/login
export const googleLogin = asyncHandler(async (req, res, next) => {
  req.body.mode = "login";
  return googleAuth(req, res, next);
});

//* POST /api/v1/auth/logout
export const logoutUser = asyncHandler(async (req, res) => {
  if (req.user?._id) {
    await User.findByIdAndUpdate(
      req.user._id,
      { $set: { refreshToken: null } },
      { new: true }
    );
  }

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, {}, "Logged out successfully"));
});

//* POST /api/v1/auth/refresh-token
export const refreshToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body?.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Refresh token is required");
  }

  let decoded;
  try {
    decoded = verifyRefreshToken(incomingRefreshToken);
  } catch (error) {
    throw new ApiError(401, "Invalid or expired refresh token");
  }

  const user = await User.findById(decoded?.id);
  if (!user) {
    throw new ApiError(401, "Invalid refresh token");
  }

  if (user.refreshToken !== incomingRefreshToken) {
    throw new ApiError(401, "Refresh token is invalid or has expired");
  }

  const accessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);

  user.refreshToken = newRefreshToken;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000,
    })
    .cookie("refreshToken", newRefreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json(
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
