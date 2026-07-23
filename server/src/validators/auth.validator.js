import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    role: z.enum(["user", "owner"]).optional().default("user"),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(1, "Password is required"),
  }),
});

export const googleSchema = z.object({
  body: z.object({
    credential: z.string().optional(),
    idToken: z.string().optional(),
    token: z.string().optional(),
    email: z.string().email("Invalid email format").optional(),
    name: z.string().optional(),
    picture: z.string().optional(),
    image: z.string().optional(),
    role: z.enum(["user", "owner"]).optional(),
    mode: z.enum(["register", "login", "auth"]).optional(),
  }).refine(
    (data) => Boolean(data.credential || data.idToken || data.token || data.email),
    {
      message: "Either Google credential/ID token or email must be provided",
      path: ["credential"],
    }
  ),
});

export const googleRegisterSchema = googleSchema;
export const googleLoginSchema = googleSchema;

export const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z.string().optional(),
  }).optional(),
});