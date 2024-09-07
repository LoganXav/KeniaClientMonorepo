"use client";

import { Button, toast, Form, FormField, FormItem, FormLabel, FormControl, FormMessage, Input } from "@repo/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RouteEnums } from "@/constants/router/route-constants";
import Link from "next/link";
import { useResetPasswordRequestMutation } from "@/apis/authentication/reset-password";
import { ResetPasswordRequestSchema, ResetPasswordRequestSchemaType } from "../_validators/reset-password-schema";
import { useRouter } from "next/navigation";

export default function ResetPasswordRequestForm() {
  const resetPasswordRequest = useResetPasswordRequestMutation();
  const router = useRouter();

  const handleResetPassword = (values: ResetPasswordRequestSchemaType) => {
    resetPasswordRequest.resetPasswordRequest(
      { ...values },
      {
        onSuccess: (result) => {
          toast.success(result.message);
          router.push(RouteEnums.CHANGE_PASSWORD);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  const defaultValues = {
    email: "",
  };

  const form = useForm<ResetPasswordRequestSchemaType>({
    resolver: zodResolver(ResetPasswordRequestSchema),
    defaultValues,
    mode: "onSubmit",
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleResetPassword)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="w-full py-6 rounded-lg bg-destructive" loading={resetPasswordRequest.isPending}>
              Reset Password
            </Button>
            <Link href={RouteEnums.SIGNIN}>
              <Button type="button" className="w-full py-6 rounded-lg" disabled={resetPasswordRequest.isPending}>
                Back to Signin
              </Button>
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
}
