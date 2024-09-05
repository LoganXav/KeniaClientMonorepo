"use client";

import {
  Button,
  PasswordInput,
  Textfield,
  Input,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
  Label,
  Select,
} from "@repo/ui";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

export default function TestPage(): JSX.Element {
  const { setTheme } = useTheme();

  return (
    <div className="container flex flex-col mt-8 space-y-4">
      <p>Hello from my home page</p>

      <Label>First Name</Label>
      <Input type="text" />
      <Textfield label="First Name" type="text" />
      <PasswordInput label="Password" />
      <PasswordInput label="Confirm Password" />
      <Select>
        <SelectTrigger className="">
          <SelectValue placeholder="How did you learn about us?" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>

      <Button onClick={() => alert("Submitted!")}>Submit</Button>
      <Button variant="outline">Cool Button</Button>
      <Button variant={"destructive"}>Test button</Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <SunIcon className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
