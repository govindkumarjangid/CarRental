import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chatId: {  type: mongoose.Schema.Types.ObjectId,  ref: "Chat", required: true},
    car: {  type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true},
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    senderRole: {  type: String,  enum: ["user", "owner"],  required: true},
    message: { type: String, required: true, trim: true },
    messageType: {  type: String, enum: ["text", "image", "file"], default: "text"},
    seenByReceiver: {  type: Boolean, default: false},
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;