import bcrypt from "bcrypt";
import * as authRepository from "../repositories/auth.repository.js";
import { sendWelcomeEmail } from "./notification.service.js";
import ApiError from "../utils/ApiError.js";
import { verifyRefreshToken } from "../utils/jwt.js";

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

export const registerUser = async (userData) => {
  const { name, email, password, role } = userData;

  if (!name || !email || !password) {
    throw new ApiError(400, "All required fields (name, email, password) must be provided");
  }

  const existingUser = await authRepository.findUserByEmail(email);
  if (existingUser) {
    throw new ApiError(400, "User with this email already exists");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const user = await authRepository.createUser({
    name,
    email,
    password: hashPassword,
    role: ["user", "owner"].includes(role) ? role : "user",
  });

  // Isolated non-blocking email dispatch
  sendWelcomeEmail({ email: user.email, name: user.name });

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  await authRepository.updateRefreshToken(user._id, refreshToken);
  const safeUser = await authRepository.findSafeUserById(user._id);

  return {
    user: safeUser,
    accessToken,
    refreshToken,
    statusCode: 201,
    message: "User registered successfully",
  };
};

export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await authRepository.findUserByEmail(email);
  if (!user) {
    throw new ApiError(404, "User not found with this email");
  }

  const isMatch = await user.isPasswordCorrect(password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  if (user.isBlocked) {
    throw new ApiError(403, "Your account has been blocked");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  await authRepository.updateRefreshToken(user._id, refreshToken);
  const safeUser = await authRepository.findSafeUserById(user._id);

  return {
    user: safeUser,
    accessToken,
    refreshToken,
    statusCode: 200,
    message: "Logged in successfully",
  };
};

export const googleAuth = async (body, mode = "auth") => {
  const { email, name, picture } = parseGooglePayload(body);
  const role = body.role;

  if (!email) {
    throw new ApiError(400, "Valid email or Google ID token is required for Google authentication");
  }

  let user = await authRepository.findUserByEmail(email);

  if (mode === "register" && user) {
    throw new ApiError(400, "An account with this Google email already exists. Please log in instead.");
  }

  if (mode === "login" && !user) {
    throw new ApiError(404, "No account found with this Google email. Please register first.");
  }

  if (!user) {
    const randomPassword = Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10);
    const hashPassword = await bcrypt.hash(randomPassword, 10);

    user = await authRepository.createUser({
      name: name || email.split("@")[0] || "Google User",
      email,
      password: hashPassword,
      image: picture || "",
      role: ["user", "owner"].includes(role) ? role : "user",
    });

    sendWelcomeEmail({ email: user.email, name: user.name });
  } else {
    const updateData = {};
    if (!user.image && picture) updateData.image = picture;
    if ((!user.name || user.name === "Google User") && name) updateData.name = name;

    if (Object.keys(updateData).length > 0) {
      await authRepository.updateById(user._id, updateData);
    }
  }

  if (user.isBlocked) {
    throw new ApiError(403, "Your account has been blocked");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  await authRepository.updateRefreshToken(user._id, refreshToken);
  const safeUser = await authRepository.findSafeUserById(user._id);

  const message = mode === "register" ? "Registered successfully with Google!" : "Logged in successfully with Google!";

  return {
    user: safeUser,
    accessToken,
    refreshToken,
    statusCode: 200,
    message,
  };
};

export const logoutUser = async (userId) => {
  if (userId) {
    await authRepository.updateRefreshToken(userId, null);
  }
  return true;
};

export const refreshTokens = async (incomingRefreshToken) => {
  if (!incomingRefreshToken) {
    throw new ApiError(401, "Refresh token is required");
  }

  let decoded;
  try {
    decoded = verifyRefreshToken(incomingRefreshToken);
  } catch (error) {
    throw new ApiError(401, "Invalid or expired refresh token");
  }

  const user = await authRepository.findUserById(decoded?.id);
  if (!user) {
    throw new ApiError(401, "Invalid refresh token");
  }

  if (user.refreshToken !== incomingRefreshToken) {
    throw new ApiError(401, "Refresh token is invalid or has expired");
  }

  const accessToken = user.generateAccessToken();
  const newRefreshToken = user.generateRefreshToken();

  await authRepository.updateRefreshToken(user._id, newRefreshToken);

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};