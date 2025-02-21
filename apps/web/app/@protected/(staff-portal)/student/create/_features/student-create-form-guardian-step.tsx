"use client";

import React from "react";
import { StudentCreateFormReturn, StudentTemplateOptions } from "../_types/student-create-form-types";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, DatePicker, FormControl, FormField, FormItem, FormMessage, Input, SelectValue, Select, SelectTrigger, SelectContent, SelectItem, cn, Button, FormLabel, Popover, PopoverTrigger, PopoverContent } from "@repo/ui";
import { Check, CircleMinus, CirclePlus, UserRoundSearch } from "lucide-react";
import { useGetGuardianListQuery } from "@/apis/core-guardian-api/guardian";
import { debounce } from "@/lib/utils";
import { useGetStudentTemplateQuery } from "@/apis/core-student-api/student";

type StepProps = {
  form: StudentCreateFormReturn;
  isEdit: boolean;
  studentTemplateQuery: StudentTemplateOptions;
};

export function StudentCreateFormGuardianStep({ form, isEdit, studentTemplateQuery }: StepProps) {
  const [searchBy, setSearchBy] = React.useState<"" | "firstName" | "lastName" | "email" | "phoneNumber">("");
  const [query, setQuery] = React.useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = React.useState<string>("...");

  const handleSearchByChange = (value: "firstName" | "lastName" | "email" | "phoneNumber") => {
    setSearchBy(value);
  };

  const debouncedSetQuery = React.useCallback(
    debounce((value: string) => {
      setDebouncedQuery(value);
    }, 1000),
    []
  );

  const handleQueryChange = (value: string) => {
    setQuery(value);
    debouncedSetQuery(value);
  };

  const guardianListQueryResult = useGetGuardianListQuery(
    React.useMemo<Partial<Record<"firstName" | "lastName" | "email" | "phoneNumber", string>>>(
      () => ({
        [searchBy]: debouncedQuery,
      }),
      [searchBy, debouncedQuery]
    )
  );

  const searchByOptions = [
    { label: "First Name", value: "firstName" },
    { label: "Last Name", value: "lastName" },
    { label: "Email Address", value: "email" },
    { label: "Phone Number", value: "phoneNumber" },
  ];

  return (
    <>
      <div className="flex w-full">
        <div className="hidden md:flex md:flex-1" />
        <Button
          className="w-full md:w-auto"
          type="button"
          onClick={() =>
            form.setValue("guardians", [
              ...form.watch("guardians"),
              {
                firstName: "",
                lastName: "",
                phoneNumber: "",
                dateOfBirth: "",
                email: "",
                residentialCountryId: "",
                residentialStateId: "",
                residentialLgaId: "",
                residentialZipCode: "",
                residentialAddress: "",
                id: "",
                gender: "",
              },
            ])
          }
        >
          Add Another Guardian <CirclePlus size={18} strokeWidth={1} />
        </Button>
      </div>

      {form.watch("guardians")?.length > 0 &&
        form.watch("guardians").map((guardian, idx) => (
          <div key={idx} className="grid gap-4 md:grid-cols-2 relative pt-12">
            <div className="grid grid-cols-3 gap-2">
              <Select onValueChange={handleSearchByChange} value={searchBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Search By" />
                </SelectTrigger>
                <SelectContent>
                  {searchByOptions.map((property, idx) => (
                    <SelectItem key={idx} value={String(property.value)}>
                      {property.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name={`guardians.${idx}.id`}
                  render={({ field }) => (
                    <FormItem>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant="input" size="input" role="combobox" className={cn("w-full justify-between", !field.value && "text-muted-foreground")}>
                              {field.value
                                ? guardianListQueryResult?.data?.data?.find((guardian: { id: string; firstName: string; lastName: string }) => guardian.id === field.value)?.firstName +
                                  " " +
                                  guardianListQueryResult.data?.data.find((guardian: { id: string; firstName: string; lastName: string }) => guardian.id === field.value)?.lastName
                                : "Select an existing guardian"}
                              <UserRoundSearch className="h-4 w-4 text-muted-foreground" strokeWidth={1} />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="min-w-36 p-0">
                          <Command shouldFilter={false}>
                            <CommandInput placeholder={`Search by ${searchByOptions.find((option) => option.value === searchBy)?.label}...`} className="h-9" value={query} onValueChange={handleQueryChange} />
                            <CommandList>
                              <CommandEmpty>No Guardian found.</CommandEmpty>
                              <CommandGroup>
                                {guardianListQueryResult?.data?.data?.map((guardian: { id: string; firstName: string; lastName: string }) => (
                                  <CommandItem
                                    value={guardian.id}
                                    key={guardian.id}
                                    onSelect={() => {
                                      form.setValue(`guardians.${idx}.id`, guardian.id);
                                    }}
                                  >
                                    {guardian.firstName} {guardian.lastName}
                                    <Check className={cn("ml-auto", guardian.id === field.value ? "opacity-100" : "opacity-0")} />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="hiddem md:flex" />
            <FormField
              control={form.control}
              name={`guardians.${idx}.firstName`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Guardian First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`guardians.${idx}.lastName`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Guardian Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`guardians.${idx}.phoneNumber`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Guardian Phone Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`guardians.${idx}.email`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Guardian Email Address" disabled={isEdit} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`guardians.${idx}.gender`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Guardian Gender" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`guardians.${idx}.dateOfBirth`}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <DatePicker field={field} placeholder="Guardian Date of Birth" />
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name={`guardians.${idx}.residentialAddress`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Guardian Residential Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name={`guardians.${idx}.residentialCountryId`}
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={String(field.value)}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Guardian Residential Country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {studentTemplateQuery?.data?.data?.countryIdOptions?.map((country, idx) => (
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
              name={`guardians.${idx}.residentialStateId`}
              render={({ field }) => (
                <FormItem>
                  <Select
                    value={String(field.value || "")}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Guardian Residential State" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {studentTemplateQuery?.data?.data?.stateIdOptions?.map((state, idx) => (
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

            {/* <FormField
              control={form.control}
              name={`guardians.${idx}.residentialLgaId`}
              render={({ field }) => (
                <FormItem>
                  <Select value={String(field.value || "")} onValueChange={field.onChange} disabled={studentTemplateQuery?.isLoading || !studentTemplateQuery?.data?.data?.lgaIdOptions?.length}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Guardian Residential Local Government" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {studentTemplateQuery?.data?.data?.lgaIdOptions?.map((lga, idx) => (
                        <SelectItem key={idx} value={String(lga?.id)}>
                          {lga?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name={`guardians.${idx}.residentialZipCode`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Guardian Residential Zip Code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              variant="ghost"
              type="button"
              className="absolute right-0 top-0"
              onClick={() =>
                form.setValue(
                  "guardians",
                  form.watch("guardians").filter((_, i) => i !== idx)
                )
              }
            >
              <CircleMinus color="red" size={18} strokeWidth={1} />
            </Button>
          </div>
        ))}
    </>
  );
}
