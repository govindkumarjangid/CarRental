import { z } from 'zod';

export const checkAvailabilitySchema = z.object({
  body: z.object({
    location: z.string().optional(),
    pickupDate: z.string().optional(),
    startTime: z.string().optional(),
    returnDate: z.string().optional(),
    endTime: z.string().optional(),
  }),
});

export const createBookingSchema = z.object({
  body: z.object({
    car: z.string().min(1, "Car ID is required").optional(),
    carId: z.string().min(1, "Car ID is required").optional(),
    startTime: z.string().min(1, "Pickup date is required").optional(),
    pickupDate: z.string().min(1, "Pickup date is required").optional(),
    endTime: z.string().min(1, "Return date is required").optional(),
    returnDate: z.string().min(1, "Return date is required").optional(),
    price: z.union([z.string(), z.number()]).optional(),
    paymentMethod: z.enum(["online", "offline"]).optional(),
  }).refine((data) => Boolean(data.car || data.carId), {
    message: "Car ID is required",
    path: ["car"]
  }),
});

export const updateBookingStatusSchema = z.object({
  body: z.object({
    bookingId: z.string().min(1, "Booking ID is required"),
    status: z.enum(["pending", "confirmed", "completed", "cancelled"]).optional(),
    paymentStatus: z.enum(["pending", "confirmed", "failed"]).optional(),
  }),
});

export const verifyPaymentSchema = z.object({
  body: z.object({
    razorpayOrderId: z.string().min(1, "Razorpay Order ID is required"),
    razorpayPaymentId: z.string().min(1, "Razorpay Payment ID is required"),
    razorpaySignature: z.string().min(1, "Razorpay Signature is required"),
    bookingId: z.string().min(1, "Booking ID is required"),
    status: z.string().optional(),
  }),
});
