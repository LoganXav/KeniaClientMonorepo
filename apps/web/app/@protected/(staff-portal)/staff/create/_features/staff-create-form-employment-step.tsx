"use client";

import React from "react";
import { StaffCreateFormReturn, StaffTemplateOptions } from "../_types/staff-create-form-types";
import { DatePicker, FormControl, FormField, FormItem, FormMessage, Input, Label, MultiSelect, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui";
import { FileUpload } from "@/components/file-upload";

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
          <FormItem className="flex flex-col">
            <DatePicker field={field} placeholder="Resumption Date" />
            <FormMessage />
          </FormItem>
        )}
      />
      {/* <div className="hidden md:block" /> */}
      <div className="grid gap-4 col-span-2">
        <FormField
          control={form.control}
          name="cvFile"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormControl>
                <FileUpload field={field} placeholder="Upload CV" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-2">
          <FormField
            control={form.control}
            name={"subjectIds"}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  {/* <MultiSelect selected={Array.isArray(field.value) ? field.value : []} setSelected={field.onChange} options={studentTemplateQuery?.data?.data?.subjectOptions || []} placeholder="Select Subjects" /> */}
                  <MultiSelect selected={Array.isArray(field.value) ? field.value : []} onChange={field.onChange} options={staffTemplateQuery?.data?.data?.subjectOptions || []} placeholder="Select Subjects" searchPlaceholder="Search Subjects" emptyMessage="No subjects found" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Label className="text-sm text-muted-foreground">Choose subjects for this staff. A staff can teach one or more subjects</Label>
        </div>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name={"classIds"}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  {/* <MultiSelect selected={Array.isArray(field.value) ? field.value : []} setSelected={field.onChange} options={studentTemplateQuery?.data?.data?.subjectOptions || []} placeholder="Select Subjects" /> */}
                  <MultiSelect selected={Array.isArray(field.value) ? field.value : []} onChange={field.onChange} options={staffTemplateQuery?.data?.data?.classOptions || []} placeholder="Select Classes" searchPlaceholder="Search Classes" emptyMessage="No classes found" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Label className="text-sm text-muted-foreground">Choose classes for this staff. A staff can be the class teacher of one or more classes</Label>
        </div>
      </div>
    </div>
  );
}
