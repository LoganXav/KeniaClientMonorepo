import { z } from "zod";

export const StudentSubjectRegistrationCreateFormSchema = z.object({
  studentId: z.union([z.string().min(1), z.number()]),
  calendarId: z.union([z.string().min(1), z.number()]),
  classId: z.union([z.string().min(1), z.number()]),
  classDivisionId: z.union([z.string().min(1), z.number()]),
  subjectIds: z.array(z.number()),
});
