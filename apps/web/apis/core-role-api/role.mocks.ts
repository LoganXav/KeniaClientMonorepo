import { GetRequestReturnType, PostRequestReturnType } from "@/config/base-query";
import { RoleType } from "@/types";
import { RolesAndPermissionsTemplateOptions } from "@/app/@protected/(staff-portal)/roles-and-permissions/_types/roles-and-permissions-form-types";

/**
 * Mock responses for role API endpoints
 * All responses match backend schema structures
 */

/**
 * Mock response for GET role/list
 * Returns array of roles
 */
export const mockGetRoleListResponse: GetRequestReturnType<RoleType[]> = {
  data: [
    {
      id: 1,
      name: "Administrator",
      isAdmin: true,
      description: "Full system access",
      scope: null,
      permissions: [],
      staff: [],
      tenantId: 1,
      tenant: {} as RoleType["tenant"],
    },
    {
      id: 2,
      name: "Teacher",
      isAdmin: false,
      description: "Teaching staff role",
      scope: null,
      permissions: [],
      staff: [],
      tenantId: 1,
      tenant: {} as RoleType["tenant"],
    },
    {
      id: 3,
      name: "Principal",
      isAdmin: false,
      description: "School principal role",
      scope: null,
      permissions: [],
      staff: [],
      tenantId: 1,
      tenant: {} as RoleType["tenant"],
    },
  ],
  message: "Resource fetched successfully",
  statusCode: 200,
};

/**
 * Mock response for GET role/template
 * Returns template options for role creation
 */
export const mockGetRoleTemplateResponse: GetRequestReturnType<RolesAndPermissionsTemplateOptions> = {
  data: {
    staffOptions: [],
    permissionsOptions: [
      { id: 1, name: "STAFF.READ", tenantId: 1 },
      { id: 2, name: "STAFF.CREATE", tenantId: 1 },
      { id: 3, name: "STAFF.UPDATE", tenantId: 1 },
      { id: 4, name: "STUDENT.READ", tenantId: 1 },
      { id: 5, name: "STUDENT.CREATE", tenantId: 1 },
    ],
    scopeOptions: [],
  },
  message: "Resource fetched successfully",
  statusCode: 200,
};

/**
 * Mock response for POST role/create
 * Returns created role
 */
export const mockRoleCreateResponse: PostRequestReturnType<RoleType> = {
  data: {
    id: 4,
    name: "New Role",
    isAdmin: false,
    description: "New role description",
    scope: null,
    permissions: [],
    staff: [],
    tenantId: 1,
    tenant: {} as RoleType["tenant"],
  },
  message: "Role created successfully",
  statusCode: 201,
};

/**
 * Mock response for POST role/update/:id
 * Returns updated role
 */
export const mockRoleUpdateResponse: PostRequestReturnType<RoleType> = {
  data: {
    id: 1,
    name: "Administrator Updated",
    isAdmin: true,
    description: "Full system access",
    scope: null,
    permissions: [],
    staff: [],
    tenantId: 1,
    tenant: {} as RoleType["tenant"],
  },
  message: "Role updated successfully",
  statusCode: 200,
};
