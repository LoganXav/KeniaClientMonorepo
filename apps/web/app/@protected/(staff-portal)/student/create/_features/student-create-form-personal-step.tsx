"use client";

import React from "react";
import { StudentCreateFormReturn, StudentTemplateOptions } from "../_types/student-create-form-types";
import { DatePicker, FormControl, FormField, FormItem, FormMessage, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui";

type StepProps = {
  form: StudentCreateFormReturn;
  isEdit: boolean;
  studentTemplateQuery: StudentTemplateOptions;
};

export function StudentCreateFormPersonalStep({ form, isEdit, studentTemplateQuery }: StepProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="First Name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="lastName"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="Last Name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="Phone Number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="Email Address" disabled={isEdit} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="gender"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Select onValueChange={field.onChange} value={String(field.value) || ""}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {studentTemplateQuery?.data?.data?.genderOptions?.map((gender, idx) => (
                    <SelectItem key={idx} value={String(gender)}>
                      {gender}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="dateOfBirth"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <DatePicker field={field} placeholder="Date of Birth" />
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="religion"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <Select onValueChange={field.onChange} value={String(field.value || "")}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Religion" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {studentTemplateQuery?.data?.data?.religionOptions?.map((religion, idx) => (
                  <SelectItem key={idx} value={String(religion)}>
                    {religion}
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
        name="bloodGroup"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <Select onValueChange={field.onChange} value={String(field.value || "")}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Blood Group" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {studentTemplateQuery?.data?.data?.bloodGroupOptions?.map((bloodGroup, idx) => (
                  <SelectItem key={idx} value={String(bloodGroup)}>
                    {bloodGroup}
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
