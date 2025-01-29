import type { Meta, StoryObj } from "@storybook/react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@repo/ui";

const meta: Meta = {
  title: "Atoms/OTPInput",
  component: InputOTP,
  argTypes: {
    className: {
      control: "text",
      description: "Custom class names for styling",
    },
    containerClassName: {
      control: "text",
      description: "Custom class for the OTP input container",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <InputOTP maxLength={5} {...args}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
      </InputOTPGroup>
      <InputOTPGroup>
        <InputOTPSlot index={1} />
      </InputOTPGroup>
      <InputOTPGroup>
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPGroup>
        <InputOTPSlot index={3} />
      </InputOTPGroup>
      <InputOTPGroup>
        <InputOTPSlot index={4} />
      </InputOTPGroup>
    </InputOTP>
  ),
  args: {
    containerClassName: "flex gap-4",
    className: "",
  },
};
