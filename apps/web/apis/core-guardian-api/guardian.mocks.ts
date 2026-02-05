import { GetRequestReturnType } from "@/config/base-query";

/**
 * Mock responses for guardian API endpoints
 * All responses match backend schema structures
 */

/**
 * Mock response for GET guardian/list
 * Returns array of guardians
 */
export const mockGetGuardianListResponse: GetRequestReturnType<Array<{ id: string; firstName: string; lastName: string; email: string; phoneNumber: string }>> = {
  data: [
    {
      id: "1",
      firstName: "John",
      lastName: "Johnson",
      email: "john.johnson@example.com",
      phoneNumber: "+2348000000001",
    },
    {
      id: "2",
      firstName: "Mary",
      lastName: "Williams",
      email: "mary.williams@example.com",
      phoneNumber: "+2348000000002",
    },
    {
      id: "3",
      firstName: "Robert",
      lastName: "Brown",
      email: "robert.brown@example.com",
      phoneNumber: "+2348000000003",
    },
    {
      id: "4",
      firstName: "Sarah",
      lastName: "Davis",
      email: "sarah.davis@example.com",
      phoneNumber: "+2348000000004",
    },
    {
      id: "5",
      firstName: "Michael",
      lastName: "Miller",
      email: "michael.miller@example.com",
      phoneNumber: "+2348000000005",
    },
  ],
  message: "Resource fetched successfully",
  statusCode: 200,
};
