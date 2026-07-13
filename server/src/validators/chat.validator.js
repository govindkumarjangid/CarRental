import { z } from 'zod';

export const accessChatSchema = z.object({
  body: z.object({
    userId: z.string().min(1, "User ID is required"),
    ownerId: z.string().min(1, "Owner ID is required"),
    carId: z.string().min(1, "Car ID is required"),
  }),
});

export const sendMessageSchema = z.object({
  body: z.object({
    chatId: z.string().min(1, "Chat ID is required"),
    message: z.string().min(1, "Message content is required"),
  }),
});
