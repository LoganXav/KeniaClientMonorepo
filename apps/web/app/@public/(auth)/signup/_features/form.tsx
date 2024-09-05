"use client";

import { Button, PasswordInput, Input, Label } from "@repo/ui";
import Link from "next/link";

export default function SignUpForm() {
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

      <Button className="w-full py-6 rounded-lg">Signup</Button>
    </>
  );
}
