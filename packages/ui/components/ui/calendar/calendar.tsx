"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, DropdownProps } from "react-day-picker";
import { cn } from "../../../lib/utils";
import { buttonVariants } from "../button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";
import { ScrollArea } from "../scroll-area";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-2", className)}
      classNames={{
        months: "flex flex-col space-y-4",
        month: "space-y-4 flex flex-col",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        caption_dropdowns: "flex justify-center items-center gap-1",
        nav: "space-x-1 flex items-center",
        nav_button: cn(buttonVariants({ variant: "outline" }), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "text-center bg-purple-500 text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn("h-10 w-10 p-0 text-sm font-normal aria-selected:opacity-100 text-center hover:bg-accent hover:text-accent-foreground rounded-md"),
        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        Dropdown: ({ value, onChange, ...props }: DropdownProps) => {
          const options =
            props.options?.map((option: Record<string, any>) => ({
              value: option.value,
              children: option.text || option.label,
            })) || [];

          const selected = options.find((option) => option.value === value);
          const handleChange = (value: string) => {
            const changeEvent = {
              target: { value },
            } as React.ChangeEvent<HTMLSelectElement>;
            onChange?.(changeEvent);
          };
          return (
            <Select value={value?.toString()} onValueChange={handleChange}>
              <SelectTrigger className="h-7 w-[110px] border-border bg-transparent px-2 my-2 font-medium focus:ring-0">
                <SelectValue>{selected?.children}</SelectValue>
              </SelectTrigger>
              <SelectContent position="popper" className="w-[var(--rdp-caption-dropdown-width)]">
                {options.map((option, id: number) => (
                  <SelectItem key={`${option.value}-${id}`} value={option.value?.toString() ?? ""} className="cursor-pointer">
                    {option.children}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        },
        PreviousMonthButton: (props) => (
          <button {...props} className={cn(buttonVariants({ variant: "outline" }), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100")}>
            <ChevronLeft className="h-4 w-4" />
          </button>
        ),
        NextMonthButton: (props) => (
          <button {...props} className={cn(buttonVariants({ variant: "outline" }), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100")}>
            <ChevronRight className="h-4 w-4" />
          </button>
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
