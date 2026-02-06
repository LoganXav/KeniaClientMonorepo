// @ts-nocheck
import { GetRequestReturnType, PostRequestReturnType } from "@/config/base-query";
import { CalendarType } from "@/types";
import { SchoolCalendarTemplateOptions } from "@/app/@protected/(staff-portal)/school/calendar/create/_types/school-calendar-form-types";
import { mockCalendar } from "@/mocks/data";
import { buildGetResponse, buildPostResponse } from "@/mocks/responses";
import { createCalendar } from "@/mocks/factories";

/**
 * Mock responses for calendar API endpoints
 * All responses match backend schema structures
 */

/**
 * Mock response for GET calendar/list
 * Returns array of calendars
 */
export const mockGetCalendarResponse: GetRequestReturnType<CalendarType[]> = buildGetResponse([
  mockCalendar,
  createCalendar(2, 2025, []),
]);

/**
 * Mock response for GET calendar/info
 * Returns single calendar
 */
export const mockGetSingleCalendarResponse: GetRequestReturnType<CalendarType> = buildGetResponse(
  mockCalendar
);

/**
 * Mock response for GET calendar/template
 * Returns template options for calendar creation
 */
export const mockGetCalendarTemplateResponse: GetRequestReturnType<SchoolCalendarTemplateOptions> = buildGetResponse({
  schoolSessionOptions: [
    { id: 1, name: "2024/2025", year: 2024 },
    { id: 2, name: "2025/2026", year: 2025 },
  ],
});

/**
 * Mock response for POST calendar/create
 * Returns created calendar
 */
export const mockCalendarCreateResponse: PostRequestReturnType<CalendarType> = buildPostResponse(
  createCalendar(3, 2026, []),
  "Calendar created successfully",
  201
);
