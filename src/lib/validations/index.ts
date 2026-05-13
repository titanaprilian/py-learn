import { z } from "zod";

export const loginSchema = z.object({
  identifier: z.string().min(1, "NIM/NIK is required"),
  password: z.string().min(1, "Password is required"),
  role: z.enum(["student", "lecturer"]),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  identifier: z.string().min(1, "NIM/NIK is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["student", "lecturer"]),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
