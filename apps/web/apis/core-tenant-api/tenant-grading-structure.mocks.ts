// @ts-nocheck
import { GetRequestReturnType, PostRequestReturnType } from "@/config/base-query";
import { SchoolGradingStructureType } from "@/types";
import { SchoolGradingStructureTemplateOptions } from "@/app/@protected/(staff-portal)/school/grading/create/_types/school-grading-structure-form-types";
import { mockClassList } from "@/mocks/data";
import { buildGetResponse, buildPostResponse } from "@/mocks/responses";

/**
 * Mock responses for tenant grading structure API endpoints
 * All responses match backend schema structures
 */

const mockGradingStructure: SchoolGradingStructureType = {
  id: 1,
  name: "Standard Grading",
  examWeight: 60,
  continuousAssessmentWeight: 40,
  updatedAt: new Date().toISOString(),
  classes: [],
  gradeBoundaries: [
    { id: 1, grade: "A", maximumScore: 100, minimumScore: 70, remark: "Excellent", tenantGradingStructureId: 1, updatedAt: new Date().toISOString() },
    { id: 2, grade: "B", maximumScore: 69, minimumScore: 60, remark: "Very Good", tenantGradingStructureId: 1, updatedAt: new Date().toISOString() },
    { id: 3, grade: "C", maximumScore: 59, minimumScore: 50, remark: "Good", tenantGradingStructureId: 1, updatedAt: new Date().toISOString() },
    { id: 4, grade: "D", maximumScore: 49, minimumScore: 40, remark: "Fair", tenantGradingStructureId: 1, updatedAt: new Date().toISOString() },
    { id: 5, grade: "F", maximumScore: 39, minimumScore: 0, remark: "Fail", tenantGradingStructureId: 1, updatedAt: new Date().toISOString() },
  ],
};

/**
 * Mock response for GET tenant/gradingstructure/list
 * Returns array of grading structures
 */
export const mockGetSchoolGradingStructureListResponse: GetRequestReturnType<SchoolGradingStructureType[]> = buildGetResponse([
  mockGradingStructure,
]);

/**
 * Mock response for GET tenant/gradingstructure/info/:gradeStructureId
 * Returns single grading structure filtered by classId
 */
export function mockGetSchoolGradingStructureResponse(params?: {
  tenantId?: number;
  classId?: number;
}): GetRequestReturnType<SchoolGradingStructureType> {
  // Filter classes by classId if provided
  let filteredClasses = mockClassList;
  if (params?.classId) {
    filteredClasses = mockClassList.filter((c) => c.id === params.classId);
  }
  
  return buildGetResponse({
    ...mockGradingStructure,
    classes: filteredClasses,
  });
}

/**
 * Mock response for GET tenant/gradingstructure/template
 * Returns template options for grading structure creation
 */
export const mockGetSchoolGradingStructureTemplateResponse: GetRequestReturnType<SchoolGradingStructureTemplateOptions> = buildGetResponse({
  gradeOptions: ["A", "B", "C", "D", "F"],
  classOptions: mockClassList.slice(0, 3),
});

/**
 * Mock response for POST tenant/gradingstructure/create
 * Returns created grading structure
 */
export const mockCreateSchoolGradingStructureResponse: PostRequestReturnType<SchoolGradingStructureType> = buildPostResponse(
  {
    id: 2,
    name: "New Grading Structure",
    examWeight: 70,
    continuousAssessmentWeight: 30,
    updatedAt: new Date().toISOString(),
    classes: [],
    gradeBoundaries: [],
  },
  "Grading structure created successfully",
  201
);
