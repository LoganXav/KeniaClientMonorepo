import type { Meta, StoryObj } from "@storybook/react";
import { SearchInput } from "@repo/ui";

const meta: Meta<typeof SearchInput> = {
  title: "Atoms/SearchInput",
  component: SearchInput,
  tags: ["autodocs"],
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
    placeholder: "Type to search...",
  },
};
