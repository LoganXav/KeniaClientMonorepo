import { GetRequestReturnType, PostRequestReturnType } from "@/config/base-query";
import { StaffType } from "@/types";
import { StaffTemplateOptions } from "@/app/@protected/(staff-portal)/staff/create/_types/staff-create-form-types";
import { mockStaffList, mockRoleList } from "@/mocks/data";
import { mockClassDivisionList } from "@/mocks/data";
import { mockSubjectList } from "@/mocks/data";
import { buildGetResponse, buildPostResponse } from "@/mocks/responses";
import { MOCK_CLASSES, MOCK_SUBJECTS } from "@/mocks/constants";

/**
 * Mock responses for staff API endpoints
 * All responses match backend schema structures
 */

/**
 * Mock response for GET staff/list
 * Returns array of staff members
 */
export const mockGetStaffListResponse: GetRequestReturnType<StaffType[]> = buildGetResponse(
  mockStaffList
);

/**
 * Mock response for GET staff/info/:staffId
 * Returns single staff member details
 */
export const mockGetSingleStaffResponse: GetRequestReturnType<StaffType> = buildGetResponse(
  mockStaffList[0]
);

/**
 * Mock response for GET staff/template
 * Returns template options for staff creation form
 */
export const mockGetStaffTemplateResponse: GetRequestReturnType<StaffTemplateOptions> = buildGetResponse({
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
  subjectOptions: MOCK_SUBJECTS.map((s) => ({ id: s.id, name: s.name })),
  classDivisionOptions: mockClassDivisionList.map((cd) => ({
    id: cd.id,
    name: `${cd.class.name} ${cd.name}`,
  })),
  roleOptions: mockRoleList.map((r) => ({ id: r.id, name: r.name })),
});

/**
 * Mock response for POST staff/create
 * Returns created staff member
 */
export const mockStaffCreateResponse: PostRequestReturnType<StaffType> = buildPostResponse(
  {
    ...mockStaffList[0],
    id: 6,
    jobTitle: "New Teacher",
    user: {
      ...mockStaffList[0].user,
      id: 6,
      firstName: "New",
      lastName: "Staff",
      email: "new.staff@example.com",
    },
  },
  "Staff created successfully",
  201
);

/**
 * Mock response for POST staff/update/:staffId
 * Returns updated staff member
 */
export const mockStaffUpdateResponse: PostRequestReturnType<StaffType> = buildPostResponse(
  {
    ...mockStaffList[0],
    jobTitle: "Senior Mathematics Teacher",
    user: {
      ...mockStaffList[0].user,
      lastName: "Doe Updated",
    },
  },
  "Staff updated successfully",
  200
);

/**
 * Mock response for POST staff/bulk/create
 * Returns null (bulk operations typically return success message only)
 */
export const mockStaffBulkCreateResponse: PostRequestReturnType<null> = buildPostResponse(
  null,
  "Staff members created successfully",
  201
);
