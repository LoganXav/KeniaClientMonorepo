import { z } from "zod";

export const AuthSignInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type AuthSignInSchemaType = z.infer<typeof AuthSignInSchema> & { userType: string };
