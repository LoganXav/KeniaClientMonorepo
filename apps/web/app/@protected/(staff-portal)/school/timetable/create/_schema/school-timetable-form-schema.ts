import { z } from "zod";

export const SchoolTimetableFormSchema = z.object({
  tenantId: z.number().nonnegative(),
  id: z.number().nonnegative(),
  day: z.string().min(1, "Day is required"),
  periods: z.array(
    z.object({
      startTime: z.string().min(1, "Start time is required"),
      endTime: z.string().min(1, "End time is required"),
      subjectId: z.number().nonnegative(),
      isBreak: z.boolean(),
      breakType: z.string().optional(),
    })
  ),
  classId: z.number().nonnegative(),
  classDivisionId: z.number().nonnegative(),
});
