import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "@repo/ui";

const meta = {
  title: "Atoms/Typography",
  component: Typography,
  argTypes: {
    size: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "blockquote", "large", "small"],
      description: "The size of the typography component",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "p" },
      },
    },
    color: {
      control: "select",
      options: ["default", "muted"],
      description: "The color of the typography text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    weight: {
      control: "select",
      options: ["light", "normal", "medium", "semibold", "bold"],
      description: "The font weight of the text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "normal" },
      },
    },
    as: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "blockquote", "div", "span"],
      description: "The HTML element to render",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "div" },
      },
    },
    children: {
      control: "text",
      description: "The content to display",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply",
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading1: Story = {
  args: {
    size: "h1",
    children: "Heading 1",
  },
};

export const Heading2: Story = {
  args: {
    size: "h2",
    children: "Heading 2",
  },
};

export const Paragraph: Story = {
  args: {
    size: "p",
    children: "This is a paragraph of text. It demonstrates the default typography style.",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    children: "Large Text",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    children: "Small Text",
  },
};

export const Muted: Story = {
  args: {
    size: "p",
    color: "muted",
    children: "Muted Text",
  },
};

export const CustomWeight: Story = {
  args: {
    size: "p",
    weight: "bold",
    children: "Bold Text",
  },
};

export const Blockquote: Story = {
  args: {
    size: "blockquote",
    children: "This is a blockquote. It can be used to highlight important text or quotes.",
  },
};
