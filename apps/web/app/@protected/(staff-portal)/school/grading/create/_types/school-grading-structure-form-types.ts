import { z } from "zod";
import { ClassType } from "@/types";
import { SchoolGradingStructureCreateFormSchema } from "../_schema/school-grading-structure-schema";

export type SchoolGradingStructureCreateFormSchemaType = z.infer<typeof SchoolGradingStructureCreateFormSchema>;

export type SchoolGradingStructureTemplateOptions = {
  gradeOptions: String[];
  classOptions: ClassType[];
};
