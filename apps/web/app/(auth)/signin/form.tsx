"use client"

import { Button, PasswordInput, Textfield } from "@repo/ui"
import Link from "next/link"

export default function SignInForm() {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        <Textfield label="First Name" />
        <Textfield label="Last Name" />
        <Textfield label="Email Address" />
        <Textfield label="Phone Number" />
        <PasswordInput label="Password" />
        <PasswordInput label="Confirm Password" />
      </div>

      <p className="text-center py-8">
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
