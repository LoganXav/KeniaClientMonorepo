import { StaffPeriodType } from "@/types";
import { getTodayISO } from "../constants";

/**
 * Mock periods data for staff workspace
 */
export const mockPeriodList: StaffPeriodType[] = [
  { 
    class: "SS 1", 
    classDivision: "A", 
    subject: "Mathematics", 
    startTime: `${getTodayISO()}T08:00:00`, 
    endTime: `${getTodayISO()}T09:00:00` 
  },
  { 
    class: "SS 1", 
    classDivision: "B", 
    subject: "English", 
    startTime: `${getTodayISO()}T09:15:00`, 
    endTime: `${getTodayISO()}T10:15:00` 
  },
  { 
    class: "SS 2", 
    classDivision: "A", 
    subject: "Physics", 
    startTime: `${getTodayISO()}T10:30:00`, 
    endTime: `${getTodayISO()}T11:30:00` 
  },
];
