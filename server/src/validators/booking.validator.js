import { z } from 'zod';

export const createBookingSchema = z.object({
  body: z.object({
    carId: z.string().min(1, "Car ID is required"),
    ownerId: z.string().min(1, "Owner ID is required"),
    pickupDate: z.string().min(1, "Pickup date is required"),
    returnDate: z.string().min(1, "Return date is required"),
    price: z.string().or(z.number()),
    paymentMethod: z.enum(["online", "offline"]),
  }),
});

export const updateBookingStatusSchema = z.object({
  body: z.object({
    bookingId: z.string().min(1, "Booking ID is required"),
    status: z.enum(["pending", "confirmed", "completed", "cancelled"]).optional(),
    paymentStatus: z.enum(["pending", "confirmed", "failed"]).optional(),
  }),
});
