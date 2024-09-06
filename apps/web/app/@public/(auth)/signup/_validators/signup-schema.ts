import { z } from "zod";

export const SignUpSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
