import { StaffType, UserWithRelationsType, RoleType } from "@/types";
import { MOCK_TENANT_ID, getNIN, getStartDate } from "../constants";
import { createUser } from "./user";

/**
 * Factory function to create mock staff data
 */
export function createStaff(
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  jobTitle: string,
  roleId: number,
  role?: RoleType,
  userOverrides?: Partial<UserWithRelationsType>
): StaffType {


  const user = createUser(id, firstName, lastName, email, "STAFF", userOverrides);
  
  return {
    id,
    jobTitle,
    userId: id,
    user: {...user, jobTitle} as StaffType["user"],
    roleId,
    role: role || ({} as RoleType),
    nin: getNIN(id),
    tin: null,
    cvUrl: null,
    employmentType: "Fulltime",
    highestLevelEdu: "Masters",
    group: [],
    classDivisions: [],
    subjects: [],
    tenantId: MOCK_TENANT_ID,
    tenant: {} as StaffType["tenant"],
    startDate: getStartDate(),
  };
}
