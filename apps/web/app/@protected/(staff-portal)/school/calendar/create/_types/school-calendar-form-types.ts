import { schoolCalendarFormSchema } from "../_schema/school-calendar-form-schema";
import { z } from "zod";
export type SchoolCalendarFormSchemaType = z.infer<typeof schoolCalendarFormSchema>;
