import { z } from 'zod';

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
  }).refine((data) => Boolean(data.startTime || data.pickupDate), {
    message: "Pickup date & time is required",
    path: ["startTime"]
  }).refine((data) => Boolean(data.endTime || data.returnDate), {
    message: "Return date & time is required",
    path: ["endTime"]
  }),
});

export const updateBookingStatusSchema = z.object({
  body: z.object({
    bookingId: z.string().min(1, "Booking ID is required"),
    status: z.enum(["pending", "confirmed", "completed", "cancelled"]).optional(),
    paymentStatus: z.enum(["pending", "confirmed", "failed"]).optional(),
  }),
});
