import { GetRequestReturnType, PostRequestReturnType } from "@/config/base-query";
import { RoleType } from "@/types";
import { RolesAndPermissionsTemplateOptions } from "@/app/@protected/(staff-portal)/roles-and-permissions/_types/roles-and-permissions-form-types";
import { mockRoleList } from "@/mocks/data";
import { buildGetResponse, buildPostResponse } from "@/mocks/responses";
import { createRole } from "@/mocks/factories";
import { MOCK_ROLES } from "@/mocks/constants";

/**
 * Mock responses for role API endpoints
 * All responses match backend schema structures
 */

/**
 * Mock response for GET role/list
 * Returns array of roles
 */
export const mockGetRoleListResponse: GetRequestReturnType<RoleType[]> = buildGetResponse(
  mockRoleList
);

/**
 * Mock response for GET role/template
 * Returns template options for role creation
 */
export const mockGetRoleTemplateResponse: GetRequestReturnType<RolesAndPermissionsTemplateOptions> = buildGetResponse({
  staffOptions: [],
  permissionsOptions: [
    { id: 1, name: "STAFF.READ", tenantId: 1 },
    { id: 2, name: "STAFF.CREATE", tenantId: 1 },
    { id: 3, name: "STAFF.UPDATE", tenantId: 1 },
    { id: 4, name: "STUDENT.READ", tenantId: 1 },
    { id: 5, name: "STUDENT.CREATE", tenantId: 1 },
  ],
  scopeOptions: [],
});

/**
 * Mock response for POST role/create
 * Returns created role
 */
export const mockRoleCreateResponse: PostRequestReturnType<RoleType> = buildPostResponse(
  createRole(4, "New Role", false, "New role description"),
  "Role created successfully",
  201
);

/**
 * Mock response for POST role/update/:id
 * Returns updated role
 */
export const mockRoleUpdateResponse: PostRequestReturnType<RoleType> = buildPostResponse(
  {
    ...mockRoleList[0],
    name: "Administrator Updated",
  },
  "Role updated successfully",
  200
);
