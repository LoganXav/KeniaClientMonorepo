"use client";

import { Button, toast, Form, FormField, FormItem, FormLabel, FormControl, FormMessage, InputOTPGroup, InputOTP, InputOTPSlot } from "@repo/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { VerifySchema, VerifySchemaType } from "../_validators/verify-schema";
import { useResendOtpMutation, useVerifyOtpMutation } from "@/apis/authentication/two-factor";

export default function VerifyForm() {
  const verifyOtp = useVerifyOtpMutation();
  const resendOtp = useResendOtpMutation();

  const handleVerify = (values: VerifySchemaType) => {
    verifyOtp.verify(
      { ...values, id: 5 },
      {
        onSuccess: (result) => {
          toast.success(result.message);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  const handleResend = async () => {
    resendOtp.resend(
      {
        email: "sogbesansegun@gmail.com",
      },
      {
        onSuccess: (result) => {
          toast.success(result.message);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  const defaultValues = {
    otpToken: "",
  };

  const form = useForm<VerifySchemaType>({
    resolver: zodResolver(VerifySchema),
    defaultValues,
    mode: "onSubmit",
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleVerify)} className="space-y-4">
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="otpToken"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type your 6 digits security code</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={5} {...field} className="flex gap-8">
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot index={1} />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot index={4} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <p className="text-sm">
            Didn{"'"}t get the code?{" "}
            <span onClick={handleResend} className="font-semibold text-muted-foreground transition-colors hover:text-blue-400 cursor-pointer">
              Resend.
            </span>
          </p>

          <Button className="w-full py-6 rounded-lg" loading={verifyOtp.isPending || resendOtp.isPending}>
            Verify My Account
          </Button>
        </form>
      </Form>
    </>
  );
}
