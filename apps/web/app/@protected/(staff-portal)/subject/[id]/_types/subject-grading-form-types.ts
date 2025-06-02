import { z } from "zod";
import { SubjectGradingCreateFormSchema } from "../_schema/subject-grading-schema";

export type SubjectGradingCreateFormSchemaType = z.infer<typeof SubjectGradingCreateFormSchema>;
