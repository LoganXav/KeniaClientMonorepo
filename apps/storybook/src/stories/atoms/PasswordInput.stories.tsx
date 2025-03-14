import { PasswordInput } from "@repo/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Atoms/PasswordInput",
  component: PasswordInput,
  argTypes: {
    placeholder: {
      description: "Input placeholder text",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "null" },
      },
    },
    disabled: {
      description: "A disabled input is unusable and un-clickable",
      control: "boolean",
      table: {
        category: "State",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    className: {
      description: "Override or extend the styles applied to the component",
      control: "text",
      table: {
        category: "Override/extend",
        type: { summary: "string" },
        defaultValue: { summary: "" },
      },
    },
  },
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter your password",
  },
};
