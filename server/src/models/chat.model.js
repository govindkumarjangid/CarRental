import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    car: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message", },],
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message", },
    unreadByUser: { type: Boolean, default: false, },
    unreadByOwner: { type: Boolean, default: false, },
  },
  { timestamps: true }
);

chatSchema.index({ user: 1, owner: 1 }, { unique: true });
chatSchema.index({ user: 1, updatedAt: -1 });
chatSchema.index({ owner: 1, updatedAt: -1 });

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;