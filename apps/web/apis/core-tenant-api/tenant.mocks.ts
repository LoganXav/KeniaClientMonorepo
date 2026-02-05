import { GetRequestReturnType, PostRequestReturnType } from "@/config/base-query";
import { SchoolType } from "@/types";
import { SchoolProfileFormTemplateType } from "@/app/@protected/(staff-portal)/school/profile/_types/school-profile-form-types";
import { toISOString } from "@/lib/dates";

/**
 * Mock responses for tenant API endpoints
 * All responses match backend schema structures
 */

/**
 * Mock response for GET tenant
 * Returns tenant/school profile
 */
export const mockGetTenantResponse: GetRequestReturnType<SchoolType> = {
  data: {
    id: 1,
    onboardingStatus: "COMPLETE",
    name: "Demo School",
    registrationNo: "REG001",
    contactEmail: "contact@demoschool.com",
    contactPhone: "+2348000000001",
    establishedDate: toISOString(new Date("2000-01-01")) as any, // Backend returns ISO string in JSON responses
    logoUrl: "",
    address: "123 School Street",
    stateId: 1,
    lgaId: 1,
    zipCode: 100001,
    countryId: 1,
    postalCode: "100001",
  },
  message: "Resource fetched successfully",
  statusCode: 200,
};

/**
 * Mock response for GET tenant/template
 * Returns template options for school profile form
 */
export const mockGetSchoolProfileTemplateResponse: GetRequestReturnType<SchoolProfileFormTemplateType> = {
  data: {
    countryIdOptions: [
      { id: 1, codeValue: 1, name: "Nigeria", acronym: "NG" },
      { id: 2, codeValue: 2, name: "Ghana", acronym: "GH" },
    ],
    stateIdOptions: [
      { id: 1, codeValue: 1, name: "Lagos" },
      { id: 2, codeValue: 2, name: "Abuja" },
      { id: 3, codeValue: 3, name: "Kano" },
    ],
    lgaIdOptions: [
      { id: 1, codeValue: 1, name: "Ikeja" },
      { id: 2, codeValue: 2, name: "Lagos Island" },
      { id: 3, codeValue: 3, name: "Surulere" },
    ],
  },
  message: "Resource fetched successfully",
  statusCode: 200,
};

/**
 * Mock response for POST tenant/update
 * Returns null (update operations typically return success message only)
 */
export const mockUpdateTenantProfileResponse: PostRequestReturnType<null> = {
  data: null,
  message: "Tenant profile updated successfully",
  statusCode: 200,
};
