import jwt from 'jsonwebtoken'
import User from '../models/User.js';

export const protect = async (req, res, next) => {

  let token = req.headers.authorization;

  if (!token) {
    return res.json({ success: false, message: "Not Authorized" });
  }
  try {
    const userId = jwt.verify(token, process.env.JWT_SECRET);

    if (!userId) {
      return res.json({ success: false, message: "Not Authorized" });
    }

    req.user = await User.findById(userId).select('-password');

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

