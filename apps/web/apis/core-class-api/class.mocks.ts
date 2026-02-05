import { GetRequestReturnType } from "@/config/base-query";

/**
 * Mock responses for class API endpoints
 * All responses match backend schema structures
 */

/**
 * Mock response for GET class/list
 * Returns array of classes
 */
export const mockGetClassListResponse: GetRequestReturnType<Array<{ id: number; name: string }>> = {
  data: [
    { id: 1, name: "SS 1" },
    { id: 2, name: "SS 2" },
    { id: 3, name: "SS 3" },
    { id: 4, name: "JSS 1" },
    { id: 5, name: "JSS 2" },
    { id: 6, name: "JSS 3" },
  ],
  message: "Resource fetched successfully",
  statusCode: 200,
};

/**
 * Mock response for GET class/info/:classId
 * Returns single class details
 */
export const mockGetSingleClassResponse: GetRequestReturnType<Record<string, any>> = {
  data: {
    id: 1,
    name: "SS 1",
    classTeacherId: 1,
    tenantId: 1,
  },
  message: "Resource fetched successfully",
  statusCode: 200,
};
