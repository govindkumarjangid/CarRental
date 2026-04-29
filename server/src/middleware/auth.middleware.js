import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';

export const protect = async (req, res, next) => {

  let token = req.headers.authorization;

  if (token && token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  if (!token) {
    return res.json({ success: false, message: "Not Authorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.id) {
      return res.json({ success: false, message: "Not Authorized" });
    }

    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.json({ success: false, message: "User not found" })
    }
    if (req.user.isBlocked) {
      return res.json({ success: false, message: "User is blocked" })
    }
    next();

  } catch (error) {
    return res.json({ success: false, message: "Not Authorized" });
  }
}

