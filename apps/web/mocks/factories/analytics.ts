import { AtRiskStudent, SubjectFailure, TeacherImpact } from "@/app/@protected/(staff-portal)/analytics/_types/analytics-types";

/**
 * Factory function to create at-risk student data
 */
export function createAtRiskStudent(
  studentId: number,
  name: string,
  grade: string,
  attendancePercent: number,
  avgScore: number,
  riskScore: number,
  riskExplanation: string,
  classId: number
): AtRiskStudent {
  return {
    studentId,
    name,
    grade,
    attendancePercent,
    avgScore,
    riskScore,
    riskExplanation,
    classId,
  };
}

/**
 * Factory function to create subject failure data
 */
export function createSubjectFailure(
  subject: string,
  failureRate: number,
  avgScore: number,
  studentCount: number,
  classId: number
): SubjectFailure {
  return {
    subject,
    failureRate,
    avgScore,
    studentCount,
    classId,
  };
}

/**
 * Factory function to create teacher impact data
 */
export function createTeacherImpact(
  teacherId: number,
  name: string,
  subject: string,
  avgStudentImprovement: number,
  classCount: number,
  classIds: number[]
): TeacherImpact {
  return {
    teacherId,
    name,
    subject,
    avgStudentImprovement,
    classCount,
    classIds,
  };
}
