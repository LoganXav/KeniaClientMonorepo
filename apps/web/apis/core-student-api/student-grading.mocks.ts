// @ts-nocheck
import { GetRequestReturnType } from "@/config/base-query";
import { StudentGradingType } from "@/types";
import { mockStudentList, mockSubjectList } from "@/mocks/data";
import { buildGetResponse } from "@/mocks/responses";
import { MOCK_STUDENTS } from "@/mocks/constants";

/**
 * Mock responses for student grading API endpoints
 * All responses match backend schema structures
 */

/**
 * Mock response for GET student/grading/list
 * Returns array of student grading data
 */
export const mockGetStudentGradingListResponse: GetRequestReturnType<StudentGradingType[]> = buildGetResponse([
  {
    classId: MOCK_STUDENTS[0]?.classId || 1,
    classDivisionId: MOCK_STUDENTS[0]?.classDivisionId || 1,
    subjects: [
      {
        ...(mockSubjectList[0] || {}),
        grading: {
          grade: "A",
          totalScore: 85,
        },
      },
      {
        ...(mockSubjectList[1] || {}),
        grading: {
          grade: "B",
          totalScore: 78,
        },
      },
      {
        ...(mockSubjectList[2] || {}),
        grading: {
          grade: "A",
          totalScore: 88,
        },
      },
    ],
    user: {
      id: mockStudentList[0]?.user?.id || 1,
      firstName: mockStudentList[0]?.user?.firstName || "",
      lastName: mockStudentList[0]?.user?.lastName || "",
    },
  },
  {
    classId: MOCK_STUDENTS[1]?.classId || 1,
    classDivisionId: MOCK_STUDENTS[1]?.classDivisionId || 1,
    subjects: [
      {
        ...(mockSubjectList[0] || {}),
        grading: {
          grade: "B",
          totalScore: 72,
        },
      },
      {
        ...(mockSubjectList[1] || {}),
        grading: {
          grade: "C",
          totalScore: 65,
        },
      },
    ],
    user: {
      id: mockStudentList[1]?.user?.id || 2,
      firstName: mockStudentList[1]?.user?.firstName || "",
      lastName: mockStudentList[1]?.user?.lastName || "",
    },
  },
  {
    classId: MOCK_STUDENTS[2]?.classId || 1,
    classDivisionId: MOCK_STUDENTS[2]?.classDivisionId || 1,
    subjects: [
      {
        ...(mockSubjectList[0] || {}),
        grading: {
          grade: "A",
          totalScore: 90,
        },
      },
      {
        ...(mockSubjectList[2] || {}),
        grading: {
          grade: "A",
          totalScore: 92,
        },
      },
    ],
    user: {
      id: mockStudentList[2]?.user?.id || 3,
      firstName: mockStudentList[2]?.user?.firstName || "",
      lastName: mockStudentList[2]?.user?.lastName || "",
    },
  },
]);
