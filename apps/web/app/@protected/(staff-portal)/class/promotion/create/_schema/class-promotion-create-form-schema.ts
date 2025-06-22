import { z } from "zod";

export const classPromotionCreateFormSchema = z.object({
  calendarId: z.union([z.string().min(1, "Calendar ID is required"), z.number()]),
  classId: z.union([z.string().min(1, "Class ID is required"), z.number()]),
  classDivisionId: z.union([z.string().min(1, "Class Division ID is required"), z.number()]),
  promotions: z.array(
    z.object({
      toClassId: z.union([z.string().min(1, "To Class ID is required"), z.number()]),
      toClassDivisionName: z.string().min(1, "To Class Division Name is required"),
      promotionStatus: z.string().min(1, "Promotion status is required"),
      comments: z.string().optional(),
      studentId: z.union([z.string().min(1, "Student ID is required"), z.number()]),
    })
  ),
});
