// @ts-nocheck
import { GetRequestReturnType, PostRequestReturnType } from "@/config/base-query";
import { RoleType } from "@/types";
import { RolesAndPermissionsTemplateOptions } from "@/app/@protected/(staff-portal)/roles-and-permissions/_types/roles-and-permissions-form-types";
import { mockRoleList, mockStaffList } from "@/mocks/data";
import { mockPermissions } from "@/mocks/data/roles";
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
  staffOptions: mockStaffList.map((staff) => ({
    id: staff.id,
    user: {
      firstName: staff.user.firstName,
      lastName: staff.user.lastName,
      email: staff.user.email,
    },
    jobTitle: staff.jobTitle,
  })),
  permissionsOptions: mockPermissions.map((perm) => ({
    id: perm.id,
    name: perm.name,
    tenantId: perm.tenantId,
  })),
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
    ...(mockRoleList[0] || {}),
    name: "Administrator Updated",
  } as RoleType,
  "Role updated successfully",
  200
);
