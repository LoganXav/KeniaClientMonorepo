import { z } from "zod";

export const AuthResetPasswordRequestSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export type AuthResetPasswordRequestSchemaType = z.infer<typeof AuthResetPasswordRequestSchema>;
