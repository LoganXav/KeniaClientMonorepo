// @ts-nocheck
import { GetRequestReturnType, PostRequestReturnType } from "@/config/base-query";
import { TimetablePeriodType, TimetableType } from "@/types";
import { SchoolTimetableTemplateOptions } from "@/app/@protected/(staff-portal)/school/timetable/create/_types/school-timetable-form-types";
import { mockTimetablePeriodList, mockTimetable } from "@/mocks/data";
import { mockClassList, mockClassDivisionList, mockSubjectList, mockCalendar } from "@/mocks/data";
import { buildGetResponse, buildPostResponse } from "@/mocks/responses";

/**
 * Mock responses for timetable API endpoints
 * All responses match backend schema structures
 */

/**
 * Mock response for GET timetable/list
 * Returns array of timetable periods filtered by classDivisionId and termId
 */
export function mockGetTimetableResponse(params?: {
  tenantId?: number;
  classDivisionId?: number;
  termId?: number;
}): GetRequestReturnType<TimetablePeriodType[]> {
  // If classDivisionId is provided, get periods from that division's timetable
  if (params?.classDivisionId) {
    const { mockTimetableList } = require("@/mocks/data/timetables");
    const timetable = mockTimetableList.find(
      (t: TimetableType) => t.classDivisionId === params.classDivisionId
    );
    if (timetable && timetable.periods.length > 0) {
      // Convert PeriodType[] to TimetablePeriodType[]
      const periods: TimetablePeriodType[] = timetable.periods.map((p) => ({
        start: p.startTime,
        end: p.endTime,
        title: p.isBreak ? p.breakType || "Break" : p.subject?.name || "Unknown",
      }));
      return buildGetResponse(periods);
    }
  }
  
  // Default: return generic timetable periods
  return buildGetResponse(mockTimetablePeriodList);
}

/**
 * Mock response for GET timetable/info
 * Returns single timetable filtered by classDivisionId, day, and termId
 */
export function mockGetSingleTimetableResponse(params?: {
  tenantId?: number;
  classDivisionId?: number;
  day?: string;
  termId?: number;
}): GetRequestReturnType<TimetableType> {
  const { mockTimetableList } = require("@/mocks/data/timetables");
  
  // Find timetable matching the filters
  let timetable = mockTimetableList.find((t: TimetableType) => {
    if (params?.classDivisionId && t.classDivisionId !== params.classDivisionId) return false;
    if (params?.day && t.day !== params.day) return false;
    // Note: termId filtering would require adding termId to TimetableType
    return true;
  });
  
  // Fallback to default if not found
  if (!timetable) {
    timetable = mockTimetable;
  }
  
  return buildGetResponse(timetable);
}

/**
 * Mock response for GET timetable/template
 * Returns template options for timetable creation
 * Filters options based on classId
 */
export function mockGetTimetableTemplateResponse(params?: {
  classId?: number;
  tenantId?: number;
  calendarId?: number;
}): GetRequestReturnType<SchoolTimetableTemplateOptions> {
  // Filter class divisions by classId if provided
  let classDivisionOptions = mockClassDivisionList;
  if (params?.classId) {
    classDivisionOptions = mockClassDivisionList.filter((cd) => cd.classId === params.classId);
  }
  
  // Filter subjects by classId if provided
  let subjectOptions = mockSubjectList;
  if (params?.classId) {
    subjectOptions = mockSubjectList.filter((s) => s.classId === params.classId);
  }
  
  return buildGetResponse({
    classOptions: mockClassList.map((c) => ({ id: c.id, name: c.name })),
    classDivisionOptions: classDivisionOptions.map((cd) => ({ id: cd.id, name: cd.name })),
    subjectOptions: subjectOptions.map((s) => ({ id: s.id, name: s.name })),
    dayOptions: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    breakTypeOptions: ["Shortbreak", "Longbreak"],
    termOptions: mockCalendar.terms.map((term) => ({
      id: term.id!,
      name: term.name,
      startDate: term.startDate,
      endDate: term.endDate,
      tenantId: params?.tenantId || 1,
    })),
    calendarOptions: [
      { id: mockCalendar.id, name: `${mockCalendar.year}/${mockCalendar.year + 1}`, year: mockCalendar.year },
      { id: 2, name: "2025/2026", year: 2025 },
    ],
  });
}

/**
 * Mock response for POST timetable/create
 * Returns created timetable
 */
export const mockTimetableCreateResponse: PostRequestReturnType<TimetableType> = buildPostResponse(
  mockTimetable,
  "Timetable created successfully",
  201
);
