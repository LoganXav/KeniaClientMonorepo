// @ts-nocheck
import { GetRequestReturnType, PostRequestReturnType } from "@/config/base-query";
import { ClassPromotionType } from "@/types";
import { ClassPromotionTemplateOptions } from "@/app/@protected/(staff-portal)/class/promotion/_types/class-promotion-types";
import { createMockStudent } from "../core-student-api/student.mocks";
import { mockStudentList, mockClassList, mockClassDivisionList, mockCalendar } from "@/mocks/data";
import { buildGetResponse, buildPostResponse } from "@/mocks/responses";

/**
 * Mock responses for class promotion API endpoints
 * All responses match backend schema structures
 */

/**
 * Mock response for GET class/promotion/list
 * Returns array of class promotions
 * Filters by calendarId, classId, classDivisionId, and tenantId
 */
export function mockGetClassPromotionListResponse(params?: {
  tenantId?: number;
  calendarId?: number;
  classId?: number;
  classDivisionId?: number;
}): GetRequestReturnType<ClassPromotionType[]> {
  // Filter students based on params
  let filteredStudents = [...mockStudentList];
  
  if (params?.classId) {
    filteredStudents = filteredStudents.filter((s) => s.class.id === params.classId);
  }
  
  if (params?.classDivisionId) {
    filteredStudents = filteredStudents.filter((s) => s.classDivisionId === params.classDivisionId);
  }
  
  // Create promotions for filtered students
  const promotions = filteredStudents.slice(0, 3).map((student, index) => {
    const statuses: Array<"Promoted" | "Awaiting" | "Repeated" | "Withheld"> = [
      "Promoted",
      "Awaiting",
      "Repeated",
    ];
    const fromClass = student.class;
    const toClass = index === 2 ? fromClass : mockClassList.find((c) => c.id === (fromClass.id + 1)) || fromClass;
    
    return {
      promotionStatus: statuses[index] || ("Promoted" as const),
      comments: index === 0 ? "Excellent performance" : index === 1 ? "Pending review" : "Needs improvement",
      student: student as any,
      fromClass,
      toClass,
    };
  });
  
  return buildGetResponse(promotions);
}

/**
 * Mock response for GET class/promotion/template
 * Returns template options for class promotion
 * Filters options based on classId and classDivisionId
 */
export function mockGetClassPromotionTemplateResponse(params?: {
  tenantId?: number;
  classId?: number;
  classDivisionId?: number;
}): GetRequestReturnType<ClassPromotionTemplateOptions> {
  // Filter class divisions by classId if provided
  let classDivisionOptions = mockClassDivisionList;
  if (params?.classId) {
    classDivisionOptions = mockClassDivisionList.filter((cd) => cd.classId === params.classId);
  }
  
  // Filter students by classId and classDivisionId if provided
  let studentOptions = mockStudentList;
  if (params?.classId) {
    studentOptions = studentOptions.filter((s) => s.class.id === params.classId);
  }
  if (params?.classDivisionId) {
    studentOptions = studentOptions.filter((s) => s.classDivisionId === params.classDivisionId);
  }
  
  // Get unique class divisions for promotion (all divisions)
  const promotionClassDivisionOptions = Array.from(
    new Map(mockClassDivisionList.map((cd) => [cd.name, cd])).values()
  );
  
  return buildGetResponse({
    classOptions: mockClassList,
    classDivisionOptions,
    promotionClassDivisionOptions,
    calendarOptions: [mockCalendar],
    studentOptions,
    promotionDecisionOptions: ["Promoted", "Awaiting", "Repeated", "Withheld"],
  });
}

/**
 * Mock response for POST class/promotion/create
 * Returns created class promotion
 */
export const mockCreateClassPromotionResponse: PostRequestReturnType<ClassPromotionType> = buildPostResponse(
  {
    promotionStatus: "Promoted" as const,
    comments: "Promoted successfully",
    student: mockStudentList[0] || ({} as any),
    fromClass: mockClassList[0] || ({} as any),
    toClass: mockClassList[1] || mockClassList[0] || ({} as any),
  },
  "Class promotion created successfully",
  201
);
