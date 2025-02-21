"use client";

import React from "react";
import { StudentCreateFormReturn, StudentTemplateOptions } from "../_types/student-create-form-types";
import { DatePicker, FormControl, FormField, FormItem, FormMessage, Input, SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@repo/ui";

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
                    {classOption?.type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
