import { GetRequestReturnType, PostRequestReturnType } from "@/config/base-query";
import { StudentCalendarResultType } from "@/types";
import { createMockStudent } from "./student.mocks";

/**
 * Mock responses for student calendar result API endpoints
 * All responses match backend schema structures
 */

/**
 * Mock response for GET student/calendarresult/list
 * Returns array of student calendar results
 */
export const mockGetStudentCalendarResultListResponse: GetRequestReturnType<StudentCalendarResultType[]> = {
  data: [
    {
      id: 1,
      calendarId: 1,
      classId: 1,
      tenantId: 1,
      studentId: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      totalScore: 1350,
      finalized: false,
      student: createMockStudent(1, "ADM001", "Alice", "Johnson", "alice.johnson@example.com") as any,
      averageScore: 75.0,
      classDivisionId: 1,
      subjectCountGraded: 18,
      studentCalendarTermAverageScores: [
        { termId: 1, term: { id: 1, name: "First Term", startDate: "2024-09-01", endDate: "2024-12-15", breakWeeks: [] } as any, averageScore: 75.0 },
        { termId: 2, term: { id: 2, name: "Second Term", startDate: "2025-01-08", endDate: "2025-04-15", breakWeeks: [] } as any, averageScore: 78.0 },
        { termId: 3, term: { id: 3, name: "Third Term", startDate: "2025-05-01", endDate: "2025-07-15", breakWeeks: [] } as any, averageScore: 72.0 },
      ],
    },
    {
      id: 2,
      calendarId: 1,
      classId: 1,
      tenantId: 1,
      studentId: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      totalScore: 1260,
      finalized: false,
      student: createMockStudent(2, "ADM002", "Bob", "Williams", "bob.williams@example.com") as any,
      averageScore: 70.0,
      classDivisionId: 1,
      subjectCountGraded: 18,
      studentCalendarTermAverageScores: [
        { termId: 1, term: { id: 1, name: "First Term", startDate: "2024-09-01", endDate: "2024-12-15", breakWeeks: [] } as any, averageScore: 70.0 },
        { termId: 2, term: { id: 2, name: "Second Term", startDate: "2025-01-08", endDate: "2025-04-15", breakWeeks: [] } as any, averageScore: 72.0 },
        { termId: 3, term: { id: 3, name: "Third Term", startDate: "2025-05-01", endDate: "2025-07-15", breakWeeks: [] } as any, averageScore: 68.0 },
      ],
    },
    {
      id: 3,
      calendarId: 1,
      classId: 1,
      tenantId: 1,
      studentId: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      totalScore: 1440,
      finalized: true,
      student: createMockStudent(3, "ADM003", "Charlie", "Brown", "charlie.brown@example.com") as any,
      averageScore: 80.0,
      classDivisionId: 2,
      subjectCountGraded: 18,
      studentCalendarTermAverageScores: [
        { termId: 1, term: { id: 1, name: "First Term", startDate: "2024-09-01", endDate: "2024-12-15", breakWeeks: [] } as any, averageScore: 80.0 },
        { termId: 2, term: { id: 2, name: "Second Term", startDate: "2025-01-08", endDate: "2025-04-15", breakWeeks: [] } as any, averageScore: 82.0 },
        { termId: 3, term: { id: 3, name: "Third Term", startDate: "2025-05-01", endDate: "2025-07-15", breakWeeks: [] } as any, averageScore: 78.0 },
      ],
    },
  ],
  message: "Resource fetched successfully",
  statusCode: 200,
};

/**
 * Mock response for POST student/calendarresult/:studentId
 * Returns updated student calendar result
 */
export const mockStudentCalendarResultUpdateResponse: PostRequestReturnType<StudentCalendarResultType> = {
  data: {
    id: 1,
    calendarId: 1,
    classId: 1,
    tenantId: 1,
    studentId: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    totalScore: 1440,
    finalized: true,
    student: createMockStudent(1, "ADM001", "Alice", "Johnson", "alice.johnson@example.com") as any,
    averageScore: 80.0,
    classDivisionId: 1,
    subjectCountGraded: 18,
    studentCalendarTermAverageScores: [
      { termId: 1, term: { id: 1, name: "First Term", startDate: "2024-09-01", endDate: "2024-12-15", breakWeeks: [] } as any, averageScore: 80.0 },
      { termId: 2, term: { id: 2, name: "Second Term", startDate: "2025-01-08", endDate: "2025-04-15", breakWeeks: [] } as any, averageScore: 82.0 },
      { termId: 3, term: { id: 3, name: "Third Term", startDate: "2025-05-01", endDate: "2025-07-15", breakWeeks: [] } as any, averageScore: 78.0 },
    ],
  },
  message: "Student calendar result updated successfully",
  statusCode: 200,
};
