"use client";

import { useSignUpMutation } from "@/apis/authentication/authentication";
import { Button, PasswordInput, Input, toast, Form, FormField, FormItem, FormControl, FormMessage } from "@repo/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AuthSignUpSchema, AuthSignUpSchemaType } from "../_validators/auth-signup-schema";
import { useRouter } from "next/navigation";
import { RouteEnums } from "@/constants/router/route-constants";

export default function AuthSignUpForm() {
  const { signUp, isPending, error } = useSignUpMutation();

  const router = useRouter();

  const handleSignup = (values: AuthSignUpSchemaType) => {
    signUp(
      { ...values },
      {
        onSuccess: (result) => {
          toast.success(result.message);
          router.push(`${RouteEnums.VERIFY}?id=${result.data.id}&email=${values.email}`);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  const defaultValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
  };

  const form = useForm<AuthSignUpSchemaType>({
    resolver: zodResolver(AuthSignUpSchema),
    defaultValues,
    mode: "onSubmit",
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSignup)} className="space-y-4">
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Phone Number" {...field} />
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PasswordInput placeholder="Confirm Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className="w-full py-6 rounded-lg" loading={isPending}>
            Create Your Kenia Account
          </Button>

          <p className="text-sm text-muted-foreground">By clicking "Create Your Kenia Account", you agree to our Terms of Service, our Product T&C's and that you have read and understood our Privacy Policy.</p>
        </form>
      </Form>
    </>
  );
}
