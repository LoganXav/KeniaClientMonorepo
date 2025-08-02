import { z } from "zod";
import { classTermResultCollationFormSchema } from "../_schema/class-term-result-collation-form-schema";

export type ClassTermResultCollationFormType = z.infer<
  typeof classTermResultCollationFormSchema
>;
