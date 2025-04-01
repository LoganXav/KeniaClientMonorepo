import { z } from "zod";

export const SchoolTimetableFormSchema = z.object({
  tenantId: z.number().nonnegative(),
  id: z.number().nonnegative(),
  day: z.string().min(1, "Day is required"),
  termId: z.number().nonnegative(),
  periods: z.array(
    z.object({
      startTime: z.union([z.date().optional(), z.string().optional()]),
      endTime: z.union([z.date().optional(), z.string().optional()]),
      subjectId: z.number().nonnegative(),
      isBreak: z.boolean(),
      breakType: z.string().optional(),
    })
  ),
  classId: z.number().nonnegative(),
  classDivisionId: z.number().nonnegative(),
});
