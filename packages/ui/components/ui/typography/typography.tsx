import { cn } from "../../../lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes, forwardRef } from "react";

const typographyVariants = cva("", {
  variants: {
    size: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 text-3xl lg:text-4xl font-semibold tracking-tight",
      h3: "scroll-m-20 text-2xl lg:text-3xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl lg:text-2xl font-semibold tracking-tight",
      h5: "scroll-m-20 text-lg font-semibold tracking-tight",
      h6: "scroll-m-20 text-base font-semibold tracking-tight",
      p: "leading-7 text-[15px]",
      blockquote: "mt-6 border-l-2 pl-6 italic",
      ul: "my-6 ml-6 list-disc [&>li]:mt-2",
      large: "text-lg font-semibold",
      small: "text-[13px] font-medium leading-none",
    },
    color: {
      default: "text-foreground",
      muted: "text-muted-foreground",
    },
    weight: {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    size: "p",
    color: "default",
    weight: "normal",
  },
});

export interface TypographyProps extends Omit<HTMLAttributes<HTMLElement>, "color">, VariantProps<typeof typographyVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "blockquote" | "div" | "span";
}

const Typography = forwardRef<HTMLElement, TypographyProps>(({ className, size, color, weight, as = "div", ...props }, ref) => {
  const Component = as || "div";

  return <Component ref={ref as any} className={cn(typographyVariants({ size, color, weight, className }))} {...props} />;
});

Typography.displayName = "Typography";

export { Typography, typographyVariants };
