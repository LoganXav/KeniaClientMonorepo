import { z } from "zod";
import { SubjectCreateFormSchema } from "../_schema/school-subject-create-schema";
import { ClassType } from "@/types";
import { StaffType } from "@/types";

export type SubjectCreateFormSchemaType = z.infer<typeof SubjectCreateFormSchema>;

export type SubjectTemplateOptions = {
  staffOptions: StaffType[];
  classOptions: ClassType[];
};
