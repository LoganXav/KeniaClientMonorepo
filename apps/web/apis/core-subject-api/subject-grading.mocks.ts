import { GetRequestReturnType, PostRequestReturnType } from "@/config/base-query";
import { SubjectGradingTemplateOptions } from "@/app/@protected/(staff-portal)/student/grading/_types/subject-grading-types";
import { SubjectGradingType } from "@/types";
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

/**
 * Mock response for GET subject/grading/list
 * Returns array of subject grading records
 */
export const mockGetSubjectGradingListResponse: GetRequestReturnType<SubjectGradingType[]> = {
  data: [
    {
      continuousAssessmentScores: [
        { id: 1, name: "Assignment", score: 15 },
        { id: 2, name: "Quiz", score: 12 },
        { id: 3, name: "Project", score: 18 },
      ],
      subject: {} as any,
      totalScore: 75,
      grade: "A",
      classId: 1,
      classDivisionId: 1,
      student: {
        classDivision: {} as any,
      },
    },
    {
      continuousAssessmentScores: [
        { id: 4, name: "Assignment", score: 12 },
        { id: 5, name: "Quiz", score: 10 },
      ],
      subject: {} as any,
      totalScore: 68,
      grade: "B",
      classId: 1,
      classDivisionId: 1,
      student: {
        classDivision: {} as any,
      },
    },
  ],
  message: "Resource fetched successfully",
  statusCode: 200,
};

/**
 * Mock response for POST subject/grading/create
 * Returns created subject grading
 */
export const mockSubjectGradingCreateResponse: PostRequestReturnType<SubjectGradingType> = {
  data: {
    continuousAssessmentScores: [
      { id: 6, name: "Assignment", score: 18 },
      { id: 7, name: "Quiz", score: 15 },
      { id: 8, name: "Project", score: 20 },
    ],
    subject: {} as any,
    totalScore: 83,
    grade: "A",
    classId: 1,
    classDivisionId: 1,
    student: {
      classDivision: {} as any,
    },
  },
  message: "Subject grading created successfully",
  statusCode: 201,
};

/**
 * Mock response for POST subject/grading/bulk/create
 * Returns null (bulk operations typically return success message only)
 */
export const mockSubjectGradingBulkCreateResponse: PostRequestReturnType<null> = {
  data: null,
  message: "Subject grading created successfully",
  statusCode: 201,
};
