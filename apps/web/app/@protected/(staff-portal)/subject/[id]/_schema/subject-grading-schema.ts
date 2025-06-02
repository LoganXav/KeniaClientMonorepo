import { z } from "zod";

export const SubjectGradingCreateFormSchema = z.object({
  studentId: z.union([z.string().min(1, { message: "Student is required" }), z.number({ required_error: "Student is required" })]),
  subjectId: z.number(),
  calendarId: z.union([z.string().min(1, { message: "Session is required" }), z.number({ required_error: "Session is required" })]),
  classId: z.union([z.string(), z.number()]),
  classDivisionId: z.union([z.string(), z.number()]),
  termId: z.union([z.string().min(1, { message: "Term is required" }), z.number({ required_error: "Term is required" })]),
  examScore: z.number(),
  continuousAssessmentScores: z.array(
    z.object({
      name: z.string({ required_error: "Name is required" }).min(1, { message: "Name cannot be empty" }),
      score: z.union([z.string().min(1, { message: "Score is required" }), z.number({ required_error: "Score is required" })]),
    })
  ),
});
