import * as React from "react";
import { cn } from "../../../lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "bg-card border-border text-[15px] placeholder-muted-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-card flex field-sizing-content min-h-24 w-full rounded-md border px-3 py-2 shadow-none transition-[color,box-shadow] outline-none focus-visible:outline-none focus-visible:border-primary focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
