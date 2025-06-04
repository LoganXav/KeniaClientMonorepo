import { z } from "zod";

export const ClassDivisionCreateFormSchema = z.object({
  name: z.string().min(1),
  classId: z.union([z.string(), z.number()]),
  classDivisionTeacherId: z.union([z.string(), z.number()]),
});
