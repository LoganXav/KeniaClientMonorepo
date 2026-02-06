import { createCalendar } from "../factories/calendar";
import { CalendarType } from "@/types";
import { MOCK_CALENDAR } from "../constants";

/**
 * Mock calendar data
 */
export const mockCalendar: CalendarType = createCalendar(
  MOCK_CALENDAR.id,
  MOCK_CALENDAR.year,
  MOCK_CALENDAR.terms.map((term) => ({
    id: term.id,
    name: term.name,
    startDate: term.startDate,
    endDate: term.endDate,
    breakWeeks: [],
  }))
);
