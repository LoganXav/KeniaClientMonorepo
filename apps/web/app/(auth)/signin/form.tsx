"use client"

import { Button, Input, PasswordInput, Label } from "@repo/ui"
import Link from "next/link"

export default function SignInForm() {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Email Address</Label>
          <Input type="text" placeholder="Type your email address" />
        </div>
        <div className="space-y-2">
          <Label>Password </Label>
          <PasswordInput placeholder="Type your password" />
        </div>
      </div>

      <p className="text-center py-8 text-sm">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente
        consequatur perspiciatis iusto sit repellat dignissimos similique
        aliquid! Enim repudiandae atque, vitae hic reprehenderit itaque eaque
        nam sit praesentium et?{" "}
        <Link
          href={"/signup"}
          className="font-semibold text-gray-500 transition-colors hover:text-black"
        >
          signup.
        </Link>
      </p>

      <Button className="w-full py-8 rounded-full">Submit</Button>
    </>
  )
}
