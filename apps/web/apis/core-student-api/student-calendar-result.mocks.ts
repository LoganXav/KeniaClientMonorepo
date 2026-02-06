// @ts-nocheck
import { GetRequestReturnType, PostRequestReturnType } from "@/config/base-query";
import { StudentCalendarResultType, SubjectGradingType } from "@/types";
import { mockStudentList, mockCalendar, mockClassDivisionList } from "@/mocks/data";
import { buildGetResponse, buildPostResponse } from "@/mocks/responses";
import { MOCK_TENANT_ID, MOCK_CALENDAR } from "@/mocks/constants";

/**
 * Mock responses for student calendar result API endpoints
 * All responses match backend schema structures
 */

/**
 * Create subject grades for a student based on their registered subjects
 */
function createSubjectGradesForStudent(
  studentId: number,
  classId: number,
  classDivisionId: number
): SubjectGradingType[] {
  const student = mockStudentList.find((s) => s.id === studentId);
  if (!student || !student.subjectsRegistered.length) {
    return [];
  }

  const gradeRanges: { grade: string; min: number; max: number }[] = [
    { grade: "A", min: 85, max: 100 },
    { grade: "B", min: 70, max: 84 },
    { grade: "C", min: 60, max: 69 },
    { grade: "D", min: 50, max: 59 },
    { grade: "F", min: 0, max: 49 },
  ];

  return student.subjectsRegistered.map((registration, index) => {
    const gradeIndex = (studentId + index) % gradeRanges.length;
    const gradeRange = gradeRanges[gradeIndex];
    const totalScore = Math.floor(Math.random() * (gradeRange.max - gradeRange.min + 1)) + gradeRange.min;

    return {
      continuousAssessmentScores: [
        {
          id: index * 10 + 1,
          name: "Assignment 1",
          score: Math.floor(totalScore * 0.3),
        },
        {
          id: index * 10 + 2,
          name: "Quiz 1",
          score: Math.floor(totalScore * 0.2),
        },
        {
          id: index * 10 + 3,
          name: "Mid-term Test",
          score: Math.floor(totalScore * 0.5),
        },
      ],
      subject: registration.subject,
      totalScore,
      grade: gradeRange.grade,
      classId,
      classDivisionId,
      student: {
        classDivision: mockClassDivisionList.find((d) => d.id === classDivisionId) || ({} as any),
      },
    };
  });
}

/**
 * Create a comprehensive student object with all necessary data
 */
function createComprehensiveStudent(studentId: number) {
  const student = mockStudentList.find((s) => s.id === studentId);
  if (!student) return null;

  const subjectGrades = createSubjectGradesForStudent(
    studentId,
    student.class.id,
    student.classDivisionId
  );

  return {
    ...student,
    subjectGrades,
  };
}

/**
 * Calculate term averages from subject grades
 * Returns average scores for each term
 */
function calculateTermAverages(
  subjectGrades: SubjectGradingType[],
  studentId: number
): { termId: number; averageScore: number }[] {
  // Generate term-specific averages (slightly varied)
  const baseAverage = subjectGrades.length > 0
    ? subjectGrades.reduce((sum, grade) => sum + grade.totalScore, 0) / subjectGrades.length
    : 0;

  return MOCK_CALENDAR.terms.map((term, index) => {
    // Vary averages slightly per term (±5 points)
    const variation = (studentId % 3 - 1) * 2 + (index - 1) * 1.5;
    const termAverage = Math.max(0, Math.min(100, baseAverage + variation));
    return {
      termId: term.id,
      averageScore: Math.round(termAverage * 100) / 100,
    };
  });
}

/**
 * Mock response for GET student/calendarresult/list
 * Returns array of student calendar results with comprehensive data
 * Filters by classId, classDivisionId, calendarId, and tenantId
 * Each student has one calendar result per calendar (unique constraint)
 */
export function mockGetStudentCalendarResultListResponse(params?: {
  tenantId?: number;
  classId?: number;
  classDivisionId?: number;
  calendarId?: number;
}): GetRequestReturnType<StudentCalendarResultType[]> {
  // Filter students based on params
  let filteredStudents = [...mockStudentList];
  
  if (params?.classId) {
    filteredStudents = filteredStudents.filter((s) => s.class.id === params.classId);
  }
  
  if (params?.classDivisionId) {
    filteredStudents = filteredStudents.filter((s) => s.classDivisionId === params.classDivisionId);
  }
  
  // Filter by calendarId if provided
  const calendarIdToUse = params?.calendarId || mockCalendar.id;
  
  const results = filteredStudents.map((student) => {
    const comprehensiveStudent = createComprehensiveStudent(student.id);
    if (!comprehensiveStudent) {
      throw new Error(`Student ${student.id} not found`);
    }

    const termAverages = calculateTermAverages(comprehensiveStudent.subjectGrades, student.id);
    const totalScore = termAverages.reduce((sum, term) => sum + term.averageScore, 0) * comprehensiveStudent.subjectGrades.length;
    const averageScore = termAverages.reduce((sum, term) => sum + term.averageScore, 0) / termAverages.length;
    const subjectCountGraded = comprehensiveStudent.subjectGrades.length * MOCK_CALENDAR.terms.length;

    return {
      id: student.id * 10 + calendarIdToUse,
      calendarId: calendarIdToUse,
      classId: student.class.id,
      tenantId: params?.tenantId || MOCK_TENANT_ID,
      studentId: student.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      totalScore: Math.round(totalScore),
      finalized: false,
      student: comprehensiveStudent as any,
      averageScore: Math.round(averageScore * 100) / 100,
      classDivisionId: student.classDivisionId,
      subjectCountGraded,
      studentCalendarTermAverageScores: termAverages.map((termAvg) => ({
        termId: termAvg.termId,
        term: MOCK_CALENDAR.terms.find((t) => t.id === termAvg.termId) as any,
        averageScore: termAvg.averageScore,
      })),
    };
  });
  
  return buildGetResponse(results);
}

/**
 * Mock response for POST student/calendarresult/:studentId
 * Returns updated student calendar result
 */
export const mockStudentCalendarResultUpdateResponse: PostRequestReturnType<StudentCalendarResultType> = buildPostResponse(
  (() => {
    const student = mockStudentList[0];
    if (!student) {
      throw new Error("No student found");
    }
    const comprehensiveStudent = createComprehensiveStudent(student.id);
    if (!comprehensiveStudent) {
      throw new Error("Student not found");
    }

    const termAverages = calculateTermAverages(comprehensiveStudent.subjectGrades, student.id);
    const totalScore = termAverages.reduce((sum, term) => sum + term.averageScore, 0) * comprehensiveStudent.subjectGrades.length;
    const averageScore = termAverages.reduce((sum, term) => sum + term.averageScore, 0) / termAverages.length;
    const subjectCountGraded = comprehensiveStudent.subjectGrades.length * MOCK_CALENDAR.terms.length;

    return {
      id: 1,
      calendarId: mockCalendar.id,
      classId: student.class.id,
      tenantId: MOCK_TENANT_ID,
      studentId: student.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      totalScore: Math.round(totalScore),
      finalized: true,
      student: comprehensiveStudent as any,
      averageScore: Math.round(averageScore * 100) / 100,
      classDivisionId: student.classDivisionId,
      subjectCountGraded,
      studentCalendarTermAverageScores: termAverages.map((termAvg) => ({
        termId: termAvg.termId,
        term: MOCK_CALENDAR.terms.find((t) => t.id === termAvg.termId) as any,
        averageScore: termAvg.averageScore,
      })),
    };
  })(),
  "Student calendar result updated successfully",
  200
);
