"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { RouteEnums } from "@/constants/router/route-constants";
import { useSignInMutation } from "@/apis/core-authentication-api/authentication";
import { AuthSignInSchema, AuthSignInSchemaType } from "../_validators/auth-signin-schema";
import { Button, Input, PasswordInput, FormField, FormItem, Form, FormMessage, FormControl, toast } from "@repo/ui";

export default function AuthSignInForm() {
  const { signIn, isPending, error } = useSignInMutation();
  const router = useRouter();
  const searchParams = useSearchParams();

  const userType = searchParams.get("userType")!;

  if (!userType) {
    router.push(RouteEnums.LOBBY);
  }

  const handleSignIn = (values: AuthSignInSchemaType) => {
    signIn(
      { ...values, userType },
      {
        onSuccess: (result) => {
          toast.success(result.message);
          // router.push(`${RouteEnums.VERIFY}?id=${result.data.id}&email=${values.email}`);
          router.push(RouteEnums.DASHBOARD);
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

  const form = useForm<AuthSignInSchemaType>({
    resolver: zodResolver(AuthSignInSchema),
    defaultValues,
    mode: "onSubmit",
  });
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSignIn)} className="space-y-4">
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email Address" {...field} />
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
                  <FormControl>
                    <PasswordInput placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center justify-between">
            <div />
            <Link href={RouteEnums.RESET_PASSWORD} className="underline text-sm font-semibold text-muted-foreground transition-colors hover:text-link">
              Forgot password?
            </Link>
          </div>

          {/* <p className="text-sm"> */}
          {/*   New to Kenia?{" "} */}
          {/*   <Link */}
          {/*     href={RouteEnums.SIGNUP} */}
          {/*     className="font-semibold text-muted-foreground transition-colors hover:text-link" */}
          {/*   > */}
          {/*     Create an account. */}
          {/*   </Link> */}
          {/* </p> */}

          <Button loading={isPending} className="w-full py-6 rounded-lg">
            Sign in
          </Button>
        </form>
      </Form>
    </>
  );
}
