"use client";

import * as React from "react";
import { Typography } from "@repo/ui";

export interface NavbarGreetingProps {
  /** Required: the person's name to greet */
  name: string;
  /** Optional: locale for time formatting, defaults to Lagos, Nigeria (en-NG) */
  locale?: string;
  /** Optional: show 24-hour clock (true) or 12-hour with AM/PM (false). Defaults to false. */
  twentyFourHour?: boolean;
  /** Optional: className to style the root element */
  className?: string;
}

/**
 * NavbarGreeting
 * - Client component that shows "Good morning/afternoon/evening, {name}" and a live clock down to the second.
 * - Uses the project's `Typography` component for all text.
 * - Defaults to Lagos, Nigeria locale (en-NG) when `locale` is not provided.
 */
export default function NavbarGreeting({
  name,
  locale = "en-NG",
  twentyFourHour = false,
  className = "",
}: NavbarGreetingProps) {
  const [now, setNow] = React.useState<Date>(() => new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hour = now.getHours();
  const greeting =
    hour >= 5 && hour < 12
      ? "Good morning"
      : hour >= 12 && hour < 17
        ? "Good afternoon"
        : "Good evening";

  const timeString = now.toLocaleTimeString(locale, {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: !twentyFourHour,
  });

  return (
    <div className={`flex flex-col items-start gap-1 ${className}`}>
      <Typography as="div" size="large" className="leading-tight">
        {greeting}, {name}
      </Typography>

      <Typography as="div" size="small" aria-live="polite" aria-atomic="true">
        {timeString}
      </Typography>
    </div>
  );
}
