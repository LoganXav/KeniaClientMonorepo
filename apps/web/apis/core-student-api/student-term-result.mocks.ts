// @ts-nocheck
import { GetRequestReturnType, PostRequestReturnType } from "@/config/base-query";
import { StudentTermResultType, SubjectGradingType } from "@/types";
import { mockStudentList, mockClassDivisionList } from "@/mocks/data";
import { buildGetResponse, buildPostResponse } from "@/mocks/responses";
import { MOCK_TENANT_ID, MOCK_CALENDAR } from "@/mocks/constants";

/**
 * Mock responses for student term result API endpoints
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

  // Generate realistic grades for each registered subject
  const gradeRanges: { grade: string; min: number; max: number }[] = [
    { grade: "A", min: 85, max: 100 },
    { grade: "B", min: 70, max: 84 },
    { grade: "C", min: 60, max: 69 },
    { grade: "D", min: 50, max: 59 },
    { grade: "F", min: 0, max: 49 },
  ];

  return student.subjectsRegistered.map((registration, index) => {
    // Vary grades slightly based on student and subject index
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
 * Calculate term result scores from subject grades
 */
function calculateTermScores(subjectGrades: SubjectGradingType[]) {
  const totalScore = subjectGrades.reduce((sum, grade) => sum + grade.totalScore, 0);
  const averageScore = subjectGrades.length > 0 ? totalScore / subjectGrades.length : 0;
  return { totalScore, averageScore, subjectCountGraded: subjectGrades.length };
}

/**
 * Mock response for GET student/termresult/list
 * Returns array of student term results with comprehensive data
 * Filters by classId, classDivisionId, termId, and tenantId
 */
export function mockGetStudentTermResultListResponse(params?: {
  tenantId?: number;
  classId?: number;
  classDivisionId?: number;
  termId?: number;
}): GetRequestReturnType<StudentTermResultType[]> {
  // Filter students based on params
  let filteredStudents = [...mockStudentList];
  
  if (params?.classId) {
    filteredStudents = filteredStudents.filter((s) => s.class.id === params.classId);
  }
  
  if (params?.classDivisionId) {
    filteredStudents = filteredStudents.filter((s) => s.classDivisionId === params.classDivisionId);
  }
  
  // Filter terms based on params
  const termsToProcess = params?.termId
    ? MOCK_CALENDAR.terms.filter((t) => t.id === params.termId)
    : MOCK_CALENDAR.terms;
  
  const results = filteredStudents.flatMap((student) => {
    return termsToProcess.map((term, termIndex) => {
      const comprehensiveStudent = createComprehensiveStudent(student.id);
      if (!comprehensiveStudent) return null;

      const { totalScore, averageScore, subjectCountGraded } = calculateTermScores(
        comprehensiveStudent.subjectGrades
      );

      return {
        id: student.id * 100 + term.id,
        termId: term.id,
        classId: student.class.id,
        tenantId: params?.tenantId || MOCK_TENANT_ID,
        studentId: student.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        totalScore,
        finalized: termIndex === termsToProcess.length - 1, // Finalize last term
        student: comprehensiveStudent as any,
        averageScore: Math.round(averageScore * 100) / 100,
        classDivisionId: student.classDivisionId,
        subjectCountGraded,
      };
    }).filter(Boolean) as StudentTermResultType[];
  }).flat();
  
  return buildGetResponse(results);
}

/**
 * Mock response for POST student/termresult/:studentId
 * Returns updated student term result
 */
export const mockStudentTermResultUpdateResponse: PostRequestReturnType<StudentTermResultType> = buildPostResponse(
  (() => {
    const student = mockStudentList[0];
    if (!student) {
      throw new Error("No student found");
    }
    const comprehensiveStudent = createComprehensiveStudent(student.id);
    if (!comprehensiveStudent) {
      throw new Error("Student not found");
    }

    const { totalScore, averageScore, subjectCountGraded } = calculateTermScores(
      comprehensiveStudent.subjectGrades
    );

    return {
      id: 1,
      termId: MOCK_CALENDAR.terms[0].id,
      classId: student.class.id,
      tenantId: MOCK_TENANT_ID,
      studentId: student.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      totalScore,
      finalized: true,
      student: comprehensiveStudent as any,
      averageScore: Math.round(averageScore * 100) / 100,
      classDivisionId: student.classDivisionId,
      subjectCountGraded,
    };
  })(),
  "Student term result updated successfully",
  200
);
