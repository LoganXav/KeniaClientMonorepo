import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from "@repo/ui";

const meta: Meta = {
  title: "Atoms/Card",
  component: Card,
  argTypes: {
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
  args: {},
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>This is a brief description of the card content.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is some content inside the card. It can be anything, from text to media.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};
