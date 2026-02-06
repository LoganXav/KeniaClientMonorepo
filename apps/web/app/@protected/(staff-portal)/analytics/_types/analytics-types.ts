export interface AtRiskStudent {
  studentId: number;
  name: string;
  grade: string;
  attendancePercent: number;
  avgScore: number;
  riskScore: number;
  riskExplanation: string;
  classId: number;
}

export interface SubjectFailure {
  subject: string;
  failureRate: number;
  avgScore: number;
  studentCount: number;
  classId: number;
}

export interface TeacherImpact {
  teacherId: number;
  name: string;
  subject: string;
  avgStudentImprovement: number;
  classCount: number;
  classIds: number[];
}
