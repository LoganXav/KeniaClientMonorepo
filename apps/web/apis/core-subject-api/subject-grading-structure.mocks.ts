import { GetRequestReturnType, PostRequestReturnType } from "@/config/base-query";
import { SubjectGradingStructureType } from "@/types";

/**
 * Mock responses for subject grading structure API endpoints
 * All responses match backend schema structures
 */

/**
 * Mock response for GET subject/gradingstructure/info/:gradeStructureId
 * Returns single subject grading structure
 */
export const mockGetSubjectGradingStructureResponse: GetRequestReturnType<SubjectGradingStructureType> = {
  data: {
    id: 1,
    tenantId: 1,
    subjectId: 1,
    staffId: 1,
    continuousAssessmentBreakdownItems: [
      {
        id: 1,
        name: "Assignment",
        weight: 20,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 2,
        name: "Quiz",
        weight: 15,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 3,
        name: "Project",
        weight: 25,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
  },
  message: "Resource fetched successfully",
  statusCode: 200,
};

/**
 * Mock response for POST subject/gradingstructure/create
 * Returns created subject grading structure
 */
export const mockCreateSubjectGradingStructureResponse: PostRequestReturnType<SubjectGradingStructureType> = {
  data: {
    id: 2,
    tenantId: 1,
    subjectId: 2,
    staffId: 1,
    continuousAssessmentBreakdownItems: [
      {
        id: 4,
        name: "Assignment",
        weight: 30,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 5,
        name: "Quiz",
        weight: 20,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
  },
  message: "Subject grading structure created successfully",
  statusCode: 201,
};
