import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from "@repo/ui";

const meta: Meta = {
  title: "Atoms/Select",
  component: Select,
  argTypes: {
    placeholder: {
      description: "Placeholder text inside the input",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Type to search..." },
      },
    },
    className: {
      description: "Custom class names for styling",
      control: "text",
      table: {
        category: "Override/extend",
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
    placeholder: "Select an option",
  },

  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={args.placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
      </SelectContent>
    </Select>
  ),
};
