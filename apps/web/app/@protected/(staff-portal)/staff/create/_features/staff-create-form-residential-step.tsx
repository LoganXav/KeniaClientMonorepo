"use client";

import React from "react";
import { StaffCreateFormReturn, StaffTemplateOptions } from "../_types/staff-create-form-types";
import { FormControl, FormField, FormItem, FormMessage, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui";

type StepProps = {
  form: StaffCreateFormReturn;
  staffTemplateQuery: StaffTemplateOptions;
};

export function StaffCreateFormResidentialStep({ form, staffTemplateQuery }: StepProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="md:col-span-2">
        <FormField
          control={form.control}
          name="residentialAddress"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="residentialCountryId"
        render={({ field }) => (
          <FormItem>
            <Select onValueChange={field.onChange} value={String(field.value)}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {staffTemplateQuery?.data?.data?.countryIdOptions?.map((country, idx) => (
                  <SelectItem key={idx} value={String(country?.id)}>
                    {country?.name}
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
        name="residentialStateId"
        render={({ field }) => (
          <FormItem>
            <Select value={String(field.value || "")} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="State" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {staffTemplateQuery?.data?.data?.stateIdOptions?.map((state, idx) => (
                  <SelectItem key={idx} value={String(state?.id)}>
                    {state?.name}
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
        name="residentialLgaId"
        render={({ field }) => (
          <FormItem>
            <Select value={String(field.value || "")} onValueChange={field.onChange} disabled={staffTemplateQuery?.isLoading || !staffTemplateQuery?.data?.data?.lgaIdOptions?.length}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Local Government" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {staffTemplateQuery?.data?.data?.lgaIdOptions?.map((lga, idx) => (
                  <SelectItem key={idx} value={String(lga?.id)}>
                    {lga?.name}
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
        name="residentialZipCode"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="Zip Code" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
