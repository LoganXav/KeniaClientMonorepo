import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription, SheetHeader, SheetFooter, Button } from "@repo/ui";

const options = ["left", "right", "top", "bottom"];
const meta: Meta = {
  title: "Atoms/Sheet",
  component: Sheet,
  argTypes: {
    side: {
      description: "Defines the side where the sheet will appear.",
      table: {
        type: { summary: options.join("|") },
        defaultValue: { summary: "left" },
      },
      control: "select",
      options: options,
    },

    className: {
      description: "Custom class names for styling",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    side: "left",
  },
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button onClick={() => setOpen(true)}>Open Sheet</Button>
        </SheetTrigger>
        <SheetContent side={args.side} {...args}>
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
            <SheetDescription>This is a description inside the sheet</SheetDescription>
          </SheetHeader>
          <div className="p-6">Some content goes here...</div>
          <SheetFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  },
};
