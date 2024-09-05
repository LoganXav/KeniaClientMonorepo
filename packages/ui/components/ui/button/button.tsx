import { Children, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../../lib/utils";
import { ButtonStyle } from "./style";
import LoadingSpinner from "../../icons/loading-spinner";

const buttonVariants = cva(ButtonStyle.base, {
  variants: {
    variant: ButtonStyle.variants,
    size: ButtonStyle.sizes,
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, loading, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} disabled={loading} {...props}>
      {props.children} {loading ? <LoadingSpinner /> : null}
    </Comp>
  );
});

Button.displayName = "Button";

export { Button, ButtonStyle, buttonVariants };
