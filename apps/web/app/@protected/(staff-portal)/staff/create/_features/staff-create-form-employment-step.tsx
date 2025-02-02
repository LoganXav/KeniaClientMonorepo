"use client";

import React from "react";
import { StaffCreateFormReturn, StaffTemplateOptions } from "../_types/staff-create-form-types";
import { FormControl, FormField, FormItem, FormMessage, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui";

type StepProps = {
  form: StaffCreateFormReturn;
  staffTemplateQuery?: StaffTemplateOptions;
};

export function StaffCreateFormEmploymentStep({ form, staffTemplateQuery }: StepProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="jobTitle"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="Job Title" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="highestLevelEdu"
        render={({ field }) => (
          <FormItem>
            <Select value={String(field.value || "")} onValueChange={field.onChange} disabled={staffTemplateQuery?.isLoading}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Highest Level of Education" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {staffTemplateQuery?.data?.data?.educationLevelOptions?.map((level, idx) => (
                  <SelectItem key={idx} value={String(level)}>
                    {level}
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
        name="tin"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="TIN" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="employmentType"
        render={({ field }) => (
          <FormItem>
            <Select value={String(field.value || "")} onValueChange={field.onChange} disabled={staffTemplateQuery?.isLoading}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Employment Type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {staffTemplateQuery?.data?.data?.employmentTypeOptions?.map((type, idx) => (
                  <SelectItem key={idx} value={String(type)}>
                    {type}
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
        name="startDate"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="Start Date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="cvUrl"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="CV" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
