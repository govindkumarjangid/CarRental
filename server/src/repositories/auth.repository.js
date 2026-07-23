import User from "../models/user.model.js";

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const findUserById = async (id) => {
  return await User.findById(id);
};

export const findSafeUserById = async (id) => {
  return await User.findById(id).select("-password -refreshToken");
};

export const createUser = async (data) => {
  return await User.create(data);
};

export const updateById = async (id, data) => {
  return await User.findByIdAndUpdate(id, { $set: data }, { returnDocument: 'after' });
};

export const updateRefreshToken = async (id, refreshToken) => {
  return await User.findByIdAndUpdate(id, { $set: { refreshToken } }, { returnDocument: 'after' });
};
