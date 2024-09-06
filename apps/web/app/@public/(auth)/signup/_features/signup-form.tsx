"use client";

import { useCoreSignupMutation } from "@/apis/core-authentication";
import { Button, PasswordInput, Input, Label, toast } from "@repo/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { SignUpSchema, SignUpSchemaType } from "../_validators/signup-schema";

export default function SignUpForm() {
  const { signUp, isPending, error } = useCoreSignupMutation();

  const handleSignup = () => {
    signUp(
      {
        firstName: "James",
        lastName: "Nathan",
        phoneNumber: "09052916792",
        email: "sogbesansegun8@gmail.com",
        password: "123456",
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
      <div className="grid gap-4 grid-cols-2">
        <div className="space-y-1">
          <Label>First Name</Label>
          <Input type="text" />
        </div>
        <div className="space-y-1">
          <Label>Last Name</Label>
          <Input type="text" />
        </div>

        <div className="space-y-1">
          <Label>Email Address</Label>
          <Input type="text" />
        </div>
        <div className="space-y-1">
          <Label>Phone Number</Label>
          <Input type="text" />
        </div>
        <div className="space-y-1">
          <Label>Password </Label>
          <PasswordInput />
        </div>
        <div className="space-y-1">
          <Label>Confirm Password </Label>
          <PasswordInput />
        </div>
      </div>

      <p className="text-sm">
        Already have an account?{" "}
        <Link href={"/signin"} className="font-semibold text-muted-foreground transition-colors hover:text-blue-400">
          Signin.
        </Link>
      </p>

      <Button className="w-full py-6 rounded-lg" onClick={handleSignup} loading={isPending}>
        Signup
      </Button>
    </>
  );
}
