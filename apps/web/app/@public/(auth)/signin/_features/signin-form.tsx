"use client";

import { useSignInMutation } from "@/apis/authentication/authentication";
import { RouteEnums } from "@/constants/router/route-constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, PasswordInput, FormField, FormLabel, FormItem, Form, FormMessage, FormControl, toast } from "@repo/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { SignInSchema, SignInSchemaType } from "../_validators/signin-schema";

export default function SignInForm() {
  const { signIn, isPending, error } = useSignInMutation();
  const router = useRouter();

  const handleSignIn = (values: SignInSchemaType) => {
    signIn(
      { ...values, userType: "staff" },
      {
        onSuccess: (result) => {
          toast.success(result.message);
          // router.push(`${RouteEnums.VERIFY}?id=${result.data.id}&email=${values.email}`);
          router.push(RouteEnums.HOME);
        },
        onError: (error: any) => {
          toast.error(error.message);
        },
      }
    );
  };

  const defaultValues = {
    email: "",
    password: "",
  };

  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues,
    mode: "onSubmit",
  });
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSignIn)} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center justify-between">
            <div />
            <Link href={RouteEnums.RESET_PASSWORD} className="text-sm font-semibold text-muted-foreground transition-colors hover:text-link">
              Forgot password?
            </Link>
          </div>

          <p className="text-sm">
            New to Kenia?{" "}
            <Link href={RouteEnums.SIGNUP} className="font-semibold text-muted-foreground transition-colors hover:text-link">
              Create an account.
            </Link>
          </p>

          <Button loading={isPending} className="w-full py-6 rounded-lg">
            Signin
          </Button>
        </form>
      </Form>
    </>
  );
}
