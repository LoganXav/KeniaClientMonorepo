import { GetRequestReturnType, PostRequestReturnType } from "@/config/base-query";
import { StudentTermResultType } from "@/types";
import { createMockStudent } from "./student.mocks";

/**
 * Mock responses for student term result API endpoints
 * All responses match backend schema structures
 */

/**
 * Mock response for GET student/termresult/list
 * Returns array of student term results
 */
export const mockGetStudentTermResultListResponse: GetRequestReturnType<StudentTermResultType[]> = {
  data: [
    {
      id: 1,
      termId: 1,
      classId: 1,
      tenantId: 1,
      studentId: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      totalScore: 450,
      finalized: false,
      student: createMockStudent(1, "ADM001", "Alice", "Johnson", "alice.johnson@example.com") as any,
      averageScore: 75.0,
      classDivisionId: 1,
      subjectCountGraded: 6,
    },
    {
      id: 2,
      termId: 1,
      classId: 1,
      tenantId: 1,
      studentId: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      totalScore: 420,
      finalized: false,
      student: createMockStudent(2, "ADM002", "Bob", "Williams", "bob.williams@example.com") as any,
      averageScore: 70.0,
      classDivisionId: 1,
      subjectCountGraded: 6,
    },
    {
      id: 3,
      termId: 1,
      classId: 1,
      tenantId: 1,
      studentId: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      totalScore: 480,
      finalized: true,
      student: createMockStudent(3, "ADM003", "Charlie", "Brown", "charlie.brown@example.com") as any,
      averageScore: 80.0,
      classDivisionId: 2,
      subjectCountGraded: 6,
    },
  ],
  message: "Resource fetched successfully",
  statusCode: 200,
};

/**
 * Mock response for POST student/termresult/:studentId
 * Returns updated student term result
 */
export const mockStudentTermResultUpdateResponse: PostRequestReturnType<StudentTermResultType> = {
  data: {
    id: 1,
    termId: 1,
    classId: 1,
    tenantId: 1,
    studentId: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    totalScore: 480,
    finalized: true,
    student: createMockStudent(1, "ADM001", "Alice", "Johnson", "alice.johnson@example.com") as any,
    averageScore: 80.0,
    classDivisionId: 1,
    subjectCountGraded: 6,
  },
  message: "Student term result updated successfully",
  statusCode: 200,
};
