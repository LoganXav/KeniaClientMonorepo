"use client"

import { Button } from "@repo/ui"
import { Input } from "@repo/ui"
import { useTheme } from "next-themes"

export default function Page(): JSX.Element {
  const { setTheme } = useTheme()

  return (
    <div className="container flex flex-col mt-8 space-y-4">
      <Button onClick={() => setTheme("dark")}>Toggle Dark</Button>
      <Button onClick={() => setTheme("light")}>Toggle Light</Button>
      <p>Hello from my home page</p>
      <Input type="text" />
    </div>
  )
}
