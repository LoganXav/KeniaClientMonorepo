"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import useDataRef from "@/hooks/use-data-ref";
import { TermType, BreakWeekType } from "@/types";
import { useAuthUser } from "@/hooks/use-auth-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleMinus, CirclePlus } from "lucide-react";
import { LoadingContent } from "@/components/loading-content";
import { RouteEnums } from "@/constants/router/route-constants";
import { SchoolCalendarFormSchema } from "../_schema/school-calendar-form-schema";
import { SchoolCalendarFormSchemaType } from "../_types/school-calendar-form-types";
import { useCalendarMutation, useGetSingleCalendarQuery, useGetCalendarTemplateQuery } from "@/apis/core-calendar-api/calendar";
import { Form, FormField, FormItem, FormControl, Input, toast, Card, CardTitle, Button, Typography, DatePicker, SelectItem, SelectContent, SelectValue, SelectTrigger, Select, FormMessage } from "@repo/ui";

export default function SchoolCalendarForm() {
  const router = useRouter();
  const { authUserIds } = useAuthUser();

  const { calendarMutate, calendarMutatePending, calendarMutateError } = useCalendarMutation({ params: { tenantId: authUserIds?.tenantId } });

  const handleMutateSchoolCalendar = () => {
    const values = form.getValues();

    const filteredTerms = values.terms.map((term: TermType) => {
      return {
        ...term,
        startDate: new Date(term.startDate),
        endDate: new Date(term.endDate),
        breakWeeks: term.breakWeeks.map((breakWeek: BreakWeekType) => {
          return {
            ...breakWeek,
            startDate: new Date(breakWeek.startDate),
            endDate: new Date(breakWeek.endDate),
          };
        }),
      };
    });

    calendarMutate(
      { payload: { ...values, year: Number(values.year), terms: filteredTerms } },
      {
        onSuccess: (result) => {
          toast.success(result.message);
          router.push(RouteEnums.SCHOOL_CALENDAR);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  const defaultValues = {
    tenantId: authUserIds?.tenantId,
    year: "",
    terms: [
      {
        name: "",
        startDate: "",
        endDate: "",
        breakWeeks: [
          {
            name: "",
            startDate: "",
            endDate: "",
          },
        ],
      },
    ],
  };

  const form = useForm<SchoolCalendarFormSchemaType>({
    resolver: zodResolver(SchoolCalendarFormSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const dataRef = useDataRef({ form });

  const selectedCalendarYear = form.watch("year");

  const schoolCalendarQueryResult = useGetSingleCalendarQuery(
    React.useMemo(
      () => ({
        params: {
          tenantId: authUserIds?.tenantId,
          year: Number(selectedCalendarYear),
        },
      }),
      [authUserIds?.tenantId, selectedCalendarYear]
    )
  );
  const schoolCalendar = schoolCalendarQueryResult?.data?.data;

  const schoolCalendarTemplateQueryResult = useGetCalendarTemplateQuery({ params: { tenantId: authUserIds?.tenantId } });
  const schoolCalendarTemplate = schoolCalendarTemplateQueryResult?.data?.data;

  // Reset form values if editing an existing school calendar
  React.useEffect(() => {
    if (schoolCalendar) {
      dataRef.current.form.reset((values: SchoolCalendarFormSchemaType) => ({
        ...values,
        year: Number(schoolCalendar?.year) || values.year,
        terms: schoolCalendar?.terms || [],
      }));
    } else {
      form.reset((values: SchoolCalendarFormSchemaType) => ({
        ...values,
        year: values.year,
        terms: [
          {
            name: "",
            startDate: "",
            endDate: "",
            breakWeeks: [
              {
                name: "",
                startDate: "",
                endDate: "",
              },
            ],
          },
        ],
      }));
    }
  }, [schoolCalendar, schoolCalendar?.year, schoolCalendar?.terms, selectedCalendarYear]);

  return (
    <LoadingContent loading={schoolCalendarQueryResult?.isLoading} error={schoolCalendarQueryResult?.error} retry={schoolCalendarQueryResult?.refetch} data={schoolCalendarQueryResult?.data} shouldLoad={false}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleMutateSchoolCalendar)}>
          <div className="space-y-4 mb-8">
            <div className="flex w-full">
              <div className="hidden md:flex md:flex-1" />
              <div className="grid md:grid-cols-2 gap-4 w-full md:w-auto">
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} value={String(field.value)}>
                        <FormControl>
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder="Select Session" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {schoolCalendarTemplate?.schoolSessionOptions?.map((item, idx: number) => (
                            <SelectItem key={idx} value={String(item.year)}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  className="w-full md:w-auto"
                  type="button"
                  onClick={() =>
                    form.setValue("terms", [
                      ...form.watch("terms"),
                      {
                        name: "",
                        startDate: "",
                        endDate: "",
                        breakWeeks: [
                          {
                            name: "",
                            startDate: "",
                            endDate: "",
                          },
                        ],
                      },
                    ])
                  }
                >
                  Add Another Term <CirclePlus size={18} strokeWidth={1} />
                </Button>
              </div>
            </div>

            {form.watch("year") &&
              form.watch("terms")?.length > 0 &&
              form.watch("terms").map((term: Record<string, any>, idx: number) => (
                <Card key={idx} className="p-4 relative">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <CardTitle className="font-heading">Term {idx + 1}</CardTitle>
                    <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                      <Button
                        className="w-full md:w-auto"
                        type="button"
                        variant="outline"
                        onClick={() =>
                          form.setValue(`terms.${idx}.breakWeeks`, [
                            ...form.watch(`terms.${idx}.breakWeeks`),
                            {
                              name: "",
                              startDate: "",
                              endDate: "",
                            },
                          ])
                        }
                      >
                        Add Break Period <CirclePlus size={18} strokeWidth={1} />
                      </Button>

                      <Button
                        variant="outline"
                        type="button"
                        className=""
                        onClick={() =>
                          form.setValue(
                            "terms",
                            form.watch("terms").filter((_: any, i: number) => i !== idx)
                          )
                        }
                      >
                        Remove Term <CircleMinus color="red" size={18} strokeWidth={1} />
                      </Button>
                    </div>
                  </div>
                  <div key={idx} className="grid gap-4 pt-8">
                    <div key={idx} className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name={`terms.${idx}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Term Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`terms.${idx}.startDate`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <DatePicker field={field} placeholder="Start Date" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField control={form.control} name={`terms.${idx}.endDate`} render={({ field }) => <DatePicker field={field} placeholder="End Date" />} />
                    </div>
                    <div className="space-y-4">
                      {term.breakWeeks?.length > 0 &&
                        term.breakWeeks.map((breakWeek: Record<string, any>, breakWeekIdx: number) => (
                          <div key={breakWeekIdx} className="grid space-y-4 relative">
                            <hr className="mt-4" />
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full md:w-auto">
                              <div className="text-center md:text-left">
                                <Typography size="h4" className="font-heading">
                                  Break Period
                                </Typography>
                                <Typography size="p" color={"muted"}>
                                  This is a break period for the term.
                                </Typography>
                              </div>
                              <Button
                                variant="outline"
                                type="button"
                                onClick={() =>
                                  form.setValue(
                                    `terms.${idx}.breakWeeks`,
                                    form.watch(`terms.${idx}.breakWeeks`).filter((_: any, i: number) => i !== breakWeekIdx)
                                  )
                                }
                              >
                                Remove Break Period <CircleMinus color="red" size={18} strokeWidth={1} />
                              </Button>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                              <FormField
                                control={form.control}
                                name={`terms.${idx}.breakWeeks.${breakWeekIdx}.name`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input placeholder="Break Period Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name={`terms.${idx}.breakWeeks.${breakWeekIdx}.startDate`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <DatePicker field={field} placeholder="Start Date" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name={`terms.${idx}.breakWeeks.${breakWeekIdx}.endDate`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <DatePicker field={field} placeholder="End Date" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </Card>
              ))}
          </div>
          <div className="grid md:grid-cols-2 md:max-w-lg gap-4 mx-auto my-12">
            <Button variant={"outline"} type="button" onClick={() => router.push(RouteEnums.SCHOOL_CALENDAR)}>
              Cancel
            </Button>
            <Button loading={calendarMutatePending}>{schoolCalendar ? "Update" : "Save"}</Button>
          </div>
        </form>
      </Form>
    </LoadingContent>
  );
}
