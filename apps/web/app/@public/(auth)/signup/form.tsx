"use client"

import { Button, PasswordInput, Input, Label } from "@repo/ui"
import Link from "next/link"

export default function SignUpForm() {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>First Name</Label>
          <Input type="text" placeholder="Type your first name" />
        </div>
        <div className="space-y-2">
          <Label>Last Name</Label>
          <Input type="text" placeholder="Type your last name" />
        </div>

        <div className="space-y-2">
          <Label>Email Address</Label>
          <Input type="text" placeholder="Type your email address" />
        </div>
        <div className="space-y-2">
          <Label>Phone Number</Label>
          <Input type="text" placeholder="Type your phone number" />
        </div>
        <div className="space-y-2">
          <Label>Password </Label>
          <PasswordInput placeholder="Type your password" />
        </div>
        <div className="space-y-2">
          <Label>Confirm Password </Label>
          <PasswordInput placeholder="Confiem your password" />
        </div>
      </div>

      <p className="text-center py-8 text-sm">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente
        consequatur perspiciatis iusto sit repellat dignissimos similique
        aliquid! Enim repudiandae atque, vitae hic reprehenderit itaque eaque
        nam sit praesentium et?{" "}
        <Link
          href={"/signin"}
          className="font-semibold text-gray-500 transition-colors hover:text-black"
        >
          signin.
        </Link>
      </p>

      <Button className="w-full py-8 rounded-full">Submit</Button>
    </>
  )
}
