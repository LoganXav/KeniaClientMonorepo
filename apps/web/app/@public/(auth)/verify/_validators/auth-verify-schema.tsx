import { z } from "zod";

export const AuthVerifySchema = z.object({
  otpToken: z.string().min(5, { message: "Invalid OTP" }).max(5, { message: "Invalid OTP" }),
});

export type AuthVerifySchemaType = z.infer<typeof AuthVerifySchema> & { id: number };
