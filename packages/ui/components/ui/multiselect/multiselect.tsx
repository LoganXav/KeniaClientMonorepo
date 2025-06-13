"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { Button } from "../button";
import { Badge } from "../badge";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Input } from "../input";

interface MultiSelectProps {
  options: Record<string, any>[];
  selected: number[];
  onChange: (values: number[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
}

export function MultiSelect({ options, selected, onChange, placeholder = "Select options...", searchPlaceholder = "Search items...", emptyMessage = "No items found.", disabled = false }: MultiSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredOptions = options.filter((option) => option.name.toLowerCase().includes(searchValue.toLowerCase()));

  const handleSelect = (value: number) => {
    const newSelected = selected?.includes(value) ? selected?.filter((item) => item !== value) : [...selected, value];
    onChange(newSelected);
  };

  const handleRemove = (value: number) => {
    const newSelected = selected?.filter((item) => item !== value);
    onChange(newSelected);
  };

  return (
    <div className="relative" ref={containerRef}>
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1 bg-card border border-border rounded-lg p-2 mb-2">
          {selected.map((selected) => (
            <Badge variant="secondary" className="rounded text-foreground bg-card border border-border hover:bg-secondary" key={selected}>
              {options.find((option) => option?.id === selected)?.name}
              <Button
                disabled={disabled}
                aria-label="Remove option"
                size="sm"
                type="button"
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

      <Button disabled={disabled} type="button" variant="outline" role="combobox" aria-expanded={isOpen} className="w-full justify-between h-12 bg-card border border-border shadow-none font-normal text-[15px]" onClick={() => setIsOpen(!isOpen)}>
        {selected?.length === 0 ? placeholder : `${selected?.length} selected`}
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 rounded-md border bg-popover shadow-md z-50">
          <div className="px-2 flex space-x-2 items-center">
            <Search className="h-4 w-4 shrink-0 opacity-50" />
            <Input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder={searchPlaceholder} className="w-full border-none pl-0" />
          </div>
          <div className="max-h-[200px] overflow-auto p-1">
            {filteredOptions.map((option) => (
              <div key={option.id} onClick={() => handleSelect(option.id)} className="flex items-center gap-2 p-2 cursor-pointer hover:bg-accent rounded-sm">
                <div className="border rounded w-4 h-4 flex items-center justify-center">{selected?.includes(option.id) && <Check className="h-3 w-3" />}</div>
                {option.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
