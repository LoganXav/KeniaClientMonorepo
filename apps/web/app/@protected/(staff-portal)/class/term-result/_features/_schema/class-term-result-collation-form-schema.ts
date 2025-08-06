import { z } from "zod";

export const classTermResultCollationFormSchema = z.object({
  calendarId: z.union([
    z.string().min(1, "Calendar ID is required"),
    z.number(),
  ]),
  termId: z.union([z.string().min(1, "Term ID is required"), z.number()]),
  classId: z.union([z.string().min(1, "Class ID is required"), z.number()]),
  classDivisionId: z.union([
    z.string().min(1, "Class Division ID is required"),
    z.number(),
  ]),
});
