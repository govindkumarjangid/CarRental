import { z } from 'zod';

export {
  addCarSchema,
  updateCarStatusSchema,
  editCarSchema,
  updateServiceTimesSchema,
} from './car.validator.js';

export const blockUnblockUserSchema = z.object({
  body: z.object({
    userId: z.string().min(1, "User ID is required"),
    isBlocked: z.boolean(),
  }),
});

export const deleteCarSchema = z.object({
  body: z.object({
    carId: z.string().min(1, "Car ID is required"),
  }),
});
