"use client";
import { Stepper } from "@/hooks/use-stepper";
import { Button, cn } from "@repo/ui";
import { CheckCheckIcon } from "lucide-react";
import React from "react";

interface StepperButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  step: number;
  selected: boolean;
  stepper: Stepper;
  i: number;
  completedSteps: number;
}

export default function StepperButton({ children, className, step, selected, stepper, i, completedSteps }: StepperButtonProps) {
  const isCompleted = i < completedSteps;

  return (
    <Button variant="outline" className={cn("flex min-w-60 justify-between border-border whitespace-nowrap", className, selected && "bg-transparent/5 border-foreground", isCompleted && "bg-transparent/5")} onClick={() => stepper.go(i)}>
      <div className="flex w-full items-center justify-between px-2 text-foreground">
        {children}
        <span className={cn("flex h-6 w-6 items-center justify-center rounded-full p-1 text-xs", isCompleted ? "" : "", selected ? "bg-transparent/5" : "border border-border")}>{isCompleted ? <CheckCheckIcon /> : step}</span>
      </div>
    </Button>
  );
}
