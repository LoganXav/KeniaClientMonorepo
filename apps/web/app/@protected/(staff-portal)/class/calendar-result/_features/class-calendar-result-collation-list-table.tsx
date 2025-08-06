"use client";

import {
  Badge,
  Button,
  Card,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  toast,
} from "@repo/ui";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { useAuthUser } from "@/hooks/use-auth-user";
import {
  useGetStudentCalendarResultListQuery,
  useStudentCalendarResultUpdateMutation,
} from "@/apis/core-student-api/student-calendar-result";
import { LoadingContent } from "@/components/loading-content";
import { useGetSubjectGradingTemplateQuery } from "@/apis/core-subject-api/subject-grading";

type Props = {};

export function ClassCalendarResultCollationListTable({}: Props) {
  const { authUserIds } = useAuthUser();
  const [classId, setClassId] = React.useState(0);
  const [calendarId, setCalendarId] = React.useState(0);
  const [classDivisionId, setClassDivisionId] = React.useState(0);
  const [submittingId, setSubmittingId] = React.useState<number | null>(null);

  const gradingTemplateQueryResult = useGetSubjectGradingTemplateQuery(
    React.useMemo(
      () => ({
        params: { calendarId, classId, tenantId: authUserIds?.tenantId },
      }),
      [calendarId, classId, authUserIds?.tenantId],
    ),
  );
  const gradingTemplate = gradingTemplateQueryResult?.data?.data;

  const studentCalendarResultListQuery = useGetStudentCalendarResultListQuery({
    params: {
      tenantId: authUserIds?.tenantId,
      classId: Number(classId),
      classDivisionId: Number(classDivisionId),
      calendarId: Number(calendarId),
    },
    enabled: !!calendarId && !!calendarId && !!classId && !!classDivisionId,
  });
  const studentCalendarResultList =
    studentCalendarResultListQuery?.data?.data || [];

  const { studentCalendarResultUpdate, studentCalendarResultUpdatePending } =
    useStudentCalendarResultUpdateMutation({
      params: { tenantId: authUserIds?.tenantId },
    });

  const handleRowSubmit = React.useCallback(
    (index: number, studentId: number) => {
      const studentCalendarResult = studentCalendarResultList[index];

      const payload = {
        finalized: !studentCalendarResult?.finalized,
        classId: Number(classId),
        calendarId: Number(calendarId),
        classDivisionId: Number(classDivisionId),
      };
      setSubmittingId(studentId);

      studentCalendarResultUpdate(
        { payload, path: { studentId } },
        {
          onSuccess: (result) => {
            toast.success(result.message);
            studentCalendarResultListQuery?.refetch();
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
      studentCalendarResultList,
      classId,
      calendarId,
      setSubmittingId,
      studentCalendarResultUpdate,
      studentCalendarResultListQuery?.refetch,
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
              {/* <Button variant="ghost" onClick={() => handleOpenDialog(student)}> */}
              {/*   <Logs strokeWidth={1} size={24} /> */}
              {/* </Button> */}
              <Button
                variant={variant}
                className="w-[230px]"
                size="sm"
                onClick={() => handleRowSubmit(index, student?.id)}
                loading={isLoadingThisRow}
                disabled={false}
              >
                {buttonText}
              </Button>
            </div>
          );
        },
      },
    ],
    [submittingId, handleRowSubmit, studentCalendarResultUpdatePending],
  );

  return (
    <>
      <div className="flex w-full flex-col md:flex-row gap-4 pb-4 mt-8">
        <div className="grid md:grid-cols-4 xl:grid-cols-4 gap-4 w-full md:w-auto">
          <Select
            value={String(calendarId || "")}
            onValueChange={(value) => setCalendarId(Number(value))}
            disabled={gradingTemplateQueryResult?.isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Session" />
            </SelectTrigger>
            <SelectContent>
              {gradingTemplate?.calendarOptions?.map((calendarOption, idx) => (
                <SelectItem key={idx} value={String(calendarOption?.id)}>
                  {calendarOption?.year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={String(classId || "")}
            onValueChange={(value) => setClassId(Number(value))}
            disabled={!calendarId}
          >
            <SelectTrigger>
              <SelectValue placeholder="Class" />
            </SelectTrigger>
            <SelectContent>
              {gradingTemplate?.classOptions?.map((classOption, idx) => (
                <SelectItem key={idx} value={String(classOption?.id)}>
                  {classOption?.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={String(classDivisionId || "")}
            onValueChange={(value) => setClassDivisionId(Number(value))}
            disabled={!classId}
          >
            <SelectTrigger>
              <SelectValue placeholder="Class Division" />
            </SelectTrigger>
            <SelectContent>
              {gradingTemplate?.classDivisionOptions?.map(
                (classDivisionOption, idx) => (
                  <SelectItem key={idx} value={String(classDivisionOption?.id)}>
                    {classDivisionOption?.name}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>
        </div>
        <div className="hidden md:flex md:flex-1" />
      </div>
      <Card className="overflow-hidden mt-8">
        <LoadingContent loading={false} data={{}}>
          <DataTable data={studentCalendarResultList} columns={columns} />
        </LoadingContent>
      </Card>
    </>
  );
}
