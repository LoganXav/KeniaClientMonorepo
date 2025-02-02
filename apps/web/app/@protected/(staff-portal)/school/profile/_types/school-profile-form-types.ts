import { z } from "zod";
import { SchoolProfileFormPersonalSchema } from "../_schema/school-profile-form-schema";
import { SchoolProfileFormResidentialSchema } from "../_schema/school-profile-form-schema";
import { SchoolProfileFormSchoolSchema } from "../_schema/school-profile-form-schema";
import { UseFormReturn } from "react-hook-form";

export type SchoolProfileFormPersonalSchemaType = z.infer<typeof SchoolProfileFormPersonalSchema>;
export type SchoolProfileFormResidentialSchemaType = z.infer<typeof SchoolProfileFormResidentialSchema>;
export type SchoolProfileFormSchoolSchemaType = z.infer<typeof SchoolProfileFormSchoolSchema>;

export type SchoolProfileFormSchemaType = SchoolProfileFormPersonalSchemaType & SchoolProfileFormResidentialSchemaType & SchoolProfileFormSchoolSchemaType;
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
