import { BreakWeekType } from "@/types";
import { CalendarType, TermType } from "@/types";
import { format, parseISO, differenceInYears } from "date-fns";

export const formatDateToString = (dateString: string | undefined): string => {
  if (!dateString) return "";

  const date = parseISO(dateString);
  const day = Number(format(date, "d")); // Convert to number
  const monthYear = format(date, "MMMM, yyyy");

  // Determine ordinal suffix
  const suffix = ["th", "st", "nd", "rd"][day % 10 > 3 || Math.floor((day % 100) / 10) === 1 ? 0 : day % 10] || "th";

  return `${day}${suffix} ${monthYear}`;
};

export const calculateAge = (dateOfBirth: string | undefined): number | string => {
  if (!dateOfBirth) return "-";

  const birthDate = parseISO(dateOfBirth);
  return differenceInYears(new Date(), birthDate);
};

// Helper function to transform API data to events format
export function parseCalendarDataToEvents(data: CalendarType[] = []): { title: string; start: string; end?: string; date?: string }[] {
  const events: { title: string; start: string; end?: string; date?: string }[] = [];

  data.forEach((calendar) => {
    calendar.terms.forEach((term: TermType) => {
      // Add term as an event
      events.push({
        title: term.name,
        start: term.startDate,
        end: term.endDate,
      });

      // Add break weeks as events
      term.breakWeeks.forEach((breakWeek: BreakWeekType) => {
        events.push({
          title: breakWeek.name,
          start: breakWeek.startDate,
          end: breakWeek.endDate,
        });
      });
    });
  });

  return events;
}

export function formatTimeRange(start: string, end: string): string {
  const startTime = format(new Date(start), "HH:mm");
  const endTime = format(new Date(end), "HH:mm");
  return `${startTime} - ${endTime}`;
}

/**
 * Converts a date value (Date object or ISO string) to an ISO string
 * Used in mock responses to ensure dates are properly serialized as strings
 * @param date - Date object or ISO string
 * @returns ISO string representation of the date
 */
export function toISOString(date: Date | string): string {
  if (typeof date === "string") {
    // If it's already a string, validate it's a valid ISO string
    const parsed = new Date(date);
    if (isNaN(parsed.getTime())) {
      throw new Error(`Invalid date string: ${date}`);
    }
    return parsed.toISOString();
  }
  return date.toISOString();
}
