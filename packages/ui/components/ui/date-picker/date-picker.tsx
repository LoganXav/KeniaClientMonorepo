"use client";

import { format, parseISO } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { FormControl } from "../form";
import { Button } from "../button";
import { Calendar } from "../calendar";
import { cn } from "../../../lib/utils";

export function DatePicker({ field, placeholder = "Select date" }: { field: any; placeholder?: string }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button variant={"outline"} className={cn("w-full h-12 border border-border shadow-none placeholder-muted-foreground bg-card pl-3 text-left font-normal hover:text-muted-foreground focus:border-foreground", !field.value && "text-muted-foreground")}>
            {field.value ? format(parseISO(field.value), "PPP") : <span>{placeholder}</span>}
            <CalendarIcon className="ml-auto h-4 w-4 text-muted-foreground" strokeWidth={1} />
          </Button>
        </FormControl>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" toYear={new Date().getFullYear() + 10} selected={field.value ? parseISO(field.value) : undefined} onSelect={(date) => field.onChange(date?.toISOString())} captionLayout="dropdown" />
      </PopoverContent>
    </Popover>
  );
}
