import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type SignInSchemaType = z.infer<typeof SignInSchema> & { userType: string };
