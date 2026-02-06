import { UserWithRelationsType } from "@/types";
import { MOCK_TENANT_ID, getPhoneNumber } from "../constants";
import { SchoolType } from "@/types";

/**
 * Factory function to create mock user data
 * Used by both staff and student factories
 */
export function createUser(
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  userType: "STAFF" | "STUDENT",
  overrides?: Partial<UserWithRelationsType>
): UserWithRelationsType {
  const baseDateOfBirth = userType === "STAFF" ? "1990-01-15" : "2005-05-15";
  
  return {
    id,
    firstName,
    lastName,
    gender: "Male",
    dateOfBirth: baseDateOfBirth,
    phoneNumber: getPhoneNumber(id),
    religion: "Christian",
    bloodGroup: "O+",
    email,
    password: "",
    hasVerified: true,
    isFirstTimeLogin: false,
    lastLoginDate: new Date().toISOString(),
    userType,
    tenantId: MOCK_TENANT_ID,
    tenant: {} as SchoolType,
    student: null,
    staff: null,
    createdAt: new Date().toISOString(),
    residentialAddress: null,
    residentialLgaId: null,
    residentialStateId: null,
    residentialCountryId: null,
    residentialZipCode: null,
    ...overrides,
  };
}
