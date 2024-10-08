import { z } from "zod";

export const ResetPasswordRequestSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export type ResetPasswordRequestSchemaType = z.infer<typeof ResetPasswordRequestSchema>;
