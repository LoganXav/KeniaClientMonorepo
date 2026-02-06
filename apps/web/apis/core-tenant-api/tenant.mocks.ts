// @ts-nocheck
import { GetRequestReturnType, PostRequestReturnType } from "@/config/base-query";
import { SchoolType } from "@/types";
import { SchoolProfileFormTemplateType } from "@/app/@protected/(staff-portal)/school/profile/_types/school-profile-form-types";
import { toISOString } from "@/lib/dates";
import { mockTenant } from "@/mocks/data";
import { buildGetResponse, buildPostResponse } from "@/mocks/responses";

/**
 * Mock responses for tenant API endpoints
 * All responses match backend schema structures
 */

/**
 * Mock response for GET tenant
 * Returns tenant/school profile
 */
export const mockGetTenantResponse: GetRequestReturnType<SchoolType> = buildGetResponse(
  mockTenant
);

/**
 * Mock response for GET tenant/template
 * Returns template options for school profile form
 */
export const mockGetSchoolProfileTemplateResponse: GetRequestReturnType<SchoolProfileFormTemplateType> = buildGetResponse({
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
});

/**
 * Mock response for POST tenant/update
 * Returns null (update operations typically return success message only)
 */
export const mockUpdateTenantProfileResponse: PostRequestReturnType<null> = buildPostResponse(
  null,
  "Tenant profile updated successfully",
  200
);
