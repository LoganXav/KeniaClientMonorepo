import { GetRequestReturnType } from "@/config/base-query";
import { StudentGradingType } from "@/types";

/**
 * Mock responses for student grading API endpoints
 * All responses match backend schema structures
 */

/**
 * Mock response for GET student/grading/list
 * Returns array of student grading data
 */
export const mockGetStudentGradingListResponse: GetRequestReturnType<StudentGradingType[]> = {
  data: [
    {
      classId: 1,
      classDivisionId: 1,
      subjects: [
        {
          id: 1,
          name: "Mathematics",
          description: "",
          classId: 1,
          class: {} as any,
          staffs: [],
          subjectRegistration: [],
          gradingStructure: {} as any,
          tenantId: 1,
          tenant: {} as any,
          grading: {
            grade: "A",
            totalScore: 85,
          },
        },
        {
          id: 2,
          name: "English",
          description: "",
          classId: 1,
          class: {} as any,
          staffs: [],
          subjectRegistration: [],
          gradingStructure: {} as any,
          tenantId: 1,
          tenant: {} as any,
          grading: {
            grade: "B",
            totalScore: 78,
          },
        },
        {
          id: 3,
          name: "Physics",
          description: "",
          classId: 1,
          class: {} as any,
          staffs: [],
          subjectRegistration: [],
          gradingStructure: {} as any,
          tenantId: 1,
          tenant: {} as any,
          grading: {
            grade: "A",
            totalScore: 88,
          },
        },
      ],
      user: {
        id: 1,
        firstName: "Alice",
        lastName: "Johnson",
      },
    },
    {
      classId: 1,
      classDivisionId: 1,
      subjects: [
        {
          id: 1,
          name: "Mathematics",
          description: "",
          classId: 1,
          class: {} as any,
          staffs: [],
          subjectRegistration: [],
          gradingStructure: {} as any,
          tenantId: 1,
          tenant: {} as any,
          grading: {
            grade: "B",
            totalScore: 72,
          },
        },
        {
          id: 2,
          name: "English",
          description: "",
          classId: 1,
          class: {} as any,
          staffs: [],
          subjectRegistration: [],
          gradingStructure: {} as any,
          tenantId: 1,
          tenant: {} as any,
          grading: {
            grade: "C",
            totalScore: 65,
          },
        },
      ],
      user: {
        id: 2,
        firstName: "Bob",
        lastName: "Williams",
      },
    },
    {
      classId: 1,
      classDivisionId: 2,
      subjects: [
        {
          id: 1,
          name: "Mathematics",
          description: "",
          classId: 1,
          class: {} as any,
          staffs: [],
          subjectRegistration: [],
          gradingStructure: {} as any,
          tenantId: 1,
          tenant: {} as any,
          grading: {
            grade: "A",
            totalScore: 90,
          },
        },
        {
          id: 3,
          name: "Physics",
          description: "",
          classId: 1,
          class: {} as any,
          staffs: [],
          subjectRegistration: [],
          gradingStructure: {} as any,
          tenantId: 1,
          tenant: {} as any,
          grading: {
            grade: "A",
            totalScore: 92,
          },
        },
      ],
      user: {
        id: 3,
        firstName: "Charlie",
        lastName: "Brown",
      },
    },
  ],
  message: "Resource fetched successfully",
  statusCode: 200,
};
