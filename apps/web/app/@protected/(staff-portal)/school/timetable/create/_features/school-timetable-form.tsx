"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import useDataRef from "@/hooks/use-data-ref";
import { useAuthUser } from "@/hooks/use-auth-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingContent } from "@/components/loading-content";
import { RouteEnums } from "@/constants/router/route-constants";
import { CircleMinus, CirclePlus, TimerIcon } from "lucide-react";
import { SchoolTimetableFormSchema } from "../_schema/school-timetable-form-schema";
import { SchoolTimetableFormSchemaType, SchoolTimetableTemplateOptions } from "../_types/school-timetable-form-types";
import { useTimetableMutation, useGetTimetableTemplateQuery, useGetSingleTimetableQuery } from "@/apis/core-timetable-api/timetable";
import { Form, FormField, FormItem, FormControl, toast, Card, CardTitle, Button, SelectItem, SelectContent, SelectValue, SelectTrigger, Select, FormMessage, Checkbox, FormLabel, TimePicker } from "@repo/ui";

export default function SchoolTimetableForm() {
  const router = useRouter();
  const { authUserIds } = useAuthUser();

  const { timetableMutate, timetableMutatePending, timetableMutateError } = useTimetableMutation({ params: { tenantId: authUserIds?.tenantId } });

  const handleMutateTimetable = (values: SchoolTimetableFormSchemaType) => {
    // Filter periods to include only the necessary fields
    const filteredPeriods = values.periods.map((period) => {
      const startTime = new Date(period.startTime);
      const endTime = new Date(period.endTime);

      if (period.isBreak) {
        return {
          startTime,
          endTime,
          isBreak: true,
          breakType: period.breakType?.trim(),
        };
      }

      return {
        startTime,
        endTime,
        subjectId: Number(period.subjectId),
        isBreak: false,
      };
    });

    timetableMutate(
      { payload: { ...values, id: Number(values.id), classDivisionId: Number(values.classDivisionId), periods: filteredPeriods, termId: Number(values.termId) } },
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

  const defaultValues = {
    tenantId: authUserIds?.tenantId,
    id: 0,
    calendarId: "",
    day: "",
    periods: [
      {
        startTime: "",
        endTime: "",
        subjectId: "",
        isBreak: false,
        breakType: "",
      },
    ],
    classId: 0,
    classDivisionId: 0,
    termId: 0,
  };

  const form = useForm<SchoolTimetableFormSchemaType>({
    resolver: zodResolver(SchoolTimetableFormSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const classDivisionId = Number(form.watch("classDivisionId"));
  const day = form.watch("day");
  const termId = Number(form.watch("termId"));
  const calendarId = form.watch("calendarId");

  const timetableQueryResult = useGetSingleTimetableQuery(React.useMemo(() => ({ params: { classDivisionId, day, termId, tenantId: authUserIds?.tenantId } }), [classDivisionId, day, termId, authUserIds?.tenantId]));
  const timetable = timetableQueryResult?.data?.data;

  const classId = Number(form.watch("classId"));
  const timetableTemplateQueryResult = useGetTimetableTemplateQuery(React.useMemo(() => ({ params: { calendarId: Number(calendarId), classId, tenantId: authUserIds?.tenantId } }), [classId, authUserIds?.tenantId, calendarId])) as SchoolTimetableTemplateOptions;
  const timetableTemplate = timetableTemplateQueryResult?.data?.data;

  const dataRef = useDataRef({ form });

  // Reset form values if editing an existing timetable
  React.useEffect(() => {
    dataRef.current.form.reset((values: SchoolTimetableFormSchemaType) => ({
      ...values,
      id: Number(timetable?.id) || values.id,
      day: timetable?.day || values.day,
      periods:
        (timetable?.periods &&
          timetable.periods.map((period: Record<string, any>) => ({
            subjectId: Number(period?.subjectId),
            startTime: period?.startTime ? new Date(period.startTime) : undefined,
            endTime: period?.endTime ? new Date(period.endTime) : undefined,
            isBreak: period?.isBreak,
            breakType: period?.breakType,
          }))) ||
        [],
      classDivisionId: Number(timetable?.classDivisionId) || values.classDivisionId,
    }));
  }, [timetable, classDivisionId, day, classId]);

  return (
    <LoadingContent loading={timetableQueryResult?.isLoading} error={timetableQueryResult?.error} retry={timetableQueryResult?.refetch} data={timetableQueryResult?.data} shouldLoad={false}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleMutateTimetable)}>
          <div className="space-y-4 mb-8">
            <div className="grid md:grid-cols-5 gap-4">
              <FormField
                control={form.control}
                name="calendarId"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} value={String(field.value)} disabled={timetableTemplateQueryResult?.isLoading}>
                      <FormControl>
                        <SelectTrigger className="">
                          <SelectValue placeholder="Select Session" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timetableTemplate?.calendarOptions?.map((item, idx: number) => (
                          <SelectItem key={idx} value={String(item.id)}>
                            {item.year}
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
                name="termId"
                render={({ field }) => (
                  <FormItem>
                    <Select value={String(field.value || "")} onValueChange={field.onChange} disabled={timetableTemplateQueryResult?.isLoading || !calendarId}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Term" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timetableTemplate?.termOptions?.map((termOption, idx) => (
                          <SelectItem key={idx} value={String(termOption?.id)}>
                            {termOption?.name}
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
              <FormField
                control={form.control}
                name="classId"
                render={({ field }) => (
                  <FormItem>
                    <Select value={String(field.value || "")} onValueChange={field.onChange} disabled={timetableTemplateQueryResult?.isLoading}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Class" />
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
                          <SelectValue placeholder="Class Division" />
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
            </div>
            <div className="flex w-full">
              <div className="flex-1" />
              <Button
                className="w-full md:w-auto"
                type="button"
                onClick={() =>
                  form.setValue("periods", [
                    ...form.watch("periods"),
                    {
                      startTime: "",
                      endTime: "",
                      subjectId: "",
                      isBreak: false,
                      breakType: "",
                    },
                  ])
                }
              >
                Add Another Period <CirclePlus size={18} strokeWidth={1} />
              </Button>
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
                    <div key={idx} className="grid gap-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-4">
                          <FormField
                            control={form.control}
                            name={`periods.${idx}.isBreak`}
                            render={({ field }) => (
                              <FormItem>
                                <div className="flex items-center gap-2">
                                  <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                  <FormLabel className="">Is Break Period</FormLabel>
                                </div>
                                <FormMessage />
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
                        </div>
                        <div />
                      </div>

                      <div className="flex items-center flex-col md:flex-row gap-4">
                        <FormField
                          control={form.control}
                          name={`periods.${idx}.startTime`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <TimePicker date={field.value} setDate={field.onChange} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="translate-y-2">
                          <TimerIcon strokeWidth={1} size={24} />
                        </div>
                        <FormField
                          control={form.control}
                          name={`periods.${idx}.endTime`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <TimePicker date={field.value} setDate={field.onChange} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
          </div>

          <div className="grid md:grid-cols-2 md:max-w-lg gap-4 mx-auto my-12">
            <Button variant={"outline"} type="button" onClick={() => router.push(RouteEnums.SCHOOL_TIMETABLE)}>
              Go Back
            </Button>
            <Button loading={timetableMutatePending} disabled={!classDivisionId}>
              Save
            </Button>
          </div>
        </form>
      </Form>
    </LoadingContent>
  );
}
