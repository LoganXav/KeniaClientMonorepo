import { GetRequestReturnType, PostRequestReturnType } from "@/config/base-query";
import { StudentType, SubjectsRegisteredType } from "@/types";
import { StudentTemplateOptions } from "@/app/@protected/(staff-portal)/student/create/_types/student-create-form-types";

/**
 * Mock responses for student API endpoints
 * All responses match backend schema structures
 */

const todayISO = new Date().toISOString().split("T")[0];

// Mock user data for students
const createMockStudentUser = (id: number, firstName: string, lastName: string, email: string) => ({
  id,
  firstName,
  lastName,
  gender: "Male" as const,
  dateOfBirth: "2005-05-15",
  phoneNumber: `+234${800000000 + id}`,
  religion: "Christian",
  bloodGroup: "O+",
  email,
  password: "",
  hasVerified: true,
  isFirstTimeLogin: false,
  lastLoginDate: new Date().toISOString(),
  userType: "STUDENT" as const,
  tenantId: 1,
  tenant: {} as StudentType["tenant"],
  student: null,
  staff: null,
  createdAt: new Date().toISOString(),
  residentialAddress: null,
  residentialLgaId: null,
  residentialStateId: null,
  residentialCountryId: null,
  residentialZipCode: null,
});

// Mock class data
const mockClass = {
  id: 1,
  name: "SS 1",
  classTeacherId: 1,
  classTeacher: {} as StudentType["class"]["classTeacher"],
  students: [] as StudentType[],
  subjects: [],
  tenantId: 1,
  tenant: {} as StudentType["class"]["tenant"],
};

// Helper to create mock student
export const createMockStudent = (
  id: number,
  admissionNo: string,
  firstName: string,
  lastName: string,
  email: string,
  classId: number = 1,
  classDivisionId: number = 1
): StudentType => {
  const user = createMockStudentUser(id, firstName, lastName, email);
  return {
    admissionNo,
    id,
    studentId: `STU${id.toString().padStart(6, "0")}`,
    userId: id,
    user: user as StudentType["user"],
    enrollmentDate: new Date().toISOString(),
    class: {
      ...mockClass,
      id: classId,
      name: classId === 1 ? "SS 1" : classId === 2 ? "SS 2" : "SS 3",
    },
    guardians: [],
    tenantId: 1,
    tenant: {} as StudentType["tenant"],
    classDivisionId,
    subjectGrades: [],
    subjectsRegistered: [],
  };
};

/**
 * Mock response for GET student/list
 * Returns array of students
 */
export const mockGetStudentListResponse: GetRequestReturnType<StudentType[]> = {
  data: [
    createMockStudent(1, "ADM001", "Alice", "Johnson", "alice.johnson@example.com", 1, 1),
    createMockStudent(2, "ADM002", "Bob", "Williams", "bob.williams@example.com", 1, 1),
    createMockStudent(3, "ADM003", "Charlie", "Brown", "charlie.brown@example.com", 1, 2),
    createMockStudent(4, "ADM004", "Diana", "Davis", "diana.davis@example.com", 2, 1),
    createMockStudent(5, "ADM005", "Eve", "Miller", "eve.miller@example.com", 2, 2),
  ],
  message: "Resource fetched successfully",
  statusCode: 200,
};

/**
 * Mock response for GET student/info/:studentId
 * Returns single student details
 */
export const mockGetSingleStudentResponse: GetRequestReturnType<StudentType> = {
  data: createMockStudent(1, "ADM001", "Alice", "Johnson", "alice.johnson@example.com", 1, 1),
  message: "Resource fetched successfully",
  statusCode: 200,
};

/**
 * Mock response for GET student/template
 * Returns template options for student creation form
 */
export const mockGetStudentTemplateResponse: GetRequestReturnType<StudentTemplateOptions> = {
  data: {
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
    classOptions: [
      { id: 1, name: "SS 1", classTeacherId: 1, classTeacher: {} as any, students: [], subjects: [], tenantId: 1, tenant: {} as any },
      { id: 2, name: "SS 2", classTeacherId: 1, classTeacher: {} as any, students: [], subjects: [], tenantId: 1, tenant: {} as any },
      { id: 3, name: "SS 3", classTeacherId: 1, classTeacher: {} as any, students: [], subjects: [], tenantId: 1, tenant: {} as any },
    ],
    classDivisionOptions: [
      { id: 1, name: "A", classId: 1, classDivisionTeacherId: 1, class: {} as any, tenantId: 1, tenant: {} as any, students: [], classDivionTeacher: {} as any },
      { id: 2, name: "B", classId: 1, classDivisionTeacherId: 1, class: {} as any, tenantId: 1, tenant: {} as any, students: [], classDivionTeacher: {} as any },
      { id: 3, name: "A", classId: 2, classDivisionTeacherId: 1, class: {} as any, tenantId: 1, tenant: {} as any, students: [], classDivionTeacher: {} as any },
    ],
    religionOptions: ["Christian", "Muslim", "Traditional", "Other"],
    genderOptions: ["Male", "Female"],
    bloodGroupOptions: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    subjectOptions: [
      { id: 1, name: "Mathematics", description: "", classId: 1, class: {} as any, staffs: [], subjectRegistration: [], gradingStructure: {} as any, tenantId: 1, tenant: {} as any },
      { id: 2, name: "English", description: "", classId: 1, class: {} as any, staffs: [], subjectRegistration: [], gradingStructure: {} as any, tenantId: 1, tenant: {} as any },
      { id: 3, name: "Physics", description: "", classId: 1, class: {} as any, staffs: [], subjectRegistration: [], gradingStructure: {} as any, tenantId: 1, tenant: {} as any },
    ],
    calendarOptions: [
      { id: 1, year: 2024, terms: [] },
      { id: 2, year: 2025, terms: [] },
    ],
    studentOptions: [
      createMockStudent(1, "ADM001", "Alice", "Johnson", "alice.johnson@example.com"),
      createMockStudent(2, "ADM002", "Bob", "Williams", "bob.williams@example.com"),
    ],
    studentSubjectRegistrationOptions: [] as SubjectsRegisteredType[],
  },
  message: "Resource fetched successfully",
  statusCode: 200,
};

/**
 * Mock response for POST student/create
 * Returns created student
 */
export const mockStudentCreateResponse: PostRequestReturnType<StudentType> = {
  data: createMockStudent(6, "ADM006", "New", "Student", "new.student@example.com"),
  message: "Student created successfully",
  statusCode: 201,
};

/**
 * Mock response for POST student/update/:studentId
 * Returns updated student
 */
export const mockStudentUpdateResponse: PostRequestReturnType<StudentType> = {
  data: createMockStudent(1, "ADM001", "Alice", "Johnson Updated", "alice.johnson@example.com"),
  message: "Student updated successfully",
  statusCode: 200,
};

/**
 * Mock response for POST student/bulk/create
 * Returns null (bulk operations typically return success message only)
 */
export const mockStudentBulkCreateResponse: PostRequestReturnType<null> = {
  data: null,
  message: "Students created successfully",
  statusCode: 201,
};

/**
 * Mock response for POST student/subjectregistration/create
 * Returns student with updated subject registrations
 */
export const mockStudentSubjectRegistrationCreateResponse: PostRequestReturnType<StudentType> = {
  data: {
    ...createMockStudent(1, "ADM001", "Alice", "Johnson", "alice.johnson@example.com"),
    subjectsRegistered: [
      {
        id: 1,
        name: "Mathematics",
        description: "",
        subjectId: 1,
        subject: {} as any,
        student: {} as any,
      },
      {
        id: 2,
        name: "English",
        description: "",
        subjectId: 2,
        subject: {} as any,
        student: {} as any,
      },
    ] as SubjectsRegisteredType[],
  },
  message: "Subject registration created successfully",
  statusCode: 201,
};

/**
 * Mock response for GET student/subjectregistration/list
 * Returns array of subject registrations
 */
export const mockGetStudentSubjectRegistrationListResponse: GetRequestReturnType<SubjectsRegisteredType[]> = {
  data: [
    {
      id: 1,
      name: "Mathematics",
      description: "",
      subjectId: 1,
      subject: {} as any,
      student: createMockStudent(1, "ADM001", "Alice", "Johnson", "alice.johnson@example.com") as any,
    },
    {
      id: 2,
      name: "English",
      description: "",
      subjectId: 2,
      subject: {} as any,
      student: createMockStudent(1, "ADM001", "Alice", "Johnson", "alice.johnson@example.com") as any,
    },
    {
      id: 3,
      name: "Physics",
      description: "",
      subjectId: 3,
      subject: {} as any,
      student: createMockStudent(2, "ADM002", "Bob", "Williams", "bob.williams@example.com") as any,
    },
  ],
  message: "Resource fetched successfully",
  statusCode: 200,
};
