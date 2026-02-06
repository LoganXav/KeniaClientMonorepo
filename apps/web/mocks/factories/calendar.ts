import { CalendarType, TermType } from "@/types";

/**
 * Factory function to create mock calendar data
 */
export function createCalendar(
  id: number,
  year: number,
  terms: TermType[]
): CalendarType {
  return {
    id,
    year,
    terms,
  };
}
