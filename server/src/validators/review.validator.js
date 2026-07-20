import { z } from 'zod';

export const addReviewSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    location: z.string().min(1, "Location is required"),
    rating: z.coerce.number({ invalid_type_error: "Rating is required" }).min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
    review: z.string().min(1, "Review text is required"),
  }),
});
