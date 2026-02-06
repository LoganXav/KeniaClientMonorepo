// @ts-nocheck
import { GetRequestReturnType } from "@/config/base-query";
import { UserWithRelationsType } from "@/types";
import { mockStaffList } from "@/mocks/data";
import { buildGetResponse } from "@/mocks/responses";

/**
 * Mock response for GET user/me
 * Matches backend: UserReadService returns user (without password) in result data
 */
export const mockGetAuthUserResponse: GetRequestReturnType<UserWithRelationsType> = buildGetResponse(
  {
    ...(mockStaffList[0]?.user as UserWithRelationsType),
    staff: mockStaffList[0] ? {
      id: mockStaffList[0].id,
      jobTitle: mockStaffList[0].jobTitle,
      userId: mockStaffList[0].userId,
      user: mockStaffList[0].user,
      roleId: mockStaffList[0].roleId,
      role: mockStaffList[0].role,
      nin: mockStaffList[0].nin,
      tin: mockStaffList[0].tin,
      cvUrl: mockStaffList[0].cvUrl,
      employmentType: mockStaffList[0].employmentType,
      highestLevelEdu: mockStaffList[0].highestLevelEdu,
      group: mockStaffList[0].group,
      classDivisions: mockStaffList[0].classDivisions,
      subjects: mockStaffList[0].subjects,
      tenantId: mockStaffList[0].tenantId,
      tenant: mockStaffList[0].tenant,
      startDate: mockStaffList[0].startDate,
    } : null,
  } as UserWithRelationsType
);
