"use client";

import { Button, toast, Form, FormField, FormItem, FormLabel, FormControl, FormMessage, Input, InputOTP, InputOTPGroup, InputOTPSlot } from "@repo/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RouteEnums } from "@/constants/router/route-constants";
import { useChangePasswordMutation } from "@/apis/authentication/reset-password";
import { AuthChangePasswordSchema, AuthChangePasswordSchemaType } from "../_validators/auth-change-password-schema";
import { useRouter } from "next/navigation";

export default function ChangePasswordForm() {
  const changePassword = useChangePasswordMutation();
  const router = useRouter();

  const handleResetPassword = (values: AuthChangePasswordSchemaType) => {
    changePassword.changePassword(
      { payload: { password: values.password }, path: { token: values.token } },
      {
        onSuccess: (result) => {
          toast.success(result.message);
          router.push(RouteEnums.SIGNIN);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  const defaultValues = {
    password: "",
    token: "",
  };

  const form = useForm<AuthChangePasswordSchemaType>({
    resolver: zodResolver(AuthChangePasswordSchema),
    defaultValues,
    mode: "onSubmit",
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleResetPassword)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="">
              <FormField
                control={form.control}
                name="token"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type your 5 digits password reset code</FormLabel>
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="New Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Confirm Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full py-6 rounded-lg" loading={changePassword.isPending}>
            Create New Password
          </Button>
        </form>
      </Form>
    </>
  );
}
