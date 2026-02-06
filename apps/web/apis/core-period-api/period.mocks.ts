// @ts-nocheck
import { GetRequestReturnType } from "@/config/base-query";
import { StaffPeriodType } from "@/types";
import { mockPeriodList } from "@/mocks/data";
import { buildGetResponse } from "@/mocks/responses";

/**
 * Mock response for GET period/list (today's class periods for staff)
 * Backend returns ISO datetime strings (e.g., "2024-02-05T08:00:00") that can be parsed by new Date()
 */
export const mockGetPeriodResponse: GetRequestReturnType<StaffPeriodType[]> = buildGetResponse(
  mockPeriodList
);
