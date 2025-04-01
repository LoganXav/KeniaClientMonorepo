"use client";

import * as React from "react";
import { Period } from "./time-picker-utils";
import { Label } from "../label";
import { TimePickerInput } from "./time-picker-input";
import { TimePeriodSelect } from "./period-select";

interface TimePickerProps {
  date: string | Date | undefined;
  setDate: (date: string | Date | undefined) => void;
}

export function TimePicker({ date, setDate }: TimePickerProps) {
  const [period, setPeriod] = React.useState<Period>(() => {
    if (!date) return "AM";
    const hours = new Date(date).getHours();
    return hours >= 12 ? "PM" : "AM";
  });

  React.useEffect(() => {
    if (date) {
      const hours = new Date(date).getHours();
      setPeriod(hours >= 12 ? "PM" : "AM");
    }
  }, [date]);

  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const secondRef = React.useRef<HTMLInputElement>(null);
  const periodRef = React.useRef<HTMLButtonElement>(null);

  return (
    <div className="flex items-end gap-2">
      <div className="grid gap-1 text-left">
        <Label htmlFor="hours" className="text-xs">
          Hours
        </Label>
        <TimePickerInput picker="12hours" period={period} date={date} setDate={setDate} ref={hourRef} onRightFocus={() => minuteRef.current?.focus()} />
      </div>
      <div className="grid gap-1 text-left">
        <Label htmlFor="minutes" className="text-xs">
          Minutes
        </Label>
        <TimePickerInput picker="minutes" id="minutes12" date={date} setDate={setDate} ref={minuteRef} onLeftFocus={() => hourRef.current?.focus()} onRightFocus={() => secondRef.current?.focus()} />
      </div>
      <div className="grid gap-1 text-left">
        <Label htmlFor="seconds" className="text-xs">
          Seconds
        </Label>
        <TimePickerInput picker="seconds" id="seconds12" date={date} setDate={setDate} ref={secondRef} onLeftFocus={() => minuteRef.current?.focus()} onRightFocus={() => periodRef.current?.focus()} />
      </div>
      <div className="grid gap-1 text-left">
        <Label htmlFor="period" className="text-xs">
          Period
        </Label>
        <TimePeriodSelect period={period} setPeriod={setPeriod} date={date} setDate={setDate} ref={periodRef} onLeftFocus={() => secondRef.current?.focus()} />
      </div>
    </div>
  );
}
