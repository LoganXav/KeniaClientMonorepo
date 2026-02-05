import { GetRequestReturnType } from "@/config/base-query";
import { StaffPeriodType } from "@/types";

/**
 * Mock response for GET period/list (today's class periods for staff)
 * Backend returns ISO datetime strings (e.g., "2024-02-05T08:00:00") that can be parsed by new Date()
 */

const today = new Date();
const todayISO = today.toISOString().split("T")[0]; // Get YYYY-MM-DD part

export const mockGetPeriodResponse: GetRequestReturnType<StaffPeriodType[]> = {
  data: [
    { class: "SS 1", classDivision: "A", subject: "Mathematics", startTime: `${todayISO}T08:00:00`, endTime: `${todayISO}T09:00:00` },
    { class: "SS 1", classDivision: "B", subject: "English", startTime: `${todayISO}T09:15:00`, endTime: `${todayISO}T10:15:00` },
    { class: "SS 2", classDivision: "A", subject: "Physics", startTime: `${todayISO}T10:30:00`, endTime: `${todayISO}T11:30:00` },
  ],
  message: "Resource fetched successfully",
  statusCode: 200,
};
