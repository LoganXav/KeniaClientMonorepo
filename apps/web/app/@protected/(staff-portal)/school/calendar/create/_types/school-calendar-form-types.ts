import { z } from "zod";
import { SchoolCalendarFormSchema } from "../_schema/school-calendar-form-schema";

export type SchoolCalendarFormSchemaType = z.infer<typeof SchoolCalendarFormSchema>;

export interface SchoolCalendarTemplateOptions {
  schoolSessionOptions: {
    id: number;
    name: string;
    year: number;
  }[];
}
