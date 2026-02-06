import { RoleType, PermissionType } from "@/types";
import { MOCK_TENANT_ID } from "../constants";

/**
 * Factory function to create mock role data
 */
export function createRole(
  id: number,
  name: string,
  isAdmin: boolean,
  description: string,
  permissions: PermissionType[] = []
): RoleType {
  return {
    id,
    name,
    isAdmin,
    description,
    scope: null,
    permissions,
    staff: [],
    tenantId: MOCK_TENANT_ID,
    tenant: {} as RoleType["tenant"],
  };
}
