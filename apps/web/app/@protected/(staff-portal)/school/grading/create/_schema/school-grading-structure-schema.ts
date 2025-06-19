import { z } from "zod";

const weightSchema = z
  .union([z.string(), z.number()])
  .transform((val) => Number(val))
  .refine((val) => val >= 0 && val <= 100, {
    message: "Percentages must be between 0 and 100",
  });

export const SchoolGradingStructureCreateFormSchema = z
  .object({
    id: z.number().optional(),
    name: z.string().optional(),
    classIds: z.array(z.number({ message: "Class ID must be a number" })).min(1, { message: "At least one class must be selected" }),
    continuousAssessmentWeight: weightSchema,
    examWeight: weightSchema,
    gradeBoundaries: z
      .array(
        z
          .object({
            minimumScore: z.union([z.string(), z.number()]).transform(Number),
            maximumScore: z.union([z.string(), z.number()]).transform(Number),
            grade: z.string(),
            remark: z.string(),
          })
          .refine((b) => b.maximumScore >= b.minimumScore, {
            message: "Maximum score must be greater than or equal to minimum score",
          })
      )
      .min(1, { message: "At least one grade boundary is required" }),
  })
  .refine((data) => Number(data.continuousAssessmentWeight) + Number(data.examWeight) === 100, {
    path: ["examWeight"],
    message: "Continuous assessment and exam percentages must add up to 100",
  });
