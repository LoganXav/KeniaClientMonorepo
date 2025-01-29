import type { Meta, StoryObj } from "@storybook/react";
import { Button, Toaster, toast } from "@repo/ui";

const meta: Meta<typeof Toaster> = {
  title: "Components/Toast",
  component: Toaster,
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: "select",
      options: ["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"],
      defaultValue: "top-right",
      description: "Position of the toast notifications",
    },
    richColors: {
      control: "boolean",
      defaultValue: false,
      description: "Enable or disable rich colors for the toast messages",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    position: "top-left",
  },
  render: (args) => (
    <>
      <Toaster {...args} />
      <Button onClick={() => toast.success("This is a success message!")}>Show Toast</Button>
    </>
  ),
};

export const All: Story = {
  render: (args) => (
    <>
      <Toaster {...args} />
      <div className="flex gap-4">
        <Button onClick={() => toast.success("This is a success message!")}>Show Success Toast</Button>
        <Button variant={"destructive"} onClick={() => toast.error("This is an error message!")}>
          Show Error Toast
        </Button>
        <Button variant={"outline"} onClick={() => toast.info("This is an info message!")}>
          Show Info Toast
        </Button>
      </div>
    </>
  ),
};
