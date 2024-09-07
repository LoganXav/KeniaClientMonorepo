import { z } from "zod";

export const ChangePasswordSchema = z
  .object({
    token: z.string().min(5, { message: "Invalid confirmation code" }).max(5, { message: "Invalid confirmation code" }),
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

export type ChangePasswordSchemaType = z.infer<typeof ChangePasswordSchema>;
