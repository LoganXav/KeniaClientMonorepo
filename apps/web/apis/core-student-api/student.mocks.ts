import { GetRequestReturnType, PostRequestReturnType } from "@/config/base-query";
import { StudentType, SubjectsRegisteredType } from "@/types";
import { StudentTemplateOptions } from "@/app/@protected/(staff-portal)/student/create/_types/student-create-form-types";
import { mockStudentList, mockClassList, mockClassDivisionList, mockSubjectList } from "@/mocks/data";
import { mockCalendar } from "@/mocks/data";
import { buildGetResponse, buildPostResponse } from "@/mocks/responses";
import { createStudent } from "@/mocks/factories";
import { MOCK_CLASSES, MOCK_STUDENTS } from "@/mocks/constants";

/**
 * Mock responses for student API endpoints
 * All responses match backend schema structures
 */

// Helper to create mock student (exported for use in other mocks)
export const createMockStudent = (
  id: number,
  admissionNo: string,
  firstName: string,
  lastName: string,
  email: string,
  classId: number = 1,
  classDivisionId: number = 1
): StudentType => {
  const classData = mockClassList.find((c) => c.id === classId);
  return createStudent(id, admissionNo, firstName, lastName, email, classId, classDivisionId, classData);
};

/**
 * Mock response for GET student/list
 * Returns array of students
 */
export const mockGetStudentListResponse: GetRequestReturnType<StudentType[]> = buildGetResponse(
  mockStudentList
);

/**
 * Mock response for GET student/info/:studentId
 * Returns single student details
 */
export const mockGetSingleStudentResponse: GetRequestReturnType<StudentType> = buildGetResponse(
  mockStudentList[0]
);

/**
 * Mock response for GET student/template
 * Returns template options for student creation form
 * Filters options based on classId, classDivisionId, calendarId, and studentId
 */
export function mockGetStudentTemplateResponse(params?: {
  tenantId?: number;
  codeValue?: number;
  classId?: number;
  classDivisionId?: number;
  calendarId?: number;
  studentId?: number;
}): GetRequestReturnType<StudentTemplateOptions> {
  // Filter class divisions by classId if provided
  let classDivisionOptions = mockClassDivisionList;
  if (params?.classId) {
    classDivisionOptions = mockClassDivisionList.filter((cd) => cd.classId === params.classId);
  }
  
  // Filter subjects by classId if provided
  let subjectOptions = mockSubjectList;
  if (params?.classId) {
    subjectOptions = mockSubjectList.filter((s) => s.classId === params.classId);
  }
  
  // Filter students by classId and classDivisionId if provided
  let studentOptions = mockStudentList;
  if (params?.classId) {
    studentOptions = studentOptions.filter((s) => s.class.id === params.classId);
  }
  if (params?.classDivisionId) {
    studentOptions = studentOptions.filter((s) => s.classDivisionId === params.classDivisionId);
  }
  
  // Get subject registrations for specific student and calendar if provided
  let studentSubjectRegistrationOptions: SubjectsRegisteredType[] = [];
  if (params?.studentId && params?.calendarId) {
    const student = mockStudentList.find((s) => s.id === params.studentId);
    if (student) {
      studentSubjectRegistrationOptions = student.subjectsRegistered.filter(
        (reg) => reg.subject?.id !== undefined // Filter by calendarId if needed
      );
    }
  }
  
  return buildGetResponse({
    educationLevelOptions: ["Primary", "Secondary", "Bachelor's", "Master's", "PhD"],
    countryIdOptions: [
      { id: 1, codeValue: 1, name: "Nigeria", acronym: "NG" },
      { id: 2, codeValue: 2, name: "Ghana", acronym: "GH" },
    ],
    employmentTypeOptions: ["Fulltime", "Parttime", "Contract", "Internship"],
    lgaIdOptions: [
      { codeValue: "01", id: 1, name: "Ikeja" },
      { codeValue: "02", id: 2, name: "Lagos Island" },
      { codeValue: "03", id: 3, name: "Surulere" },
    ],
    stateIdOptions: [
      { codeValue: "01", id: 1, name: "Lagos" },
      { codeValue: "02", id: 2, name: "Abuja" },
      { codeValue: "03", id: 3, name: "Kano" },
    ],
    classOptions: mockClassList,
    classDivisionOptions,
    religionOptions: ["Christian", "Muslim", "Traditional", "Other"],
    genderOptions: ["Male", "Female"],
    bloodGroupOptions: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    subjectOptions,
    calendarOptions: [mockCalendar],
    studentOptions,
    studentSubjectRegistrationOptions,
  });
}

/**
 * Mock response for POST student/create
 * Returns created student
 */
export const mockStudentCreateResponse: PostRequestReturnType<StudentType> = buildPostResponse(
  createMockStudent(11, "ADM011", "New", "Student", "new.student@example.com"),
  "Student created successfully",
  201
);

/**
 * Mock response for POST student/update/:studentId
 * Returns updated student
 */
export const mockStudentUpdateResponse: PostRequestReturnType<StudentType> = buildPostResponse(
  {
    ...mockStudentList[0],
    user: {
      ...mockStudentList[0].user,
      lastName: "Johnson Updated",
    },
  },
  "Student updated successfully",
  200
);

/**
 * Mock response for POST student/bulk/create
 * Returns null (bulk operations typically return success message only)
 */
export const mockStudentBulkCreateResponse: PostRequestReturnType<null> = buildPostResponse(
  null,
  "Students created successfully",
  201
);

/**
 * Mock response for POST student/subjectregistration/create
 * Returns student with updated subject registrations
 */
export const mockStudentSubjectRegistrationCreateResponse: PostRequestReturnType<StudentType> = buildPostResponse(
  {
    ...mockStudentList[0],
    subjectsRegistered: mockStudentList[0].subjectsRegistered || [],
  },
  "Subject registration created successfully",
  201
);

/**
 * Mock response for GET student/subjectregistration/list
 * Returns array of subject registrations filtered by subjectId, classId, and calendarId
 */
export function mockGetStudentSubjectRegistrationListResponse(params?: {
  tenantId?: number;
  classId?: number;
  subjectId?: number;
  calendarId?: number;
}): GetRequestReturnType<SubjectsRegisteredType[]> {
  let registrations = mockStudentList.flatMap((student) => student.subjectsRegistered || []);
  
  // Filter by subjectId if provided
  if (params?.subjectId) {
    registrations = registrations.filter((reg) => reg.subjectId === params.subjectId);
  }
  
  // Filter by classId if provided
  if (params?.classId) {
    registrations = registrations.filter((reg) => reg.student.class.id === params.classId);
  }
  
  // Filter by calendarId if provided (all registrations use MOCK_CALENDAR.id currently)
  // In a real scenario, this would filter by calendarId
  
  return buildGetResponse(registrations);
}
