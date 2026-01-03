import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const bookingSchema = new mongoose.Schema({
  car: { type: ObjectId, ref: "Car", required: true },
  user: { type: ObjectId, ref: "User", required: true },
  owner: { type: ObjectId, ref: "User", required: true },
  pickupDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  price: { type: Number, required: true },
  paymentMethod: {
    type: String,
    enum: ["online", "offline"],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String,

}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
