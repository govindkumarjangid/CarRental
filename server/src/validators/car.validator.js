import { z } from 'zod';

export const addCarSchema = z.object({
  body: z.object({
    brand: z.string().min(1, "Brand is required"),
    model: z.string().min(1, "Model is required"),
    year: z.string().or(z.number()),
    pricePerHour: z.string().or(z.number()),
    lateFeePerHour: z.string().or(z.number()).optional(),
    category: z.string().min(1, "Category is required"),
    transmission: z.string().min(1, "Transmission is required"),
    fuel_type: z.string().min(1, "Fuel type is required"),
    seating_capacity: z.string().or(z.number()),
    location: z.string().min(1, "Location is required"),
    description: z.string().min(1, "Description is required"),
    cleaningTime: z.string().or(z.number()).optional(),
    maintenanceTime: z.string().or(z.number()).optional(),
  }),
});

export const updateCarStatusSchema = z.object({
  body: z.object({
    carId: z.string().min(1, "Car ID is required"),
    status: z.enum(["available", "cleaning", "maintenance", "unavailable"]),
  }),
});

export const editCarSchema = z.object({
  body: z.object({
    carId: z.string().min(1, "Car ID is required"),
    brand: z.string().min(1).optional(),
    model: z.string().min(1).optional(),
    year: z.string().or(z.number()).optional(),
    pricePerHour: z.string().or(z.number()).optional(),
    category: z.string().min(1).optional(),
    transmission: z.string().min(1).optional(),
    fuel_type: z.string().min(1).optional(),
    seating_capacity: z.string().or(z.number()).optional(),
    location: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    imageUrl: z.string().optional(),
    cleaningTime: z.string().or(z.number()).optional(),
    maintenanceTime: z.string().or(z.number()).optional(),
  }),
});

export const updateServiceTimesSchema = z.object({
  body: z.object({
    carId: z.string().min(1, "Car ID is required"),
    cleaningTime: z.string().or(z.number()),
    maintenanceTime: z.string().or(z.number()),
  }),
});
