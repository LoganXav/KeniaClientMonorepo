import { z } from "zod";
import { StudentCreateFormSchema } from "../_schema/student-create-form-schema";
import { UseFormReturn } from "react-hook-form";
import { GetRequestReturnType } from "@/config/base-query";
import { RefetchOptions } from "@tanstack/react-query";

export type StudentCreateFormSchemaType = z.infer<typeof StudentCreateFormSchema>;

export type StudentCreateFormFieldName = keyof StudentCreateFormSchemaType;

export type StudentCreateFormReturn = UseFormReturn<StudentCreateFormSchemaType, any, undefined>;

export type StudentTemplateOptions =
  | {
      data:
        | GetRequestReturnType<{
            educationLevelOptions: string[];
            countryIdOptions: {
              id: number;
              codeValue: number;
              name: string;
              acronym: string;
            }[];
            employmentTypeOptions: string[];
            lgaIdOptions: { codeValue: string; id: number; name: string }[];
            stateIdOptions: { codeValue: string; id: number; name: string }[];
            classOptions: { id: number; type: string }[];
          }>
        | undefined;
      isLoading: boolean;
      error: Error | null;
      refetch: (options?: RefetchOptions) => Promise<any>;
    }
  | undefined;
