"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "../button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../command";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Badge } from "../badge";
import { Cross2Icon } from "@radix-ui/react-icons";

interface MultiSelectProps {
  options: Record<string, any>[];
  selected: number[];
  onChange: (values: number[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
}

export function MultiSelect({ options, selected, onChange, placeholder = "Select options...", searchPlaceholder = "Search items...", emptyMessage = "No items found." }: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (value: number) => {
    const newSelected = selected?.includes(value) ? selected?.filter((item) => item !== value) : [...selected, value];
    onChange(newSelected);
  };

  const handleRemove = (value: number) => {
    const newSelected = selected?.filter((item) => item !== value);
    onChange(newSelected);
  };

  return (
    <>
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1 bg-card border border-border rounded-lg p-2">
          {selected.map((selected) => (
            <Badge variant="secondary" className="rounded text-foreground bg-card border border-border hover:bg-secondary" key={selected}>
              {options.find((option) => option?.id === selected)?.name}
              <Button
                aria-label="Remove option"
                size="sm"
                className="ml-2 h-auto bg-transparent p-0 text-primary hover:bg-transparent hover:text-destructive"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRemove(selected);
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => handleRemove(selected)}
              >
                <Cross2Icon className="h-3 w-3" aria-hidden="true" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="shadow-none">
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between h-12 bg-card border border-border shadow-none font-normal text-[15px]">
            {selected?.length === 0 ? placeholder : `${selected?.length} selected`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup className="max-h-60 overflow-auto">
              {options?.map((option) => (
                <CommandItem key={option?.id} onSelect={() => handleSelect(option?.id)} className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="border rounded w-4 h-4 flex items-center justify-center">{selected?.includes(option?.id) && <Check className="h-3 w-3" />}</div>
                    {option?.name}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
