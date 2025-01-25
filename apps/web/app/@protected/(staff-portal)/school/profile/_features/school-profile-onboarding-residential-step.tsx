import React from "react";
import { FormControl, FormField, FormItem, FormMessage, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, toast } from "@repo/ui";
import { SchoolProfileFormReturn } from "../_types/school-profile-form-types";
import { useGetOnboardingTemplateQuery } from "@/apis/core-onboarding-api/onboarding";

type StepProps = {
  form: SchoolProfileFormReturn;
};

export function SchoolProfileOnboardingResidentialStep({ form }: StepProps) {
  const residentialStateId = form.watch("residentialStateId");
  const onboardingTemplateQuery = useGetOnboardingTemplateQuery({ codeValue: residentialStateId });

  return (
    <div className="grid md:grid-cols-2 gap-4">
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
      <FormField
        control={form.control}
        name="residentialCountryId"
        render={({ field }) => (
          <FormItem>
            <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Country">{onboardingTemplateQuery?.data?.data?.countryIdOptions?.find((country) => String(country?.codeValue) === String(field.value))?.name || "Country"}</SelectValue>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {onboardingTemplateQuery?.data?.data?.countryIdOptions?.map((country, idx) => (
                  <SelectItem key={idx} value={String(country?.codeValue)}>
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
            <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="State">{onboardingTemplateQuery?.data?.data?.stateIdOptions?.find((state) => String(state?.codeValue) === String(field.value))?.name || "State"}</SelectValue>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {onboardingTemplateQuery?.data?.data?.stateIdOptions?.map((state, idx) => (
                  <SelectItem key={idx} value={String(state?.codeValue)}>
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
            <Select
              onValueChange={field.onChange}
              value={String(field.value || "")} // Use `value` instead of `defaultValue` for proper reactivity
              disabled={onboardingTemplateQuery?.isLoading || !onboardingTemplateQuery?.data?.data?.lgaIdOptions?.length}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Local Government">{onboardingTemplateQuery?.data?.data?.lgaIdOptions?.find((lga) => String(lga?.codeValue) === String(field.value))?.name || "Local Government"}</SelectValue>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {onboardingTemplateQuery?.data?.data?.lgaIdOptions?.map((lga, idx) => (
                  <SelectItem key={lga?.codeValue} value={String(lga?.codeValue)}>
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
