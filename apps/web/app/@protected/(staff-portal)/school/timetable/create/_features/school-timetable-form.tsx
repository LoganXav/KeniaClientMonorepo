"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SchoolTimetableFormSchema } from "../_schema/school-timetable-form-schema";
import { SchoolTimetableFormSchemaType, SchoolTimetableTemplateOptions } from "../_types/school-timetable-form-types";
import { useAuthUser } from "@/hooks/use-auth-user";
import useDataRef from "@/hooks/use-data-ref";
import { useTimetableMutation, useGetTimetableQuery, useGetTimetableTemplateQuery, useGetSingleTimetableQuery } from "@/apis/core-timetable-api/timetable";
import React from "react";
import { Form, FormField, FormItem, FormControl, Input, toast, Card, CardTitle, Button, Typography, DatePicker, SelectItem, SelectContent, SelectValue, SelectTrigger, Select, FormMessage, Checkbox, FormLabel } from "@repo/ui";
import { LoadingContent } from "@/components/loading-content";
import { CircleMinus, CirclePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { RouteEnums } from "@/constants/router/route-constants";

export default function SchoolTimetableForm() {
  const router = useRouter();
  const { authUserIds } = useAuthUser();

  const { timetableMutate, timetableMutatePending, timetableMutateError } = useTimetableMutation();

  const handleMutateTimetable = () => {
    const values = form.getValues();

    // Filter periods to include only the necessary fields
    const filteredPeriods = values.periods.map((period) => {
      if (period.isBreak) {
        // If it's a break, remove subjectId
        const { subjectId, ...rest } = period;
        return rest;
      } else {
        // If it's not a break, remove breakType
        const { breakType, ...rest } = period;
        rest.subjectId = Number(rest.subjectId);
        return rest;
      }
    });

    // Update the payload with filtered periods
    const payload = {
      ...values,
      id: Number(values.id),
      classDivisionId: Number(values.classDivisionId),
      periods: filteredPeriods,
    };

    timetableMutate(
      { payload: { ...values, id: Number(values.id), classDivisionId: Number(values.classDivisionId), periods: filteredPeriods } },
      {
        onSuccess: (result) => {
          toast.success(result.message);
          // router.push(RouteEnums.SCHOOL_TIMETABLE);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  const defaultValues = {
    tenantId: authUserIds?.tenantId,
    id: 0,
    day: "",
    periods: [
      {
        startTime: "",
        endTime: "",
        subjectId: 0,
        isBreak: false,
        breakType: "",
      },
    ],
    classId: 0,
    classDivisionId: 0,
  };

  const form = useForm<SchoolTimetableFormSchemaType>({
    resolver: zodResolver(SchoolTimetableFormSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const classDivisionId = form.watch("classDivisionId");
  const day = form.watch("day");

  const timetableQueryResult = useGetSingleTimetableQuery(React.useMemo(() => ({ classDivisionId, day }), [classDivisionId, day]));
  const timetable = timetableQueryResult?.data?.data;

  const classId = form.watch("classId");
  const timetableTemplateQueryResult = useGetTimetableTemplateQuery(React.useMemo(() => ({ classId }), [classId])) as SchoolTimetableTemplateOptions;
  const timetableTemplate = timetableTemplateQueryResult?.data?.data;

  const dataRef = useDataRef({ form });

  // Reset form values if editing an existing timetable
  React.useEffect(() => {
    // if (timetable) {
    dataRef.current.form.reset((values: SchoolTimetableFormSchemaType) => ({
      ...values,
      id: Number(timetable?.id) || values.id,
      day: timetable?.day || values.day,
      periods:
        timetable?.periods?.map((period: Record<string, any>) => ({
          ...period,
          subjectId: Number(period?.subjectId),
          startTime: period?.startTime,
          endTime: period?.endTime,
          isBreak: period?.isBreak,
          breakType: period?.breakType,
        })) || values.periods,
      classDivisionId: Number(timetable?.classDivisionId) || values.classDivisionId,
    }));
    // }
  }, [timetable]);

  return (
    <LoadingContent loading={timetableQueryResult?.isLoading} error={timetableQueryResult?.error} retry={timetableQueryResult?.refetch} data={timetableQueryResult?.data} shouldLoad={false}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleMutateTimetable)} className="space-y-4 mb-8">
          <>
            <div className="flex w-full md:justify-between flex-col md:flex-row gap-4">
              <div className="w-full md:w-40">
                <FormField
                  control={form.control}
                  name="day"
                  render={({ field }) => (
                    <FormItem>
                      <Select value={String(field.value || "")} onValueChange={field.onChange} disabled={timetableTemplateQueryResult?.isLoading}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Day" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {timetableTemplate?.dayOptions?.map((dayOption, idx) => (
                            <SelectItem key={idx} value={String(dayOption)}>
                              {dayOption}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid md:grid-cols-3 gap-4 w-full md:w-auto">
                <FormField
                  control={form.control}
                  name="classId"
                  render={({ field }) => (
                    <FormItem>
                      <Select value={String(field.value || "")} onValueChange={field.onChange} disabled={timetableTemplateQueryResult?.isLoading}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Admission Class" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {timetableTemplate?.classOptions?.map((classOption, idx) => (
                            <SelectItem key={idx} value={String(classOption?.id)}>
                              {classOption?.name}
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
                  name="classDivisionId"
                  render={({ field }) => (
                    <FormItem>
                      <Select value={String(field.value || "")} onValueChange={field.onChange} disabled={timetableTemplateQueryResult?.isLoading || !form.watch("classId")}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Admission Class Division" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {timetableTemplate?.classDivisionOptions?.map((classDivisionOption, idx) => (
                            <SelectItem key={idx} value={String(classDivisionOption?.id)}>
                              {classDivisionOption?.name}
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
                    form.setValue("periods", [
                      ...form.watch("periods"),
                      {
                        startTime: "",
                        endTime: "",
                        subjectId: 0,
                        isBreak: false,
                        breakType: "",
                      },
                    ])
                  }
                >
                  Add Another Period <CirclePlus size={18} strokeWidth={1} />
                </Button>
              </div>
            </div>

            {form.watch("periods")?.length > 0 &&
              form.watch("periods").map((period: Record<string, any>, idx: number) => (
                <Card key={idx} className="p-4 relative">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <CardTitle className="font-heading">Period {idx + 1}</CardTitle>
                    <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                      <Button
                        variant="outline"
                        type="button"
                        className=""
                        onClick={() =>
                          form.setValue(
                            "periods",
                            form.watch("periods").filter((_: any, i: number) => i !== idx)
                          )
                        }
                      >
                        Remove Period <CircleMinus color="red" size={18} strokeWidth={1} />
                      </Button>
                    </div>
                  </div>
                  <div key={idx} className="grid gap-4 pt-8">
                    <div key={idx} className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name={`periods.${idx}.isBreak`}
                        render={({ field }) => (
                          <FormItem className="flex items-center gap-2">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormLabel className="pb-1">Is Break Period</FormLabel>
                          </FormItem>
                        )}
                      />

                      {!form.watch(`periods.${idx}.isBreak`) && (
                        <FormField
                          control={form.control}
                          name={`periods.${idx}.subjectId`}
                          render={({ field }) => (
                            <FormItem>
                              <Select value={String(field.value || "")} onValueChange={field.onChange} disabled={timetableTemplateQueryResult?.isLoading || !form.watch("classId")}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Subject" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {timetableTemplate?.subjectOptions?.map((subjectOption, idx) => (
                                    <SelectItem key={idx} value={String(subjectOption?.id)}>
                                      {subjectOption?.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      {form.watch(`periods.${idx}.isBreak`) && (
                        <FormField
                          control={form.control}
                          name={`periods.${idx}.breakType`}
                          render={({ field }) => (
                            <FormItem>
                              <Select value={String(field.value || "")} onValueChange={field.onChange} disabled={timetableTemplateQueryResult?.isLoading}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Break Type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {timetableTemplate?.breakTypeOptions?.map((breakTypeOption, idx) => (
                                    <SelectItem key={idx} value={String(breakTypeOption)}>
                                      {breakTypeOption}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      <FormField
                        control={form.control}
                        name={`periods.${idx}.startTime`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Start Time" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`periods.${idx}.endTime`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="End Time" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </Card>
              ))}
          </>
        </form>
      </Form>

      <div className="grid md:grid-cols-2 md:max-w-lg gap-4 mx-auto my-12">
        <Button variant={"outline"} type="button" onClick={() => router.push(RouteEnums.SCHOOL_TIMETABLE)}>
          Cancel
        </Button>
        <Button type="button" onClick={handleMutateTimetable} loading={timetableMutatePending}>
          Save
        </Button>
      </div>
    </LoadingContent>
  );
}
