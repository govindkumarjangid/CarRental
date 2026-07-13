import { z } from 'zod';

export const addReviewSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    location: z.string().min(1, "Location is required"),
    rating: z.string().or(z.number()),
    review: z.string().min(1, "Review text is required"),
  }),
});
