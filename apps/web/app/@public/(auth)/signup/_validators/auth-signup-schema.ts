import { z } from "zod";

export const AuthSignUpSchema = z
  .object({
    firstName: z.string().min(2, { message: "First name is too short" }).max(50, { message: "First name is too long" }),
    lastName: z.string().min(2, { message: "Last name is too short" }).max(50, { message: "Last name is too long" }),
    email: z.string().email({ message: "Invalid email address" }),
    phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number format" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(100, { message: "Password must be at most 100 characters" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/\d/, { message: "Password must contain at least one number" })
      .regex(/[\W_]/, { message: "Password must contain at least one special character" }),
    confirmPassword: z.string().min(8, { message: "Confirm password must match the password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type AuthSignUpSchemaType = z.infer<typeof AuthSignUpSchema>;
