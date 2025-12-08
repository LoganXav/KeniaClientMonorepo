import { z } from "zod";
import { SchoolProfileFormSchema } from "../_schema/school-profile-form-schema";
import { UseFormReturn } from "react-hook-form";

export type SchoolProfileFormSchemaType = z.infer<typeof SchoolProfileFormSchema>;

export type SchoolProfileFormFieldName = keyof SchoolProfileFormSchemaType;

export type SchoolProfileFormReturn = UseFormReturn<SchoolProfileFormSchemaType, any, undefined>;

export type SchoolProfileFormTemplateType = {
  countryIdOptions: {
    id: number;
    codeValue: number;
    name: string;
    acronym: string;
  }[];
  stateIdOptions: {
    id: number;
    codeValue: number;
    name: string;
  }[];
  lgaIdOptions: {
    id: number;
    codeValue: number;
    name: string;
  }[];
};
