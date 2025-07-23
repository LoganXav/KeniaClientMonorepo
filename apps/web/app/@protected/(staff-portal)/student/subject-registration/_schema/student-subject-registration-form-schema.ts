import { z } from "zod";

export const StudentSubjectRegistrationCreateFormSchema = z.object({
  studentId: z.union([z.string({ required_error: "Student is required" }).min(1), z.number()]),
  calendarId: z.union([z.string({ required_error: "Session is required" }).min(1), z.number()]),
  classId: z.union([z.string({ required_error: "Class is required" }).min(1), z.number()]),
  classDivisionId: z.union([z.string({ required_error: "Class division is required" }).min(1), z.number()]),
  subjectIds: z.array(z.number()),
});
