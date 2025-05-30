import { z } from "zod";
import { SubjectGradingStructureCreateFormSchema } from "../_schema/subject-grading-structure-schema";

export type SubjectGradingStructureCreateFormSchemaType = z.infer<typeof SubjectGradingStructureCreateFormSchema>;
