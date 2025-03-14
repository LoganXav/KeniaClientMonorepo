"use client";

import React from "react";
import { StudentCreateFormReturn, StudentTemplateOptions } from "../_types/student-create-form-types";
import { DatePicker, FormControl, FormField, FormItem, FormMessage, Input, SelectValue, SelectTrigger, SelectItem, SelectContent, Select, MultiSelect } from "@repo/ui";

type StepProps = {
  form: StudentCreateFormReturn;
  isEdit: boolean;
  studentTemplateQuery: StudentTemplateOptions;
};

export function StudentCreateFormAdmissionStep({ form, isEdit, studentTemplateQuery }: StepProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <FormField
        control={form.control}
        name="classId"
        render={({ field }) => (
          <FormItem>
            <Select value={String(field.value || "")} onValueChange={field.onChange} disabled={studentTemplateQuery?.isLoading}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Admission Class" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {studentTemplateQuery?.data?.data?.classOptions?.map((classOption, idx) => (
                  <SelectItem key={idx} value={String(classOption?.id)}>
                    {classOption?.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="classDivisionId"
        render={({ field }) => (
          <FormItem>
            <Select value={String(field.value || "")} onValueChange={field.onChange} disabled={studentTemplateQuery?.isLoading || !form.watch("classId")}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Admission Class Division" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {studentTemplateQuery?.data?.data?.classDivisionOptions?.map((classDivisionOption, idx) => (
                  <SelectItem key={idx} value={String(classDivisionOption?.id)}>
                    {classDivisionOption?.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={"subjectIds"}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              {/* <MultiSelect selected={Array.isArray(field.value) ? field.value : []} setSelected={field.onChange} options={studentTemplateQuery?.data?.data?.subjectOptions || []} placeholder="Select Subjects" /> */}
              <MultiSelect selected={Array.isArray(field.value) ? field.value : []} onChange={field.onChange} options={studentTemplateQuery?.data?.data?.subjectOptions || []} placeholder="Select Subjects" searchPlaceholder="Search Subjects" emptyMessage="No subjects found" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
