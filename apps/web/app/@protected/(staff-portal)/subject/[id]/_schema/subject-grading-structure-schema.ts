import { z } from "zod";

export const SubjectGradingStructureCreateFormSchema = z.object({
  id: z.number().optional(),
  subjectId: z.number().optional(),
  staffId: z.number().optional(),
  classId: z.number().optional(),
  tenantGradingStructureId: z.number().optional(),
  continuousAssessmentBreakdownItems: z
    .array(
      z.object({
        name: z.string({ required_error: "Name is required" }).min(1, { message: "Name cannot be empty" }),
        weight: z.union([z.string().min(1, { message: "Weight is required" }), z.number({ required_error: "Weight is required" })]).refine(
          (val) => {
            const numVal = typeof val === "string" ? parseFloat(val) : val;
            // Ensure it's a valid number and not zero
            return !isNaN(numVal) && isFinite(numVal) && numVal !== 0;
          },
          {
            message: "Invalid weight",
          }
        ),
      })
    )
    .min(1, { message: "At least one continuous assessment breakdown item is required" }),
});
