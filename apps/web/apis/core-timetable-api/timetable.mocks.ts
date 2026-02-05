import { GetRequestReturnType, PostRequestReturnType } from "@/config/base-query";
import { TimetablePeriodType, TimetableType } from "@/types";
import { SchoolTimetableTemplateOptions } from "@/app/@protected/(staff-portal)/school/timetable/create/_types/school-timetable-form-types";

/**
 * Mock responses for timetable API endpoints
 * All responses match backend schema structures
 */

/**
 * Mock response for GET timetable/list
 * Returns array of timetable periods
 */
export const mockGetTimetableResponse: GetRequestReturnType<TimetablePeriodType[]> = {
  data: [
    { start: "08:00", end: "09:00", title: "Mathematics" },
    { start: "09:15", end: "10:15", title: "English" },
    { start: "10:30", end: "11:30", title: "Physics" },
    { start: "11:45", end: "12:45", title: "Chemistry" },
    { start: "13:00", end: "14:00", title: "Break" },
    { start: "14:15", end: "15:15", title: "Biology" },
    { start: "15:30", end: "16:30", title: "Geography" },
  ],
  message: "Resource fetched successfully",
  statusCode: 200,
};

/**
 * Mock response for GET timetable/info
 * Returns single timetable
 */
export const mockGetSingleTimetableResponse: GetRequestReturnType<TimetableType> = {
  data: {
    id: 1,
    day: "Monday",
    classDivisionId: 1,
    periods: [],
  },
  message: "Resource fetched successfully",
  statusCode: 200,
};

/**
 * Mock response for GET timetable/template
 * Returns template options for timetable creation
 */
export const mockGetTimetableTemplateResponse: GetRequestReturnType<{
  classOptions: { id: number; name: string }[];
  classDivisionOptions: { id: number; name: string }[];
  subjectOptions: { id: number; name: string }[];
  dayOptions: string[];
  breakTypeOptions: string[];
  termOptions: { id: number; name: string; startDate: string; endDate: string; tenantId: number }[];
  calendarOptions: { id: number; name: string; year: number }[];
}> = {
  data: {
    classOptions: [
      { id: 1, name: "SS 1" },
      { id: 2, name: "SS 2" },
      { id: 3, name: "SS 3" },
    ],
    classDivisionOptions: [
      { id: 1, name: "A" },
      { id: 2, name: "B" },
      { id: 3, name: "C" },
    ],
    subjectOptions: [
      { id: 1, name: "Mathematics" },
      { id: 2, name: "English" },
      { id: 3, name: "Physics" },
      { id: 4, name: "Chemistry" },
      { id: 5, name: "Biology" },
    ],
    dayOptions: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    breakTypeOptions: ["Shortbreak", "Longbreak"],
    termOptions: [
      { id: 1, name: "First Term", startDate: "2024-09-01", endDate: "2024-12-15", tenantId: 1 },
      { id: 2, name: "Second Term", startDate: "2025-01-08", endDate: "2025-04-15", tenantId: 1 },
      { id: 3, name: "Third Term", startDate: "2025-05-01", endDate: "2025-07-15", tenantId: 1 },
    ],
    calendarOptions: [
      { id: 1, name: "2024/2025", year: 2024 },
      { id: 2, name: "2025/2026", year: 2025 },
    ],
  },
  message: "Resource fetched successfully",
  statusCode: 200,
};

/**
 * Mock response for POST timetable/create
 * Returns created timetable
 */
export const mockTimetableCreateResponse: PostRequestReturnType<TimetableType> = {
  data: {
    id: 1,
    day: "Monday",
    classDivisionId: 1,
    periods: [],
  },
  message: "Timetable created successfully",
  statusCode: 201,
};
