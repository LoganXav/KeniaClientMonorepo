// @ts-nocheck
import { GetRequestReturnType, PostRequestReturnType } from "@/config/base-query";
import { SubjectGradingStructureType } from "@/types";
import { buildGetResponse, buildPostResponse } from "@/mocks/responses";
import { MOCK_TENANT_ID, MOCK_SUBJECTS, MOCK_STAFF } from "@/mocks/constants";

/**
 * Mock responses for subject grading structure API endpoints
 * All responses match backend schema structures
 */

/**
 * Mock response for GET subject/gradingstructure/info/:gradeStructureId
 * Returns single subject grading structure filtered by subjectId
 */
export function mockGetSubjectGradingStructureResponse(params?: {
  tenantId?: number;
  subjectId?: number;
}): GetRequestReturnType<SubjectGradingStructureType> {
  // Find subject by ID
  const subjectId = params?.subjectId || MOCK_SUBJECTS[0]?.id || 1;
  
  // Return grading structure for the subject
  // In a real scenario, this would be stored per subject
  return buildGetResponse({
    id: subjectId,
    tenantId: params?.tenantId || MOCK_TENANT_ID,
    subjectId: subjectId,
    staffId: MOCK_STAFF.TEACHER_1.id,
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
  });
}

/**
 * Mock response for POST subject/gradingstructure/create
 * Returns created subject grading structure
 */
export const mockCreateSubjectGradingStructureResponse: PostRequestReturnType<SubjectGradingStructureType> = buildPostResponse(
  {
    id: 2,
    tenantId: MOCK_TENANT_ID,
    subjectId: MOCK_SUBJECTS[1]?.id || 2,
    staffId: MOCK_STAFF.TEACHER_1.id,
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
  "Subject grading structure created successfully",
  201
);
