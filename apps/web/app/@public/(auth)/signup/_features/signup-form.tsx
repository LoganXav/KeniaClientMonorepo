"use client";

import { useSignUpMutation } from "@/apis/authentication/authentication";
import { Button, PasswordInput, Input, toast, Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@repo/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { SignUpSchema, SignUpSchemaType } from "../_validators/signup-schema";
import { useRouter } from "next/navigation";
import { RouteEnums } from "@/constants/router/route-constants";

export default function SignUpForm() {
  const { signUp, isPending, error } = useSignUpMutation();
  const router = useRouter();

  const handleSignup = (values: SignUpSchemaType) => {
    signUp(
      { ...values },
      {
        onSuccess: (result) => {
          toast.success(result.message);
          router.push(RouteEnums.VERIFY);
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

  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues,
    mode: "onSubmit",
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSignup)} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
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
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
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
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <p className="text-sm">
            Already have an account?{" "}
            <Link href={"/signin"} className="font-semibold text-muted-foreground transition-colors hover:text-blue-400">
              Signin.
            </Link>
          </p>

          <Button className="w-full py-6 rounded-lg" loading={isPending}>
            Create My Account
          </Button>
        </form>
      </Form>
    </>
  );
}
