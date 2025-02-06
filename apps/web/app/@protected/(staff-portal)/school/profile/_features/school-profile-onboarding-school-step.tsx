import React from "react";
import { DatePicker, FormControl, FormField, FormItem, FormMessage, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui";
import { SchoolProfileFormReturn } from "../_types/school-profile-form-types";
import { useGetOnboardingTemplateQuery } from "@/apis/core-onboarding-api/onboarding";
import { FileUpload } from "@/components/file-upload";

type StepProps = {
  form: SchoolProfileFormReturn;
};

export function SchoolProfileOnboardingSchoolStep({ form }: StepProps) {
  const SchoolStateId = form.watch("stateId");
  const onboardingTemplateQuery = useGetOnboardingTemplateQuery(
    React.useMemo(
      () => ({
        codeValue: Number(SchoolStateId),
      }),
      [SchoolStateId]
    )
  );
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="md:col-span-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="School Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="registrationNo"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="School Registration Number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="contactEmail"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="School Email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="contactPhone"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="School Phone Number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="establishedDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <DatePicker field={field} placeholder="School Established Date" />
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="md:col-span-2">
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="School Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="logoUrl"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormControl>
              <FileUpload field={field} placeholder="Upload School Logo" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="hidden md:block" />

      <FormField
        control={form.control}
        name="countryId"
        render={({ field }) => (
          <FormItem>
            <Select onValueChange={field.onChange} value={String(field.value)}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Country" />
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
        name="stateId"
        render={({ field }) => (
          <FormItem>
            <Select value={String(field.value || "")} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="State" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {onboardingTemplateQuery?.data?.data?.stateIdOptions?.map((state, idx) => (
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
        name="lgaId"
        render={({ field }) => (
          <FormItem>
            <Select value={String(field.value || "")} onValueChange={field.onChange} disabled={onboardingTemplateQuery?.isLoading || !onboardingTemplateQuery?.data?.data?.lgaIdOptions?.length}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Local Government" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {onboardingTemplateQuery?.data?.data?.lgaIdOptions?.map((lga, idx) => (
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
        name="zipCode"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="Zip Code" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="postalCode"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="Postal Code" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
