import { GetRequestReturnType, PostRequestReturnType } from "@/config/base-query";
import { ClassPromotionType } from "@/types";
import { ClassPromotionTemplateOptions } from "@/app/@protected/(staff-portal)/class/promotion/_types/class-promotion-types";
import { createMockStudent } from "../core-student-api/student.mocks";

/**
 * Mock responses for class promotion API endpoints
 * All responses match backend schema structures
 */

/**
 * Mock response for GET class/promotion/list
 * Returns array of class promotions
 */
export const mockGetClassPromotionListResponse: GetRequestReturnType<ClassPromotionType[]> = {
  data: [
    {
      promotionStatus: "Promoted",
      comments: "Excellent performance",
      student: createMockStudent(1, "ADM001", "Alice", "Johnson", "alice.johnson@example.com", 1, 1) as any,
      fromClass: { id: 1, name: "SS 1", classTeacherId: 1, classTeacher: {} as any, students: [], subjects: [], tenantId: 1, tenant: {} as any },
      toClass: { id: 2, name: "SS 2", classTeacherId: 1, classTeacher: {} as any, students: [], subjects: [], tenantId: 1, tenant: {} as any },
    },
    {
      promotionStatus: "Awaiting",
      comments: "Pending review",
      student: createMockStudent(2, "ADM002", "Bob", "Williams", "bob.williams@example.com", 1, 1) as any,
      fromClass: { id: 1, name: "SS 1", classTeacherId: 1, classTeacher: {} as any, students: [], subjects: [], tenantId: 1, tenant: {} as any },
      toClass: { id: 2, name: "SS 2", classTeacherId: 1, classTeacher: {} as any, students: [], subjects: [], tenantId: 1, tenant: {} as any },
    },
    {
      promotionStatus: "Repeated",
      comments: "Needs improvement",
      student: createMockStudent(3, "ADM003", "Charlie", "Brown", "charlie.brown@example.com", 1, 2) as any,
      fromClass: { id: 1, name: "SS 1", classTeacherId: 1, classTeacher: {} as any, students: [], subjects: [], tenantId: 1, tenant: {} as any },
      toClass: { id: 1, name: "SS 1", classTeacherId: 1, classTeacher: {} as any, students: [], subjects: [], tenantId: 1, tenant: {} as any },
    },
  ],
  message: "Resource fetched successfully",
  statusCode: 200,
};

/**
 * Mock response for GET class/promotion/template
 * Returns template options for class promotion
 */
export const mockGetClassPromotionTemplateResponse: GetRequestReturnType<ClassPromotionTemplateOptions> = {
  data: {
    classOptions: [
      { id: 1, name: "SS 1", classTeacherId: 1, classTeacher: {} as any, students: [], subjects: [], tenantId: 1, tenant: {} as any },
      { id: 2, name: "SS 2", classTeacherId: 1, classTeacher: {} as any, students: [], subjects: [], tenantId: 1, tenant: {} as any },
      { id: 3, name: "SS 3", classTeacherId: 1, classTeacher: {} as any, students: [], subjects: [], tenantId: 1, tenant: {} as any },
    ],
    classDivisionOptions: [
      { id: 1, name: "A", classId: 1, classDivisionTeacherId: 1, class: {} as any, tenantId: 1, tenant: {} as any, students: [], classDivionTeacher: {} as any },
      { id: 2, name: "B", classId: 1, classDivisionTeacherId: 1, class: {} as any, tenantId: 1, tenant: {} as any, students: [], classDivionTeacher: {} as any },
    ],
    promotionClassDivisionOptions: [
      { id: 3, name: "A", classId: 2, classDivisionTeacherId: 1, class: {} as any, tenantId: 1, tenant: {} as any, students: [], classDivionTeacher: {} as any },
      { id: 4, name: "B", classId: 2, classDivisionTeacherId: 1, class: {} as any, tenantId: 1, tenant: {} as any, students: [], classDivionTeacher: {} as any },
    ],
    calendarOptions: [
      { id: 1, year: 2024, terms: [] },
      { id: 2, year: 2025, terms: [] },
    ],
    studentOptions: [
      createMockStudent(1, "ADM001", "Alice", "Johnson", "alice.johnson@example.com", 1, 1),
      createMockStudent(2, "ADM002", "Bob", "Williams", "bob.williams@example.com", 1, 1),
      createMockStudent(3, "ADM003", "Charlie", "Brown", "charlie.brown@example.com", 1, 2),
    ],
    promotionDecisionOptions: ["Promoted", "Awaiting", "Repeated", "Withheld"],
  },
  message: "Resource fetched successfully",
  statusCode: 200,
};

/**
 * Mock response for POST class/promotion/create
 * Returns created class promotion
 */
export const mockCreateClassPromotionResponse: PostRequestReturnType<ClassPromotionType> = {
  data: {
    promotionStatus: "Promoted",
    comments: "Promoted successfully",
    student: createMockStudent(1, "ADM001", "Alice", "Johnson", "alice.johnson@example.com", 1, 1) as any,
    fromClass: { id: 1, name: "SS 1", classTeacherId: 1, classTeacher: {} as any, students: [], subjects: [], tenantId: 1, tenant: {} as any },
    toClass: { id: 2, name: "SS 2", classTeacherId: 1, classTeacher: {} as any, students: [], subjects: [], tenantId: 1, tenant: {} as any },
  },
  message: "Class promotion created successfully",
  statusCode: 201,
};
