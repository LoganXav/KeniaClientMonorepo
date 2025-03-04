"use client";

import * as React from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Command as CommandPrimitive } from "cmdk";
import { Command, CommandGroup, CommandItem } from "../command";
import { Badge } from "../badge";
import { Button } from "../button";

interface MultiSelectProps {
  selected: number[]; // Array of numbers
  setSelected: React.Dispatch<React.SetStateAction<number[]>>; // Function to update selected numbers
  placeholder?: string;
  options: { id: number; name: string }[]; // Options with id and name
}

export function MultiSelect({ selected, setSelected, placeholder = "Select Options", options }: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  console.log(selected, "====", options);

  const handleSelect = React.useCallback(
    (optionId: number) => {
      const newSelected = selected.includes(optionId) ? selected.filter((id) => id !== optionId) : [...selected, optionId];
      setSelected(newSelected);
    },
    [selected, setSelected]
  );

  const handleRemove = React.useCallback(
    (optionId: number) => {
      const newSelected = selected.filter((id) => id !== optionId);
      setSelected(newSelected);
    },
    [selected, setSelected]
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!inputRef.current) return;

      if (event.key === "Backspace" || event.key === "Delete") {
        const newSelected = selected.slice(0, -1);
        setSelected(newSelected);
      }

      if (event.key === "Escape") {
        inputRef.current.blur();
      }
    },
    [selected, setSelected]
  );

  const filteredOptions = React.useMemo(() => {
    return options.filter((option) => {
      if (selected.includes(option.id)) return false;
      if (query.length === 0) return true;
      return option.name.toLowerCase().includes(query.toLowerCase());
    });
  }, [options, query, selected]);

  return (
    <Command onKeyDown={handleKeyDown} className="min-h-12 overflow-visible text-[15px] rounded-lg border-border border">
      {/* <div className="group flex min-h-[54px] items-center rounded-md border border-border bg-black px-3 py-3 text-foreground focus-within:ring-0"> */}
      <div className="flex w-full h-full flex-wrap gap-1 px-3 py-1">
        {selected.map((id) => {
          const option = options.find((opt) => opt.id === id);
          return (
            option && (
              <Badge key={id} variant="secondary" className="rounded text-foreground hover:bg-secondary">
                {option.name}
                <Button
                  aria-label="Remove option"
                  size="sm"
                  className="ml-2 h-auto bg-transparent p-0 text-primary hover:bg-transparent hover:text-destructive"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      e.stopPropagation();
                      handleRemove(id);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleRemove(id)}
                >
                  <Cross2Icon className="h-3 w-3" aria-hidden="true" />
                </Button>
              </Badge>
            )
          );
        })}
        <CommandPrimitive.Input ref={inputRef} placeholder={placeholder} className="placeholder:text-muted-foreground placeholder:text-[15px] flex-1 bg-transparent outline-none" value={query} onValueChange={setQuery} onBlur={() => setOpen(false)} onFocus={() => setOpen(true)} />
      </div>
      {/* </div> */}
      <div className="relative z-50">
        {open && filteredOptions.length > 0 ? (
          <div className="text-foreground text-[15px] animate-in absolute top-1.5 w-full rounded-md border border-border bg-card shadow-none outline-none">
            <CommandGroup className="h-full overflow-auto">
              {filteredOptions.map((option) => (
                <CommandItem
                  key={option.id}
                  className="cursor-pointer bg-card px-2 py-1.5 focus:bg-accent focus:text-accent-foreground"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onSelect={() => {
                    handleSelect(option.id);
                    setQuery("");
                  }}
                >
                  {option.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  );
}
