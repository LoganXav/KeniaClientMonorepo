import { createRole } from "../factories/role";
import { RoleType, PermissionType } from "@/types";
import { MOCK_ROLES } from "../constants";

/**
 * Mock permissions data
 */
const mockPermissions: PermissionType[] = [
  { id: 1, name: "STAFF_CREATE", tenantId: 1 },
  { id: 2, name: "STAFF_READ", tenantId: 1 },
  { id: 3, name: "STUDENT_READ", tenantId: 1 },
  { id: 4, name: "STUDENT_CREATE", tenantId: 1 },
  { id: 5, name: "CLASS_READ", tenantId: 1 },
  { id: 6, name: "CLASS_CREATE", tenantId: 1 },
];

/**
 * Mock roles list
 */
export const mockRoleList: RoleType[] = [
  createRole(MOCK_ROLES[0].id, MOCK_ROLES[0].name, MOCK_ROLES[0].isAdmin, MOCK_ROLES[0].description, mockPermissions),
  createRole(MOCK_ROLES[1].id, MOCK_ROLES[1].name, MOCK_ROLES[1].isAdmin, MOCK_ROLES[1].description, mockPermissions.slice(2, 4)),
  createRole(MOCK_ROLES[2].id, MOCK_ROLES[2].name, MOCK_ROLES[2].isAdmin, MOCK_ROLES[2].description, mockPermissions.slice(0, 3)),
];
