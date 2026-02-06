// @ts-nocheck
import { GetRequestReturnType, PostRequestReturnType } from "@/config/base-query";
import { SubjectType } from "@/types";
import { SubjectTemplateOptions } from "@/app/@protected/(staff-portal)/school/subject/list/_types/school-subject-create-types";
import { mockSubjectList, mockClassList, mockStaffList, mockStudentList, mockClassDivisionList } from "@/mocks/data";
import { buildGetResponse, buildPostResponse } from "@/mocks/responses";
import { createSubject } from "@/mocks/factories";

/**
 * Mock responses for subject API endpoints
 * All responses match backend schema structures
 */

/**
 * Mock response for GET subject/list
 * Returns array of subjects
 */
export const mockGetSubjectListResponse: GetRequestReturnType<SubjectType[]> = buildGetResponse(
  mockSubjectList
);

/**
 * Mock response for GET subject/template
 * Returns template options for subject creation form
 */
export const mockGetSubjectTemplateResponse: GetRequestReturnType<SubjectTemplateOptions> = buildGetResponse({
  staffOptions: mockStaffList.slice(0, 2),
  classOptions: mockClassList.slice(0, 3),
});

/**
 * Mock response for POST subject/create
 * Returns created subject
 */
export const mockSubjectCreateResponse: PostRequestReturnType<SubjectType> = buildPostResponse(
  createSubject(7, "New Subject", "New subject description", 1, mockClassList[0]),
  "Subject created successfully",
  201
);

/**
 * Mock response for POST subject/update/:subjectId
 * Returns updated subject
 */
export const mockSubjectUpdateResponse: PostRequestReturnType<SubjectType> = (() => {
  const subject = mockSubjectList[0];
  if (!subject) {
    throw new Error("No subject found");
  }
  
  const updatedSubject: SubjectType = {
    id: subject.id,
    name: "Mathematics Updated",
    description: "Updated mathematics subject",
    classId: subject.classId,
    class: subject.class,
    staffs: subject.staffs,
    subjectRegistration: subject.subjectRegistration,
    gradingStructure: subject.gradingStructure,
    tenantId: subject.tenantId,
    tenant: subject.tenant,
  };
  
  return buildPostResponse(updatedSubject, "Subject updated successfully", 200);
})();

/**
 * Mock response for GET subject/info/:subjectId
 * Returns single subject details filtered by subjectId
 * Includes staffs, subjectRegistration, and gradingStructure
 */
export function mockGetSingleSubjectResponse(params?: {
  tenantId?: number;
  subjectId?: number;
}): GetRequestReturnType<SubjectType> {
  // Find subject by ID
  const foundSubject = mockSubjectList.find((s) => s.id === params?.subjectId);
  
  // If not found, use first subject as fallback
  const subject = foundSubject || mockSubjectList[0];
  
  if (!subject) {
    throw new Error("No subject found");
  }
  
  const subjectId = subject.id;
  
  // Get students registered for this subject
  const subjectRegistrations = mockStudentList
    .flatMap((student: any) => student.subjectsRegistered || [])
    .filter((reg: any) => reg.subjectId === subjectId);
  
  // Get staff assigned to this subject (for now, assign some staff based on subject)
  // In a real scenario, this would come from a subject-staff relationship
  const assignedStaff = mockStaffList.slice(0, 2); // Assign first 2 staff members
  
  // Build comprehensive subject object
  const comprehensiveSubject: SubjectType = {
    id: subject.id,
    name: subject.name,
    description: subject.description,
    classId: subject.classId,
    class: subject.class,
    staffs: assignedStaff,
    subjectRegistration: subjectRegistrations,
    gradingStructure: subject.gradingStructure || ({} as any),
    tenantId: subject.tenantId,
    tenant: subject.tenant,
  };
  
  return buildGetResponse(comprehensiveSubject);
}
