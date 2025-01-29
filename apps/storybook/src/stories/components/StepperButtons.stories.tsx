/* eslint-disable no-constant-condition */
import { Button, Card } from "@repo/ui";
import { UserCheck } from "lucide-react";
import type { Meta, StoryObj } from "@storybook/react";
import type { Stepper } from "../../hooks/use-stepper";

interface StepperButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  step: number;
  selected: boolean;
  stepper: Stepper;
  i: number;
  completedSteps: number;
  complete?: boolean;
}

const meta: Meta<StepperButtonProps> = {
  title: "Components/StepperButton",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    step: {
      control: "number",
      description: "Step number",
    },
    selected: {
      control: "boolean",
      description: "Indicates if this step is selected",
    },
    completedSteps: {
      control: "number",
      description: "The number of completed steps",
    },
    complete: {
      control: "boolean",
      description: "Indicates if the step is complete",
    },
    children: {
      control: "text",
      description: "Content of the button",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const steps = [{ label: "Step 1" }, { label: "Step 2" }, { label: "Step 3" }, { label: "Step 4" }, { label: "Step 5" }];

export const Default: Story = {
  args: {
    step: 1,
    selected: false,
    completedSteps: 0,
    complete: false,
    children: "Step 1",
    stepper: {
      go: (step: number) => console.log(`Go to step ${step}`),
    } as Stepper,
  },
  render: (args) => (
    <Card className="flex items-center p-4 gap-4 w-full md:max-w-min mx-auto overflow-x-scroll">
      <Button
        variant="outline"
        className={`flex min-w-60 justify-between border-border whitespace-nowrap ${args.selected && "bg-transparent/5 border-foreground"} ${args.step < args.completedSteps + 1 || (args.complete && "bg-transparent/5")}`}
        onClick={() => (args.complete ? null : alert("stepper go to" + " " + 1))}
      >
        <div className="flex w-full items-center justify-between px-2 text-foreground">
          {steps[args.step - 1]?.label}
          <span className={`flex h-6 w-6 items-center justify-center rounded-full p-1 text-xs ${args.step < args.completedSteps + 1 || args.complete ? "bg-foreground text-input" : ""} ${args.selected ? "bg-transparent/5" : "border border-border"}`}>
            {args.step < args.completedSteps + 1 || args.complete ? <UserCheck /> : args.step}
          </span>
        </div>
      </Button>
    </Card>
  ),
};

export const StepsCard: Story = {
  render: (args) => (
    <Card className="flex items-center p-4 gap-4 w-full md:max-w-min mx-auto overflow-x-scroll">
      {steps.map((step, i) => (
        <div key={i}>
          <Button variant="outline" className={`flex min-w-60 justify-between border-border whitespace-nowrap ${args.selected && "bg-transparent/5 border-foreground"} ${i < args.completedSteps && "bg-transparent/5"}`} onClick={() => (args.complete ? null : args.stepper.go(i))}>
            <div className="flex w-full items-center justify-between px-2 text-foreground">
              {step.label}
              <span className={`flex h-6 w-6 items-center justify-center rounded-full p-1 text-xs ${i < args.completedSteps ? "bg-foreground text-input" : ""} ${args.selected ? "bg-transparent/5" : "border border-border"}`}>{i < args.completedSteps ? <UserCheck /> : i + 1}</span>
            </div>
          </Button>
        </div>
      ))}
    </Card>
  ),
  args: {
    step: 1,
    selected: false,
    completedSteps: 2,
    complete: false,
    children: "Step 1",
    stepper: {
      go: (step: number) => console.log(`Go to step ${step}`),
    } as Stepper,
  },
};
