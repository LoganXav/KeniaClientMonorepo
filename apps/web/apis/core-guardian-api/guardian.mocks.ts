// @ts-nocheck
import { GetRequestReturnType } from "@/config/base-query";
import { buildGetResponse } from "@/mocks/responses";
import { MOCK_STUDENTS } from "@/mocks/constants";

/**
 * Mock responses for guardian API endpoints
 * All responses match backend schema structures
 */

/**
 * Mock response for GET guardian/list
 * Returns array of guardians
 * Guardians are parents/guardians of students - using student last names for consistency
 */
export const mockGetGuardianListResponse: GetRequestReturnType<
  Array<{ id: string; firstName: string; lastName: string; email: string; phoneNumber: string }>
> = buildGetResponse(
  MOCK_STUDENTS.slice(0, 5).map((student, idx) => ({
    id: String(idx + 1),
    firstName: ["John", "Mary", "Robert", "Sarah", "Michael"][idx],
    lastName: student.lastName,
    email: `${["john", "mary", "robert", "sarah", "michael"][idx]}.${student.lastName.toLowerCase()}@example.com`,
    phoneNumber: `+234800000000${idx + 1}`,
  }))
);
