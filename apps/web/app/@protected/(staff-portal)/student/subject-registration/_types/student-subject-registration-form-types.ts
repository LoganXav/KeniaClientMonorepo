import { z } from "zod";
import { StudentSubjectRegistrationCreateFormSchema } from "../_schema/student-subject-registration-form-schema";

export type StudentSubjectRegistrationCreateFormSchemaType = z.infer<typeof StudentSubjectRegistrationCreateFormSchema>;
