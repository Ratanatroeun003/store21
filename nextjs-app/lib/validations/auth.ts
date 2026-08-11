// lib/validations/auth.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" }) // Equivalent to: 'required'
    .email({ message: "Invalid email address format" }), // Equivalent to: 'email'

  password: z
    .string()
    .min(1, { message: "Password is required" }) // Equivalent to: 'required'
    .min(6, { message: "Password must be at least 6 characters" }) // Equivalent to: 'min:6'
    .max(10, { message: "Password must not exceed 10 characters" }), // Equivalent to: 'max:10'
});

// Infer the TypeScript type from the schema
export type SigninInput = z.infer<typeof loginSchema>;