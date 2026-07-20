import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const carSchema = new mongoose.Schema({
  owner: { type: ObjectId, ref: "User" },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  image: { type: String, required: true },
  year: { type: Number, required: true },
  category: { type: String, required: true },
  seating_capacity: { type: Number, required: true },
  fuel_type: { type: String, required: true },
  transmission: { type: String, required: true },
  pricePerHour: { type: Number, required: true },
  lateFeePerHour: { type: Number, default: 0 },
  location: { type: String, required: true },
  description: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["available", "cleaning", "maintenance", "unavailable"], 
    default: "available" 
  },
  cleaningTime: { type: Number, default: 30 },
  maintenanceTime: { type: Number, default: 60 }
}, { timestamps: true });

// Compound Performance Indexes
carSchema.index({ owner: 1, status: 1 });
carSchema.index({ status: 1, location: 1, category: 1 });
carSchema.index({ createdAt: -1 });

const Car = mongoose.model("Car", carSchema);

export default Car;