"use client";

import { Button, Input, PasswordInput, Label } from "@repo/ui";
import Link from "next/link";

export default function SignInForm() {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Email Address</Label>
          <Input type="text" />
        </div>
        <div className="space-y-2">
          <Label>Password </Label>
          <PasswordInput />
        </div>
      </div>

      <p className="text-sm">
        Don't have an account yet?{" "}
        <Link href={"/signup"} className="font-semibold text-muted-foreground transition-colors hover:text-blue-400">
          Signup.
        </Link>
      </p>

      <Button className="w-full py-6 rounded-lg">Signin</Button>
    </>
  );
}
