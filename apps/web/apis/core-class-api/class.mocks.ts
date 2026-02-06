// @ts-nocheck
import { GetRequestReturnType } from "@/config/base-query";
import { mockClassList } from "@/mocks/data";
import { buildGetResponse } from "@/mocks/responses";

/**
 * Mock responses for class API endpoints
 * All responses match backend schema structures
 */

/**
 * Mock response for GET class/list
 * Returns array of classes
 */
export const mockGetClassListResponse: GetRequestReturnType<Array<{ id: number; name: string }>> = buildGetResponse(
  mockClassList.map((c) => ({ id: c.id, name: c.name }))
);

/**
 * Mock response for GET class/info/:classId
 * Returns single class details
 */
export const mockGetSingleClassResponse: GetRequestReturnType<Record<string, any>> = buildGetResponse({
  id: mockClassList[0]?.id || 1,
  name: mockClassList[0]?.name || "",
  classTeacherId: mockClassList[0]?.classTeacherId || 1,
  tenantId: mockClassList[0]?.tenantId || 1,
});
