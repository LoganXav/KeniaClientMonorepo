import { z } from "zod";
import { SchoolTimetableFormSchema } from "../_schema/school-timetable-form-schema";
import { RefetchOptions } from "@tanstack/react-query";
import { GetRequestReturnType } from "@/config/base-query";

export type SchoolTimetableFormSchemaType = z.infer<typeof SchoolTimetableFormSchema>;

export type SchoolTimetableTemplateOptions =
  | {
      data:
        | GetRequestReturnType<{
            classOptions: { id: number; name: string }[];
            classDivisionOptions: { id: number; name: string }[];
            subjectOptions: { id: number; name: string }[];
            dayOptions: string[];
            breakTypeOptions: string[];
            termOptions: { id: number; name: string; startDate: string; endDate: string; tenantId: number }[];
          }>
        | undefined;
      isLoading: boolean;
      error: Error | null;
      refetch: (options?: RefetchOptions) => Promise<any>;
    }
  | undefined;
