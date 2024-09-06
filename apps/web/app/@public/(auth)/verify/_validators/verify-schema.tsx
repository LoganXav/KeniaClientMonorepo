import { z } from "zod";

export const VerifySchema = z.object({
  otpToken: z.string().min(5, { message: "Invalid OTP" }).max(5, { message: "Invalid OTP" }),
});

export type VerifySchemaType = z.infer<typeof VerifySchema> & { id: number };
