import { GetRequestReturnType } from "@/config/base-query";
import { UserWithRelationsType } from "@/types";

/**
 * Mock response for GET user/me
 * Matches backend: UserReadService returns user (without password) in result data
 */

export const mockGetAuthUserResponse: GetRequestReturnType<UserWithRelationsType> = {
  data: {
    id: 1,
    tenantId: 1,
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "+1234567890",
    email: "admin@example.com",
    password: "", // Backend strips password; mock keeps minimal for type
    hasVerified: true,
    isFirstTimeLogin: false,
    lastLoginDate: new Date().toISOString(),
    userType: "STAFF",
    tenant: {} as UserWithRelationsType["tenant"],
    createdAt: new Date().toISOString(),
    staff: {
      id: 1,
      jobTitle: "Administrator",
      userId: 1,
      user: {} as UserWithRelationsType,
      roleId: 1,
      role: {
        id: 1,
        name: "Administrator",
        isAdmin: true,
        description: "Full system access",
        scope: null,
        permissions: [] as UserWithRelationsType["staff"] extends { role: infer R } ? (R extends { permissions: infer P } ? P : never) : never,
        staff: [],
        tenantId: 1,
        tenant: {} as UserWithRelationsType["tenant"],
      },
      nin: null,
      tin: null,
      cvUrl: null,
      employmentType: "Full-time",
      highestLevelEdu: "Masters",
      group: [],
      classDivisions: [],
      subjects: [],
      tenantId: 1,
      tenant: {} as import("@/types").StaffType["tenant"],
      startDate: new Date().toISOString(),
    },
  },
  message: "Resource fetched successfully",
  statusCode: 200,
};
