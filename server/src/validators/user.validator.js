import { z } from 'zod';

export { addReviewSchema } from './review.validator.js';

export const getCarDetailsSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Car ID is required"),
  }),
});
