import { GetRequestReturnType } from "@/config/base-query";
import { SubjectGradingTemplateOptions } from "@/app/@protected/(staff-portal)/student/grading/_types/subject-grading-types";
import { createMockStudent } from "../core-student-api/student.mocks";

/**
 * Mock responses for subject grading API endpoints
 * All responses match backend schema structures
 */

/**
 * Mock response for GET subject/grading/template
 * Returns template options for subject grading
 */
export const mockGetSubjectGradingTemplateResponse: GetRequestReturnType<SubjectGradingTemplateOptions> = {
  data: {
    calendarOptions: [
      { id: 1, year: 2024, terms: [] },
      { id: 2, year: 2025, terms: [] },
    ],
    termOptions: [
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
    classOptions: [
      { id: 1, name: "SS 1", classTeacherId: 1, classTeacher: {} as any, students: [], subjects: [], tenantId: 1, tenant: {} as any },
      { id: 2, name: "SS 2", classTeacherId: 1, classTeacher: {} as any, students: [], subjects: [], tenantId: 1, tenant: {} as any },
      { id: 3, name: "SS 3", classTeacherId: 1, classTeacher: {} as any, students: [], subjects: [], tenantId: 1, tenant: {} as any },
    ],
    classDivisionOptions: [
      { id: 1, name: "A", classId: 1, classDivisionTeacherId: 1, class: {} as any, tenantId: 1, tenant: {} as any, students: [], classDivionTeacher: {} as any },
      { id: 2, name: "B", classId: 1, classDivisionTeacherId: 1, class: {} as any, tenantId: 1, tenant: {} as any, students: [], classDivionTeacher: {} as any },
      { id: 3, name: "A", classId: 2, classDivisionTeacherId: 1, class: {} as any, tenantId: 1, tenant: {} as any, students: [], classDivionTeacher: {} as any },
    ],
    studentOptions: [
      createMockStudent(1, "ADM001", "Alice", "Johnson", "alice.johnson@example.com", 1, 1),
      createMockStudent(2, "ADM002", "Bob", "Williams", "bob.williams@example.com", 1, 1),
      createMockStudent(3, "ADM003", "Charlie", "Brown", "charlie.brown@example.com", 1, 2),
      createMockStudent(4, "ADM004", "Diana", "Davis", "diana.davis@example.com", 2, 1),
      createMockStudent(5, "ADM005", "Eve", "Miller", "eve.miller@example.com", 2, 2),
    ],
  },
  message: "Resource fetched successfully",
  statusCode: 200,
};
