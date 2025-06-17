import { z } from "zod";
import { StaffAssignFormSchema } from "../_schema/staff-assign-form-schema";

export type StaffAssignFormSchemaType = z.infer<typeof StaffAssignFormSchema>;
