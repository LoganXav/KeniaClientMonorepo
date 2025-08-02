"use client";

import React from "react";
import { Logs } from "lucide-react";
import { StudentType } from "@/types";
import { useForm } from "react-hook-form";
import useToggle from "@/hooks/use-toggle";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { useAuthUser } from "@/hooks/use-auth-user";
import {
  useGetStudentTermResultListQuery,
  useStudentTermResultUpdateMutation,
} from "@/apis/core-student-api/student-term-result";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingContent } from "@/components/loading-content";
import { useGetSubjectGradingTemplateQuery } from "@/apis/core-subject-api/subject-grading";
import ClassTermResultCollationGradesDialog from "./class-term-result-collation-grades-dialog";
import {
  Badge,
  Button,
  Card,
  Form,
  FormField,
  FormItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  toast,
} from "@repo/ui";
import { ClassTermResultCollationFormType } from "./_types/class-term-result-collation-form-types";
import { classTermResultCollationFormSchema } from "./_schema/class-term-result-collation-form-schema";

type Props = {};

export function ClassTermResultCollationListTable({}: Props) {
  const { authUserIds } = useAuthUser();
  const [open, toggle] = useToggle(false);
  const [submittingId, setSubmittingId] = React.useState<number | null>(null);
  const [selectedStudent, setSelectedStudent] =
    React.useState<StudentType | null>(null);

  const defaultValues = {
    calendarId: 0,
    termId: 0,
    classId: 0,
    classDivisionId: 0,
  };

  const form = useForm<ClassTermResultCollationFormType>({
    resolver: zodResolver(classTermResultCollationFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const calendarId = Number(form.watch("calendarId"));
  const termId = Number(form.watch("termId"));
  const classId = Number(form.watch("classId"));
  const classDivisionId = Number(form.watch("classDivisionId"));

  const handleOpenDialog = (student: StudentType) => {
    // Ensure we're running this after the dropdown's click event has completed
    setTimeout(() => {
      setSelectedStudent(student);
      toggle();
    }, 0);
  };

  const handleCloseDialog = React.useCallback(() => {
    toggle();
    setSelectedStudent(null);
    setTimeout(() => {}, 200);
  }, [toggle]);

  const gradingTemplateQueryResult = useGetSubjectGradingTemplateQuery(
    React.useMemo(
      () => ({
        params: {
          calendarId: Number(calendarId),
          classId: Number(classId),
          tenantId: authUserIds?.tenantId,
        },
      }),
      [calendarId, classId, authUserIds?.tenantId],
    ),
  );
  const gradingTemplate = gradingTemplateQueryResult?.data?.data;

  const studentTermResultListQuery = useGetStudentTermResultListQuery({
    params: {
      tenantId: authUserIds?.tenantId,
      classId: Number(classId),
      classDivisionId: Number(classDivisionId),
      termId: Number(termId),
    },
    enabled: !!calendarId && !!termId && !!classId && !!classDivisionId,
  });
  const studentTermResultList = studentTermResultListQuery?.data?.data || [];

  const { studentTermResultUpdate, studentTermResultUpdatePending } =
    useStudentTermResultUpdateMutation({
      params: { tenantId: authUserIds?.tenantId },
    });

  const handleRowSubmit = React.useCallback(
    (index: number, studentId: number) => {
      const studentTermResult = studentTermResultList[index];

      const payload = {
        finalized: !studentTermResult?.finalized,
        classId: Number(classId),
        calendarId: Number(calendarId),
        termId: Number(termId),
      };
      setSubmittingId(studentId);

      studentTermResultUpdate(
        { payload, path: { studentId } },
        {
          onSuccess: (result) => {
            toast.success(result.message);
            studentTermResultListQuery?.refetch();
            setSubmittingId(null);
          },
          onError: (error) => {
            toast.error(error.message);
            setSubmittingId(null);
          },
        },
      );
    },
    [
      studentTermResultList,
      classId,
      calendarId,
      termId,
      setSubmittingId,
      studentTermResultUpdate,
      studentTermResultListQuery?.refetch,
    ],
  );

  const columns = React.useMemo<ColumnDef<any, unknown>[]>(
    () => [
      {
        header: "Student Name",
        accessorKey: "name",
        cell: ({ row }) => (
          <p>
            {row?.original?.student?.user?.lastName}{" "}
            {row?.original?.student?.user?.firstName}
          </p>
        ),
      },
      {
        header: "Subjects Graded",
        accessorKey: "subjectCountGraded",
      },
      {
        header: "Subjects Offered",
        accessorKey: "subjectCountOffered",
      },
      {
        header: "Total Score",
        accessorKey: "totalScore",
      },
      {
        header: "Average",
        accessorKey: "averageScore",
      },
      {
        header: "Status",
        accessorKey: "finalized",
        cell: ({ row }) => {
          const status = row.original.finalized;
          let color: "default" | "destructive" | "secondary" | "outline" =
            "default";
          let text = "Finalized";

          switch (status) {
            case true:
              color = "default";
              text = "Finalized";
              break;
            case false:
              color = "destructive";
              text = "Not Finalized";
              break;
          }

          return <Badge variant={color}>{text}</Badge>;
        },
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const index = row?.index;
          const termResult = row.original;
          const student = termResult.student;
          const isLoadingThisRow = submittingId === student?.id;
          const variant = termResult.finalized ? "outline" : "default";
          const buttonText = termResult.finalized
            ? "Undo Confirmation"
            : "Confirm Results";

          return (
            <div className="w-full flex justify-end items-center space-x-2">
              <Button variant="ghost" onClick={() => handleOpenDialog(student)}>
                <Logs strokeWidth={1} size={24} />
              </Button>
              <Button
                variant={variant}
                className="w-[230px] line-clamp-1"
                size="sm"
                onClick={() => handleRowSubmit(index, student?.id)}
                loading={isLoadingThisRow}
                disabled={studentTermResultUpdatePending}
              >
                {buttonText}
              </Button>
            </div>
          );
        },
      },
    ],
    [
      submittingId,
      handleRowSubmit,
      handleOpenDialog,
      studentTermResultUpdatePending,
    ],
  );

  return (
    <>
      <div className="flex w-full mt-8">
        <Form {...form}>
          <form className="grid md:grid-cols-4 xl:grid-cols-4 gap-4 w-full md:w-auto">
            <FormField
              control={form.control}
              name="calendarId"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    value={String(field.value)}
                    disabled={gradingTemplateQueryResult?.isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Session" />
                    </SelectTrigger>
                    <SelectContent>
                      {gradingTemplate?.calendarOptions?.map(
                        (calendarOption, idx) => (
                          <SelectItem
                            key={idx}
                            value={String(calendarOption?.id)}
                          >
                            {calendarOption?.year}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="termId"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    value={String(field.value)}
                    disabled={!calendarId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Term" />
                    </SelectTrigger>
                    <SelectContent>
                      {gradingTemplate?.termOptions?.map((termOption, idx) => (
                        <SelectItem key={idx} value={String(termOption?.id)}>
                          {termOption?.name}
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
                  <Select
                    onValueChange={field.onChange}
                    value={String(field.value)}
                    disabled={!termId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Class" />
                    </SelectTrigger>
                    <SelectContent>
                      {gradingTemplate?.classOptions?.map(
                        (classOption, idx) => (
                          <SelectItem key={idx} value={String(classOption?.id)}>
                            {classOption?.name}
                          </SelectItem>
                        ),
                      )}
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
                  <Select
                    onValueChange={field.onChange}
                    value={String(field.value)}
                    disabled={!classId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Class Division" />
                    </SelectTrigger>
                    <SelectContent>
                      {gradingTemplate?.classDivisionOptions?.map(
                        (classDivisionOption, idx) => (
                          <SelectItem
                            key={idx}
                            value={String(classDivisionOption?.id)}
                          >
                            {classDivisionOption?.name}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="hidden md:flex md:flex-1" />
      </div>
      <Card className="overflow-hidden mt-8">
        <LoadingContent
          loading={studentTermResultListQuery?.isLoading}
          data={studentTermResultListQuery?.data}
          error={studentTermResultListQuery?.error}
          retry={studentTermResultListQuery?.refetch}
        >
          <DataTable data={studentTermResultList} columns={columns} />
        </LoadingContent>
      </Card>

      <ClassTermResultCollationGradesDialog
        open={open}
        onClose={handleCloseDialog}
        student={selectedStudent || undefined}
      />
    </>
  );
}
