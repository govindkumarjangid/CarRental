import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    required: true
  },

  lastMessage: {
    type: String,
    default: ""
  }
}, { timestamps: true });

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;