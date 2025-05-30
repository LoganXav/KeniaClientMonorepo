import { z } from "zod";
import { ClassDivisionCreateFormSchema } from "../_schema/class-division-create-form-schema";

export type ClassDivisionCreateFormSchemaType = z.infer<typeof ClassDivisionCreateFormSchema>;
