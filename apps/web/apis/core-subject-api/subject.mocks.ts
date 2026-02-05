import { GetRequestReturnType, PostRequestReturnType } from "@/config/base-query";
import { SubjectType } from "@/types";
import { SubjectTemplateOptions } from "@/app/@protected/(staff-portal)/school/subject/list/_types/school-subject-create-types";

/**
 * Mock responses for subject API endpoints
 * All responses match backend schema structures
 */

/**
 * Mock response for GET subject/list
 * Returns array of subjects
 */
export const mockGetSubjectListResponse: GetRequestReturnType<SubjectType[]> = {
  data: [
    {
      id: 1,
      name: "Mathematics",
      description: "Mathematics subject",
      classId: 1,
      class: { id: 1, name: "SS 1", classTeacherId: 1, classTeacher: {} as any, students: [], subjects: [], tenantId: 1, tenant: {} as any },
      staffs: [],
      subjectRegistration: [],
      gradingStructure: {} as any,
      tenantId: 1,
      tenant: {} as SubjectType["tenant"],
    },
    {
      id: 2,
      name: "English",
      description: "English Language",
      classId: 1,
      class: { id: 1, name: "SS 1", classTeacherId: 1, classTeacher: {} as any, students: [], subjects: [], tenantId: 1, tenant: {} as any },
      staffs: [],
      subjectRegistration: [],
      gradingStructure: {} as any,
      tenantId: 1,
      tenant: {} as SubjectType["tenant"],
    },
    {
      id: 3,
      name: "Physics",
      description: "Physics subject",
      classId: 2,
      class: { id: 2, name: "SS 2", classTeacherId: 1, classTeacher: {} as any, students: [], subjects: [], tenantId: 1, tenant: {} as any },
      staffs: [],
      subjectRegistration: [],
      gradingStructure: {} as any,
      tenantId: 1,
      tenant: {} as SubjectType["tenant"],
    },
    {
      id: 4,
      name: "Chemistry",
      description: "Chemistry subject",
      classId: 2,
      class: { id: 2, name: "SS 2", classTeacherId: 1, classTeacher: {} as any, students: [], subjects: [], tenantId: 1, tenant: {} as any },
      staffs: [],
      subjectRegistration: [],
      gradingStructure: {} as any,
      tenantId: 1,
      tenant: {} as SubjectType["tenant"],
    },
    {
      id: 5,
      name: "Biology",
      description: "Biology subject",
      classId: 2,
      class: { id: 2, name: "SS 2", classTeacherId: 1, classTeacher: {} as any, students: [], subjects: [], tenantId: 1, tenant: {} as any },
      staffs: [],
      subjectRegistration: [],
      gradingStructure: {} as any,
      tenantId: 1,
      tenant: {} as SubjectType["tenant"],
    },
  ],
  message: "Resource fetched successfully",
  statusCode: 200,
};

/**
 * Mock response for GET subject/template
 * Returns template options for subject creation form
 */
export const mockGetSubjectTemplateResponse: GetRequestReturnType<SubjectTemplateOptions> = {
  data: {
    staffOptions: [
      {
        id: 1,
        jobTitle: "Mathematics Teacher",
        userId: 1,
        user: {} as any,
        roleId: 1,
        role: null,
        nin: null,
        tin: null,
        cvUrl: null,
        employmentType: "Fulltime",
        highestLevelEdu: "Masters",
        group: [],
        classDivisions: [],
        subjects: [],
        tenantId: 1,
        tenant: {} as any,
        startDate: new Date().toISOString(),
      },
      {
        id: 2,
        jobTitle: "English Teacher",
        userId: 2,
        user: {} as any,
        roleId: 1,
        role: null,
        nin: null,
        tin: null,
        cvUrl: null,
        employmentType: "Fulltime",
        highestLevelEdu: "Bachelors",
        group: [],
        classDivisions: [],
        subjects: [],
        tenantId: 1,
        tenant: {} as any,
        startDate: new Date().toISOString(),
      },
    ],
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
 * Mock response for POST subject/create
 * Returns created subject
 */
export const mockSubjectCreateResponse: PostRequestReturnType<SubjectType> = {
  data: {
    id: 6,
    name: "New Subject",
    description: "New subject description",
    classId: 1,
    class: { id: 1, name: "SS 1", classTeacherId: 1, classTeacher: {} as any, students: [], subjects: [], tenantId: 1, tenant: {} as any },
    staffs: [],
    subjectRegistration: [],
    gradingStructure: {} as any,
    tenantId: 1,
    tenant: {} as SubjectType["tenant"],
  },
  message: "Subject created successfully",
  statusCode: 201,
};

/**
 * Mock response for POST subject/update/:subjectId
 * Returns updated subject
 */
export const mockSubjectUpdateResponse: PostRequestReturnType<SubjectType> = {
  data: {
    id: 1,
    name: "Mathematics Updated",
    description: "Updated mathematics subject",
    classId: 1,
    class: { id: 1, name: "SS 1", classTeacherId: 1, classTeacher: {} as any, students: [], subjects: [], tenantId: 1, tenant: {} as any },
    staffs: [],
    subjectRegistration: [],
    gradingStructure: {} as any,
    tenantId: 1,
    tenant: {} as SubjectType["tenant"],
  },
  message: "Subject updated successfully",
  statusCode: 200,
};

/**
 * Mock response for GET subject/info/:subjectId
 * Returns single subject details
 */
export const mockGetSingleSubjectResponse: GetRequestReturnType<SubjectType> = {
  data: {
    id: 1,
    name: "Mathematics",
    description: "Mathematics subject",
    classId: 1,
    class: { id: 1, name: "SS 1", classTeacherId: 1, classTeacher: {} as any, students: [], subjects: [], tenantId: 1, tenant: {} as any },
    staffs: [],
    subjectRegistration: [],
    gradingStructure: {} as any,
    tenantId: 1,
    tenant: {} as SubjectType["tenant"],
  },
  message: "Resource fetched successfully",
  statusCode: 200,
};
