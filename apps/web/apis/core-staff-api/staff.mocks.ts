import { GetRequestReturnType, PostRequestReturnType } from "@/config/base-query";
import { StaffType } from "@/types";
import { StaffTemplateOptions } from "@/app/@protected/(staff-portal)/staff/create/_types/staff-create-form-types";

/**
 * Mock responses for staff API endpoints
 * All responses match backend schema structures
 */

const todayISO = new Date().toISOString().split("T")[0];

// Mock user data for staff
const createMockUser = (id: number, firstName: string, lastName: string, email: string) => ({
  id,
  firstName,
  lastName,
  gender: "Male" as const,
  dateOfBirth: "1990-01-15",
  phoneNumber: `+234${800000000 + id}`,
  religion: "Christian",
  bloodGroup: "O+",
  email,
  password: "",
  hasVerified: true,
  isFirstTimeLogin: false,
  lastLoginDate: new Date().toISOString(),
  userType: "STAFF" as const,
  tenantId: 1,
  tenant: {} as StaffType["tenant"],
  student: null,
  staff: null,
  createdAt: new Date().toISOString(),
  residentialAddress: null,
  residentialLgaId: null,
  residentialStateId: null,
  residentialCountryId: null,
  residentialZipCode: null,
});

// Mock role data
const mockRole = {
  id: 1,
  name: "Teacher",
  isAdmin: false,
  description: "Teaching staff role",
  scope: null,
  permissions: [] as StaffType["role"] extends { permissions: infer P } ? P : never,
  staff: [] as StaffType[],
  tenantId: 1,
  tenant: {} as StaffType["tenant"],
};

// Helper to create mock staff
const createMockStaff = (id: number, firstName: string, lastName: string, email: string, jobTitle: string): StaffType => {
  const user = createMockUser(id, firstName, lastName, email);
  return {
    id,
    jobTitle,
    userId: id,
    user: user as StaffType["user"],
    roleId: 1,
    role: mockRole,
    nin: `NIN${id.toString().padStart(10, "0")}`,
    tin: null,
    cvUrl: null,
    employmentType: "Fulltime",
    highestLevelEdu: "Masters",
    group: [],
    classDivisions: [],
    subjects: [],
    tenantId: 1,
    tenant: {} as StaffType["tenant"],
    startDate: new Date().toISOString(),
  };
};

/**
 * Mock response for GET staff/list
 * Returns array of staff members
 */
export const mockGetStaffListResponse: GetRequestReturnType<StaffType[]> = {
  data: [
    createMockStaff(1, "John", "Doe", "john.doe@example.com", "Mathematics Teacher"),
    createMockStaff(2, "Jane", "Smith", "jane.smith@example.com", "English Teacher"),
    createMockStaff(3, "Michael", "Johnson", "michael.johnson@example.com", "Physics Teacher"),
    createMockStaff(4, "Sarah", "Williams", "sarah.williams@example.com", "Chemistry Teacher"),
    createMockStaff(5, "David", "Brown", "david.brown@example.com", "Biology Teacher"),
  ],
  message: "Resource fetched successfully",
  statusCode: 200,
};

/**
 * Mock response for GET staff/info/:staffId
 * Returns single staff member details
 */
export const mockGetSingleStaffResponse: GetRequestReturnType<StaffType> = {
  data: createMockStaff(1, "John", "Doe", "john.doe@example.com", "Mathematics Teacher"),
  message: "Resource fetched successfully",
  statusCode: 200,
};

/**
 * Mock response for GET staff/template
 * Returns template options for staff creation form
 */
export const mockGetStaffTemplateResponse: GetRequestReturnType<StaffTemplateOptions> = {
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
    subjectOptions: [
      { id: 1, name: "Mathematics" },
      { id: 2, name: "English" },
      { id: 3, name: "Physics" },
      { id: 4, name: "Chemistry" },
      { id: 5, name: "Biology" },
    ],
    classDivisionOptions: [
      { id: 1, name: "SS 1 A" },
      { id: 2, name: "SS 1 B" },
      { id: 3, name: "SS 2 A" },
      { id: 4, name: "SS 2 B" },
    ],
    roleOptions: [
      { id: 1, name: "Teacher" },
      { id: 2, name: "Administrator" },
      { id: 3, name: "Principal" },
    ],
  },
  message: "Resource fetched successfully",
  statusCode: 200,
};

/**
 * Mock response for POST staff/create
 * Returns created staff member
 */
export const mockStaffCreateResponse: PostRequestReturnType<StaffType> = {
  data: createMockStaff(6, "New", "Staff", "new.staff@example.com", "New Teacher"),
  message: "Staff created successfully",
  statusCode: 201,
};

/**
 * Mock response for POST staff/update/:staffId
 * Returns updated staff member
 */
export const mockStaffUpdateResponse: PostRequestReturnType<StaffType> = {
  data: createMockStaff(1, "John", "Doe Updated", "john.doe@example.com", "Senior Mathematics Teacher"),
  message: "Staff updated successfully",
  statusCode: 200,
};

/**
 * Mock response for POST staff/bulk/create
 * Returns null (bulk operations typically return success message only)
 */
export const mockStaffBulkCreateResponse: PostRequestReturnType<null> = {
  data: null,
  message: "Staff members created successfully",
  statusCode: 201,
};
