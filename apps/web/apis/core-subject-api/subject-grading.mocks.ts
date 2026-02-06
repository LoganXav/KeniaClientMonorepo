// @ts-nocheck
import { GetRequestReturnType, PostRequestReturnType } from "@/config/base-query";
import { SubjectGradingTemplateOptions } from "@/app/@protected/(staff-portal)/student/grading/_types/subject-grading-types";
import { SubjectGradingType } from "@/types";
import { createMockStudent } from "../core-student-api/student.mocks";
import { mockCalendar, mockClassList, mockClassDivisionList, mockStudentList } from "@/mocks/data";
import { buildGetResponse, buildPostResponse } from "@/mocks/responses";

/**
 * Mock responses for subject grading API endpoints
 * All responses match backend schema structures
 */

/**
 * Mock response for GET subject/grading/template
 * Returns template options for subject grading
 * Filters options based on calendarId, classId, and subjectId
 */
export function mockGetSubjectGradingTemplateResponse(params?: {
  calendarId?: number;
  classId?: number;
  tenantId?: number;
  subjectId?: number;
}): GetRequestReturnType<SubjectGradingTemplateOptions> {
  // Filter class divisions by classId if provided
  let classDivisionOptions = mockClassDivisionList;
  if (params?.classId) {
    classDivisionOptions = mockClassDivisionList.filter((cd) => cd.classId === params.classId);
  }
  
  // Filter students by classId and calendarId, and subjectId if provided
  let studentOptions = mockStudentList;
  if (params?.classId) {
    studentOptions = studentOptions.filter((s) => s.class.id === params.classId);
  }
  if (params?.calendarId) {
    // Filter students registered for the calendar
    studentOptions = studentOptions.filter((s) => 
      s.subjectsRegistered.some((reg) => reg.subject?.id !== undefined)
    );
  }
  if (params?.subjectId) {
    // Filter students offering the specific subject
    studentOptions = studentOptions.filter((s) =>
      s.subjectsRegistered.some((reg) => reg.subjectId === params.subjectId)
    );
  }
  
  return buildGetResponse({
    calendarOptions: [mockCalendar],
    termOptions: mockCalendar.terms,
    classOptions: mockClassList,
    classDivisionOptions,
    studentOptions,
  });
}

/**
 * Mock response for GET subject/grading/list
 * Returns array of subject grading records filtered by subjectId, classId, classDivisionId, calendarId, and termId
 */
export function mockGetSubjectGradingListResponse(params?: {
  tenantId?: number;
  subjectId?: number;
  calendarId?: number;
  termId?: number;
  classId?: number;
  classDivisionId?: number;
}): GetRequestReturnType<SubjectGradingType[]> {
  // Filter students based on params
  let filteredStudents = [...mockStudentList];
  
  if (params?.classId) {
    filteredStudents = filteredStudents.filter((s) => s.class.id === params.classId);
  }
  
  if (params?.classDivisionId) {
    filteredStudents = filteredStudents.filter((s) => s.classDivisionId === params.classDivisionId);
  }
  
  // Get subject registrations for filtered students
  let subjectRegistrations = filteredStudents.flatMap((student) => student.subjectsRegistered || []);
  
  // Filter by subjectId if provided
  if (params?.subjectId) {
    subjectRegistrations = subjectRegistrations.filter((reg) => reg.subjectId === params.subjectId);
  }
  
  // Create grading records for students registered for the subject
  // Use the actual student objects from mockStudentList to ensure we have complete user data
  const gradingRecords: SubjectGradingType[] = [];
  
  for (const registration of subjectRegistrations) {
    // Find the actual student from mockStudentList to get complete user data
    const actualStudent = mockStudentList.find((s) => s.id === registration.student.id);
    if (!actualStudent) continue;
    
    const student = actualStudent;
    const subject = registration.subject;
    if (!subject) continue;
    
    // Generate realistic grades based on student ID for consistency
    const gradeRanges: { grade: string; min: number; max: number }[] = [
      { grade: "A", min: 85, max: 100 },
      { grade: "B", min: 70, max: 84 },
      { grade: "C", min: 60, max: 69 },
      { grade: "D", min: 50, max: 59 },
      { grade: "F", min: 0, max: 49 },
    ];
    
    const gradeIndex = student.id % gradeRanges.length;
    const gradeRange = gradeRanges[gradeIndex];
    if (!gradeRange) continue;
    
    // Use deterministic score based on student ID for consistency
    const totalScore = Math.floor((gradeRange.min + gradeRange.max) / 2) + (student.id % 10);
    
    const classDivision = mockClassDivisionList.find((cd) => cd.id === student.classDivisionId);
    if (!classDivision) continue;
    
    // Calculate exam score (typically 40-60% of total score)
    const continuousScore = Math.floor(totalScore * 0.4);
    const examScore = totalScore - continuousScore;
    
    // Generate remark based on grade
    const remarks: Record<string, string> = {
      A: "Excellent",
      B: "Very Good",
      C: "Good",
      D: "Fair",
      F: "Needs Improvement",
    };
    
    gradingRecords.push({
      continuousAssessmentScores: [
        { id: student.id * 10 + 1, name: "Assignment 1", score: Math.floor(continuousScore * 0.3) },
        { id: student.id * 10 + 2, name: "Quiz 1", score: Math.floor(continuousScore * 0.2) },
        { id: student.id * 10 + 3, name: "Mid-term Test", score: Math.floor(continuousScore * 0.5) },
      ],
      subject: subject,
      totalScore,
      grade: gradeRange.grade,
      classId: student.class.id,
      classDivisionId: student.classDivisionId,
      student: {
        id: student.id,
        classDivision: classDivision,
        user: {
          id: student.user.id,
          firstName: student.user.firstName,
          lastName: student.user.lastName,
        },
      },
      // Include examScore and remark even though TypeScript type doesn't have them
      // The backend and UI expect these fields
      examScore,
      remark: remarks[gradeRange.grade] || "No remark",
    } as SubjectGradingType & { examScore: number; remark: string });
  }
  
  return buildGetResponse(gradingRecords);
}

/**
 * Mock response for POST subject/grading/create
 * Returns created subject grading
 */
export const mockSubjectGradingCreateResponse: PostRequestReturnType<SubjectGradingType> = buildPostResponse(
  {
    continuousAssessmentScores: [
      { id: 6, name: "Assignment", score: 18 },
      { id: 7, name: "Quiz", score: 15 },
      { id: 8, name: "Project", score: 20 },
    ],
    subject: mockStudentList[0]?.subjectsRegistered[0]?.subject || ({} as any),
    totalScore: 83,
    grade: "A",
    classId: mockStudentList[0]?.class.id || 1,
    classDivisionId: mockStudentList[0]?.classDivisionId || 1,
    student: {
      id: mockStudentList[0]?.id || 1,
      classDivision: mockClassDivisionList[0] || ({} as any),
      user: mockStudentList[0]?.user ? {
        id: mockStudentList[0].user.id,
        firstName: mockStudentList[0].user.firstName,
        lastName: mockStudentList[0].user.lastName,
      } : ({} as any),
    },
    examScore: 50,
    remark: "Excellent",
  } as SubjectGradingType & { examScore: number; remark: string },
  "Subject grading created successfully",
  201
);

/**
 * Mock response for POST subject/grading/bulk/create
 * Returns null (bulk operations typically return success message only)
 */
export const mockSubjectGradingBulkCreateResponse: PostRequestReturnType<null> = buildPostResponse(
  null,
  "Subject grading created successfully",
  201
);
