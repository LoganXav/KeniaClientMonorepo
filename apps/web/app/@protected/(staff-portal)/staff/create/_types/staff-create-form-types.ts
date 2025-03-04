import { z } from "zod";
import { StaffCreateFormSchema } from "../_schema/staff-create-form-schema";
import { UseFormReturn } from "react-hook-form";
import { GetRequestReturnType } from "@/config/base-query";
import { RefetchOptions } from "@tanstack/react-query";

export type StaffCreateFormSchemaType = z.infer<typeof StaffCreateFormSchema>;

export type StaffCreateFormFieldName = keyof StaffCreateFormSchemaType;

export type StaffCreateFormReturn = UseFormReturn<StaffCreateFormSchemaType, any, undefined>;

export type StaffTemplateOptions =
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
            subjectOptions: { id: number; name: string }[];
          }>
        | undefined;
      isLoading: boolean;
      error: Error | null;
      refetch: (options?: RefetchOptions) => Promise<any>;
    }
  | undefined;
