import { z } from "zod";

export const SchoolCalendarFormSchema = z.object({
  tenantId: z.number().min(1),
  year: z.number().min(1),
  terms: z.array(
    z.object({
      name: z.string().min(1),
      startDate: z.string().min(1),
      endDate: z.string().min(1),
    })
  ),
});
