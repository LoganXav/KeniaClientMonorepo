"use client";

import React from "react";
import { useForm } from "react-hook-form";
import useDataRef from "@/hooks/use-data-ref";
import { useAuthUser } from "@/hooks/use-auth-user";
import { DataTable } from "@/components/data-table";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingContent } from "@/components/loading-content";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { useGetStudentListQuery } from "@/apis/core-student-api/student";
import { ClassPromotionCreateFormType } from "../_types/class-promotion-form-types";
import { classPromotionCreateFormSchema } from "../_schema/class-promotion-create-form-schema";
import { useCreateClassPromotionMutation, useGetClassPromotionTemplateQuery } from "@/apis/core-class-api/class-promotion";
import { Button, Card, Form, FormControl, FormField, FormItem, FormMessage, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, toast } from "@repo/ui";

type Props = {};

export function ClassPromotionCreateForm({}: Props) {
  const { authUserIds } = useAuthUser();
  const [submittingId, setSubmittingId] = React.useState<number | null>(null);

  //   const handleBulkSubmit = (values: any) => {

  //     createClassPromotion(
  //       {
  //         payload: { ...values },
  //       },
  //       {
  //         onSuccess: (result) => {
  //           toast.success(result.message);
  //         },
  //         onError: (error) => {
  //           toast.error(error.message);
  //         },
  //       }
  //     );
  //   };

  // const defaultValues = {
  //   tenantId: authUserIds?.tenantId,
  //   calendarId: "",
  //   promotions: [
  //     {
  //       toClassId: "",
  //       promotionStatus: "",
  //       comments: "",
  //       studentId: "",
  //     },
  //   ],
  // };

  const defaultValues = {
    tenantId: authUserIds?.tenantId,
    calendarId: "",
    classId: "",
    classDivisionId: "",
    promotions: [
      {
        toClassId: "",
        toClassDivisionName: "",
        promotionStatus: "",
        comments: "",
        studentId: "",
      },
    ],
  };

  const form = useForm<ClassPromotionCreateFormType>({
    resolver: zodResolver(classPromotionCreateFormSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const classId = form.watch("classId");
  const calendarId = form.watch("calendarId");
  const classDivisionId = form.watch("classDivisionId");

  const classPromotionTemplateQuery = useGetClassPromotionTemplateQuery(
    React.useMemo(
      () => ({
        params: {
          tenantId: authUserIds?.tenantId,
          classId: Number(classId),
          classDivisionId: Number(classDivisionId),
        },
      }),
      [classId, classDivisionId, authUserIds?.tenantId]
    )
  );

  const classPromotionTemplate = classPromotionTemplateQuery?.data?.data;

  const studentListQueryResult = useGetStudentListQuery({
    params: {
      tenantId: authUserIds?.tenantId,
      excludePromotedInCalendarId: Number(calendarId),
      classId: Number(classId),
      classDivisionId: Number(classDivisionId),
    },
    enabled: !!calendarId,
  });

  const studentList = studentListQueryResult?.data?.data;

  const { createClassPromotion, createClassPromotionPending, createClassPromotionError } = useCreateClassPromotionMutation({ params: { tenantId: authUserIds?.tenantId } });

  const handleRowSubmit = (index: number, studentId: number) => {
    const values = form.getValues();
    const promotion = values.promotions?.[index];

    const payload = {
      studentId,
      comments: promotion?.comments,
      toClassId: Number(promotion?.toClassId),
      toClassDivisionName: promotion?.toClassDivisionName,
      promotionStatus: promotion?.promotionStatus,
      calendarId: Number(form.watch("calendarId")),
    };

    setSubmittingId(studentId);

    createClassPromotion(
      { payload },
      {
        onSuccess: (result) => {
          toast.success(result.message);
          studentListQueryResult?.refetch();
          setSubmittingId(null);
        },
        onError: (error) => {
          toast.error(error.message);
          setSubmittingId(null);
        },
      }
    );
  };

  const columns = React.useMemo<ColumnDef<any, unknown>[]>(
    () => [
      {
        header: "Student Name",
        accessorKey: "name",
        cell: ({ row }: CellContext<any, unknown>) => (
          <p>
            {row?.original?.user?.firstName} {row?.original?.user?.lastName}
          </p>
        ),
      },
      {
        header: "Current Class",
        accessorKey: "fromClass",
        cell: ({ row }) => <p>{row?.original?.class?.name}</p>,
      },
      {
        header: "Next Class",
        accessorKey: "toClass",
        cell: ({ row }) => {
          const status = row?.original?.promotionStatus;
          const idx = row?.index;

          return (
            <FormField
              control={form.control}
              name={`promotions.${idx}.toClassId`}
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={String(field.value)}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Class" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {classPromotionTemplate?.classOptions?.map((classOption, idx) => (
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
          );
        },
      },
      {
        header: "Next Class Division",
        accessorKey: "toClassDivisionName",
        cell: ({ row }) => {
          const status = row?.original?.promotionStatus;
          const idx = row?.index;

          return (
            <FormField
              control={form.control}
              name={`promotions.${idx}.toClassDivisionName`}
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={String(field.value)}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Class Division" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {classPromotionTemplate?.promotionClassDivisionOptions?.map((classDivisionOption, idx) => (
                        <SelectItem key={idx} value={String(classDivisionOption?.name)}>
                          {classDivisionOption?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        },
      },
      {
        header: "Promotion Decision",
        accessorKey: "promotionStatus",
        cell: ({ row }) => {
          const status = row.original.promotionStatus;
          const idx = row.index;

          return (
            <FormField
              control={form.control}
              name={`promotions.${idx}.promotionStatus`}
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={String(field.value)}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Decision" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {classPromotionTemplate?.promotionDecisionOptions?.map((decision, idx) => (
                        <SelectItem key={idx} value={String(decision)}>
                          {decision}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        },
      },
      {
        header: "Remarks",
        accessorKey: "comments",
        cell: ({ row }) => {
          const idx = row.index;
          return <FormField control={form.control} name={`promotions.${idx}.comments`} render={({ field }) => <Input {...field} placeholder="Write a remark" />} />;
        },
      },
      {
        header: "",
        accessorKey: "action",
        cell: ({ row }) => {
          const index = row.index;
          const studentId = row.original.id;
          const isLoadingThisRow = submittingId === studentId;

          return (
            <Button type="button" className="w-full" onClick={() => handleRowSubmit(index, studentId)} loading={isLoadingThisRow} disabled={createClassPromotionPending}>
              Submit Decision
            </Button>
          );
        },
      },
    ],
    [classPromotionTemplate, submittingId]
  );

  const dataRef = useDataRef({ form });

  React.useEffect(() => {
    if (studentList && studentList.length > 0) {
      dataRef.current.form.reset((prevValues: ClassPromotionCreateFormType) => ({
        ...prevValues,
        promotions: studentList.map((student) => ({
          toClassId: "",
          toClassDivisionName: "",
          promotionStatus: "",
          comments: "",
          studentId: student.id,
        })),
      }));
    }
  }, [studentList]);

  return (
    <>
      <div className="flex flex-col md:flex-row w-full gap-4 pb-4 mt-8 justify-between">
        <div className="grid md:grid-cols-4 xl:grid-cols-4 gap-4 w-full md:w-auto">
          <FormField
            control={form.control}
            name="calendarId"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} value={String(field.value)} disabled={classPromotionTemplateQuery?.isLoading}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Session" />
                  </SelectTrigger>
                  <SelectContent>
                    {classPromotionTemplate?.calendarOptions?.map((calendarOption, idx) => (
                      <SelectItem key={idx} value={String(calendarOption?.id)}>
                        {calendarOption?.year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="classId"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} value={String(field.value)} disabled={!calendarId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classPromotionTemplate?.classOptions?.map((classOption, idx) => (
                      <SelectItem key={idx} value={String(classOption?.id)}>
                        {classOption?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="classDivisionId"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} value={String(field.value)} disabled={!classId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Class Division" />
                  </SelectTrigger>
                  <SelectContent>
                    {classPromotionTemplate?.classDivisionOptions?.map((classDivisionOption, idx) => (
                      <SelectItem key={idx} value={String(classDivisionOption?.id)}>
                        {classDivisionOption?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <div className="flex-1" />
      </div>
      <Card className="overflow-hidden">
        <Form {...form}>
          <form onSubmit={() => null}>
            <LoadingContent loading={studentListQueryResult?.isLoading || studentListQueryResult?.isFetching} data={studentListQueryResult?.data} error={studentListQueryResult?.error} retry={studentListQueryResult?.refetch}>
              <DataTable data={studentList || []} columns={columns} />
            </LoadingContent>
          </form>
        </Form>
      </Card>
    </>
  );
}
