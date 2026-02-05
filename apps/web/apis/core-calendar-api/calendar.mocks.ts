import { GetRequestReturnType, PostRequestReturnType } from "@/config/base-query";
import { CalendarType } from "@/types";
import { SchoolCalendarTemplateOptions } from "@/app/@protected/(staff-portal)/school/calendar/create/_types/school-calendar-form-types";

/**
 * Mock responses for calendar API endpoints
 * All responses match backend schema structures
 */

/**
 * Mock response for GET calendar/list
 * Returns array of calendars
 */
export const mockGetCalendarResponse: GetRequestReturnType<CalendarType[]> = {
  data: [
    {
      id: 1,
      year: 2024,
      terms: [
        {
          id: 1,
          name: "First Term",
          startDate: "2024-09-01",
          endDate: "2024-12-15",
          breakWeeks: [],
        },
        {
          id: 2,
          name: "Second Term",
          startDate: "2025-01-08",
          endDate: "2025-04-15",
          breakWeeks: [],
        },
        {
          id: 3,
          name: "Third Term",
          startDate: "2025-05-01",
          endDate: "2025-07-15",
          breakWeeks: [],
        },
      ],
    },
    {
      id: 2,
      year: 2025,
      terms: [],
    },
  ],
  message: "Resource fetched successfully",
  statusCode: 200,
};

/**
 * Mock response for GET calendar/info
 * Returns single calendar
 */
export const mockGetSingleCalendarResponse: GetRequestReturnType<CalendarType> = {
  data: {
    id: 1,
    year: 2024,
    terms: [
      {
        id: 1,
        name: "First Term",
        startDate: "2024-09-01",
        endDate: "2024-12-15",
        breakWeeks: [],
      },
      {
        id: 2,
        name: "Second Term",
        startDate: "2025-01-08",
        endDate: "2025-04-15",
        breakWeeks: [],
      },
      {
        id: 3,
        name: "Third Term",
        startDate: "2025-05-01",
        endDate: "2025-07-15",
        breakWeeks: [],
      },
    ],
  },
  message: "Resource fetched successfully",
  statusCode: 200,
};

/**
 * Mock response for GET calendar/template
 * Returns template options for calendar creation
 */
export const mockGetCalendarTemplateResponse: GetRequestReturnType<SchoolCalendarTemplateOptions> = {
  data: {
    schoolSessionOptions: [
      { id: 1, name: "2024/2025", year: 2024 },
      { id: 2, name: "2025/2026", year: 2025 },
    ],
  },
  message: "Resource fetched successfully",
  statusCode: 200,
};

/**
 * Mock response for POST calendar/create
 * Returns created calendar
 */
export const mockCalendarCreateResponse: PostRequestReturnType<CalendarType> = {
  data: {
    id: 3,
    year: 2026,
    terms: [],
  },
  message: "Calendar created successfully",
  statusCode: 201,
};
