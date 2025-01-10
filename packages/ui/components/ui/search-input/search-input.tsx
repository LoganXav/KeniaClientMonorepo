"use client";

import { forwardRef } from "react";
import { Input, InputProps } from "../input";
import { cn } from "../../../lib/utils";
import { SearchIcon } from "lucide-react";

const SearchInput = forwardRef<
  HTMLInputElement,
  InputProps & { label?: string }
>(({ className, label, ...props }, ref) => {
  return (
    <div className="border relative flex items-center pl-4 rounded-lg min-w-96">
      <SearchIcon className="text-muted-foreground" />
      <Input
        id={label}
        className={cn(
          "pr-10 outline-none focus:outline-none focus-visible:ring-0 peer h-9 pt-4 bg-transparent border-none",
          className,
          !label && "pt-0 py-1",
        )}
        ref={ref}
        {...props}
      />
      <label
        htmlFor={label}
        className={cn(
          "absolute text-sm left-3 top-5 peer-invalid:text-[10px] peer-invalid:top-1 transition-all cursor-text peer-invalid:text-muted-foreground peer-focus:text-muted-foreground peer-focus:text-[10px] peer-focus:top-1",
        )}
      >
        {label}
      </label>
    </div>
  );
});
SearchInput.displayName = "SearchInput";

export { SearchInput };
