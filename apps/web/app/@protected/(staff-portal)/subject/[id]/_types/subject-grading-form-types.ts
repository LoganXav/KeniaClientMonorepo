import { z } from "zod";
import { SubjectGradingCreateFormSchema } from "../_schema/subject-grading-schema";

export type SubjectGradingCreateFormSchemaType = z.infer<typeof SubjectGradingCreateFormSchema>;

export type SubjectBulkGradingCreateType = {
  termId: number;
  classId?: number;
  subjectId: number;
  calendarId: number;
  grades: StudentBulkGradingType[];
};

export interface StudentBulkGradingType {
  examScore: number;
  admissionNo: string;
  continuousAssessmentScores: {
    name: string;
    score: number;
  }[];
}

export type StudentBulkRow = Record<string, string | number>;
