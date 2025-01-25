"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { FormControl } from "../form";
import { Button } from "../button";
import { Calendar } from "../calendar";
import { cn } from "../../../lib/utils";

export function DatePicker({ field }: any) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button variant={"outline"} className={cn("w-full border-none bg-muted pl-3 text-left font-normal text-base hover:text-muted-foreground", !field.value && "text-muted-foreground")}>
            {field.value ? format(field.value, "PPP") : <span>Date of Birth</span>}
            <CalendarIcon className="ml-auto h-4 w-4" />
          </Button>
        </FormControl>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar captionLayout="dropdown-buttons" mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus fromYear={1930} toYear={2006} />
      </PopoverContent>
    </Popover>
  );
}
