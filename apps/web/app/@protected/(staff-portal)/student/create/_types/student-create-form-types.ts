import { z } from "zod";
import { UseFormReturn } from "react-hook-form";
import { RefetchOptions } from "@tanstack/react-query";
import { GetRequestReturnType } from "@/config/base-query";
import { StudentCreateFormSchema } from "../_schema/student-create-form-schema";
import { CalendarType, ClassDivisionType, ClassType, StudentType, SubjectType } from "@/types";

export type StudentCreateFormSchemaType = z.infer<typeof StudentCreateFormSchema>;

export type StudentCreateFormFieldName = keyof StudentCreateFormSchemaType;

export type StudentCreateFormReturn = UseFormReturn<StudentCreateFormSchemaType, any, undefined>;

export type StudentTemplateOptions = {
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
  classOptions: ClassType[];
  classDivisionOptions: ClassDivisionType[];
  religionOptions: string[];
  genderOptions: string[];
  bloodGroupOptions: string[];
  subjectOptions: SubjectType[];
  calendarOptions: CalendarType[];
  studentOptions: StudentType[];
};

export type StudentTemplateQueryResultType =
  | {
      data: GetRequestReturnType<StudentTemplateOptions> | undefined;
      isLoading: boolean;
      error: Error | null;
      refetch: (options?: RefetchOptions) => Promise<any>;
    }
  | undefined;

export type StudentBulkCreateType = {
  students: StudentBulkType[];
};

export type StudentBulkType = {
  firstName: string;
  lastName: string;
  gender: string;
  classId: number;
  classDivisionId: number;
  class: string;
  classDivision: string;
};
