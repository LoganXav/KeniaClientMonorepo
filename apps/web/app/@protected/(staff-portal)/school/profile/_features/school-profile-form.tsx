"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, toast } from "@repo/ui";

import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { SchoolProfileFormSchemaType } from "../_types/school-profile-form-types";
import { SchoolProfileFormSchema } from "../_schema/school-profile-form-schema";
import { useGetTenantQuery, useUpdateTenantProfileMutation } from "@/apis/core-tenant-api/tenant";
import useDataRef from "@/hooks/use-data-ref";
import { LoadingContent } from "@/components/loading-content";
import { useAuthUser } from "@/hooks/use-auth-user";

import { useGetOnboardingTemplateQuery } from "@/apis/core-onboarding-api/onboarding";
import { DatePicker, FormControl, FormField, FormItem, FormMessage, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui";
import { FileUpload } from "@/components/file-upload";

type Props = {};

function SchoolProfileForm({}: Props) {
  const router = useRouter();
  const { authUserIds } = useAuthUser();

  const { updateTenantProfile, updateTenantProfilePending } = useUpdateTenantProfileMutation({ params: { tenantId: authUserIds?.tenantId } });

  const tenantQueryResult = useGetTenantQuery({ params: { tenantId: authUserIds?.tenantId } });
  const tenant = tenantQueryResult?.data?.data;

  const defaultValues = {
    name: "",
    registrationNo: "",
    contactEmail: "",
    contactPhone: "",
    establishedDate: undefined,
    logoUrl: "",
    logoFile: undefined,
    address: "",
    stateId: "",
    lgaId: "",
    zipCode: "",
    countryId: "",
    postalCode: "",
  };

  const form = useForm<SchoolProfileFormSchemaType>({
    resolver: zodResolver(SchoolProfileFormSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const dataRef = useDataRef({ form });

  // Initial Values
  React.useEffect(() => {
    dataRef.current.form.reset((values: SchoolProfileFormSchemaType) => ({
      ...values,
      name: tenant?.name || values.name,
      registrationNo: tenant?.registrationNo || values.registrationNo,
      contactEmail: tenant?.contactEmail || values.contactEmail,
      contactPhone: tenant?.contactPhone || values.contactPhone,
      establishedDate: tenant?.establishedDate || values.establishedDate,
      logoUrl: tenant?.logoUrl || values.logoUrl,
      address: tenant?.address || values.address,
      stateId: Number(tenant?.stateId) || values.stateId,
      lgaId: Number(tenant?.lgaId) || values.lgaId,
      zipCode: Number(tenant?.zipCode) || values.zipCode,
      countryId: Number(tenant?.countryId) || values.countryId,
      postalCode: tenant?.postalCode || values.postalCode,
    }));
  }, [dataRef, tenant]);

  const schoolStateId = form.watch("stateId");

  const onboardingTemplateQuery = useGetOnboardingTemplateQuery(
    React.useMemo(
      () => ({
        params: {
          codeValue: Number(schoolStateId),
          tenantId: authUserIds?.tenantId,
        },
      }),
      [schoolStateId, authUserIds?.tenantId]
    )
  );

  const handleOnboarding = (values: SchoolProfileFormSchemaType) => {
    console.log(values);

    updateTenantProfile(
      {
        payload: { ...values, userId: authUserIds?.id, logoUrl: "", postalCode: String(values.postalCode), zipCode: Number(values.zipCode), stateId: Number(values.stateId), lgaId: Number(values.lgaId), countryId: Number(values.countryId) },
      },
      {
        onSuccess: (result) => {
          toast.success(result.message);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  return (
    <LoadingContent loading={tenantQueryResult?.isLoading} error={tenantQueryResult?.error} retry={tenantQueryResult?.refetch} data={tenantQueryResult?.data}>
      <div className="grid gap-8 w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleOnboarding)} className="">
            <div className="max-w-4xl mx-auto">
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
            </div>

            <div className="grid md:grid-cols-2 md:max-w-lg gap-4 mx-auto my-12">
              <Button variant={"outline"} type="button" onClick={() => router.back()} disabled={updateTenantProfilePending}>
                Cancel
              </Button>
              <Button type="submit" loading={updateTenantProfilePending}>
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </LoadingContent>
  );
}

export default SchoolProfileForm;
