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
  mockStaffList[0]?.user as UserWithRelationsType
);
