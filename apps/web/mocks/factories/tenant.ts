import { SchoolType } from "@/types";
import { MOCK_TENANT_ID, MOCK_TENANT_NAME } from "../constants";
import { toISOString } from "@/lib/dates";

/**
 * Factory function to create mock tenant/school data
 */
export function createTenant(overrides?: Partial<SchoolType>): SchoolType {
  return {
    id: MOCK_TENANT_ID,
    onboardingStatus: "COMPLETE",
    name: MOCK_TENANT_NAME,
    registrationNo: "REG001",
    contactEmail: "contact@demoschool.com",
    contactPhone: "+2348000000001",
    establishedDate: toISOString(new Date("2000-01-01")) as any,
    logoUrl: "",
    address: "123 School Street",
    stateId: 1,
    lgaId: 1,
    zipCode: 100001,
    countryId: 1,
    postalCode: "100001",
    ...overrides,
  };
}
