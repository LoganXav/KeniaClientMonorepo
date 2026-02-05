import { GetRequestReturnType, PostRequestReturnType } from "@/config/base-query";
import { SchoolGradingStructureType } from "@/types";
import { SchoolGradingStructureTemplateOptions } from "@/app/@protected/(staff-portal)/school/grading/create/_types/school-grading-structure-form-types";

/**
 * Mock responses for tenant grading structure API endpoints
 * All responses match backend schema structures
 */

/**
 * Mock response for GET tenant/gradingstructure/list
 * Returns array of grading structures
 */
export const mockGetSchoolGradingStructureListResponse: GetRequestReturnType<SchoolGradingStructureType[]> = {
  data: [
    {
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
    },
  ],
  message: "Resource fetched successfully",
  statusCode: 200,
};

/**
 * Mock response for GET tenant/gradingstructure/info/:gradeStructureId
 * Returns single grading structure
 */
export const mockGetSchoolGradingStructureResponse: GetRequestReturnType<SchoolGradingStructureType> = {
  data: {
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
  },
  message: "Resource fetched successfully",
  statusCode: 200,
};

/**
 * Mock response for GET tenant/gradingstructure/template
 * Returns template options for grading structure creation
 */
export const mockGetSchoolGradingStructureTemplateResponse: GetRequestReturnType<SchoolGradingStructureTemplateOptions> = {
  data: {
    gradeOptions: ["A", "B", "C", "D", "F"],
    classOptions: [
      { id: 1, name: "SS 1", classTeacherId: 1, classTeacher: {} as any, students: [], subjects: [], tenantId: 1, tenant: {} as any },
      { id: 2, name: "SS 2", classTeacherId: 1, classTeacher: {} as any, students: [], subjects: [], tenantId: 1, tenant: {} as any },
      { id: 3, name: "SS 3", classTeacherId: 1, classTeacher: {} as any, students: [], subjects: [], tenantId: 1, tenant: {} as any },
    ],
  },
  message: "Resource fetched successfully",
  statusCode: 200,
};

/**
 * Mock response for POST tenant/gradingstructure/create
 * Returns created grading structure
 */
export const mockCreateSchoolGradingStructureResponse: PostRequestReturnType<SchoolGradingStructureType> = {
  data: {
    id: 2,
    name: "New Grading Structure",
    examWeight: 70,
    continuousAssessmentWeight: 30,
    updatedAt: new Date().toISOString(),
    classes: [],
    gradeBoundaries: [],
  },
  message: "Grading structure created successfully",
  statusCode: 201,
};
