"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { useAuthUser } from "@/hooks/use-auth-user";
import { LoadingContent } from "@/components/loading-content";
import { useGetStudentGradingListQuery } from "@/apis/core-student-api/student-grading";
import { useGetSubjectGradingTemplateQuery } from "@/apis/core-subject-api/subject-grading";
import { Card, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui";

export function StudentGradingTable() {
  const { authUserIds } = useAuthUser();
  const [termId, setTermId] = React.useState(0);
  const [classId, setClassId] = React.useState(0);
  const [calendarId, setCalendarId] = React.useState(0);
  const [classDivisionId, setClassDivisionId] = React.useState(0);

  const gradingTemplateQueryResult = useGetSubjectGradingTemplateQuery(React.useMemo(() => ({ params: { calendarId, classId, tenantId: authUserIds?.tenantId } }), [calendarId, classId, authUserIds?.tenantId]));
  const gradingTemplate = gradingTemplateQueryResult?.data?.data;

  const gradingQueryResult = useGetStudentGradingListQuery(React.useMemo(() => ({ path: {}, params: { calendarId, termId, classId, classDivisionId, tenantId: authUserIds?.tenantId } }), [calendarId, termId, classId, classDivisionId, authUserIds?.tenantId]));
  const grading = gradingQueryResult?.data?.data;

  const dynamicColumns = React.useMemo(() => {
    if (!grading || grading.length === 0) return [];

    // Collect all unique subject names
    const subjectNames = Array.from(new Set(grading.flatMap((student) => (student.subjects ?? []).map((subject) => subject.name))));

    // Create one column per subject
    const subjectColumns: ColumnDef<any, unknown>[] = subjectNames.map((subjectName) => ({
      header: subjectName,
      accessorKey: `subject-${subjectName}`,
      cell: ({ row }) => {
        const subject = row.original.subjects?.find((s: any) => s.name === subjectName);

        return (
          <div className="flex space-x-2">
            <p>{subject?.grading?.grade ?? "-"}</p>
            <p>({subject?.grading?.totalScore ?? "-"})</p>
          </div>
        );
      },
    }));

    return subjectColumns;
  }, [grading]);

  const columns = React.useMemo<ColumnDef<any, unknown>[]>(
    () => [
      {
        header: "Student Name",
        accessorKey: "studentName",
        cell: ({ row }) => {
          return (
            <p>
              {row?.original?.user?.lastName} {row?.original?.user?.firstName}
            </p>
          );
        },
      },
      ...dynamicColumns,
    ],
    [dynamicColumns]
  );

  return (
    <>
      <div className="flex w-full flex-col md:flex-row gap-4 pb-4 mt-8">
        <div className="grid md:grid-cols-4 xl:grid-cols-4 gap-4 w-full md:w-auto">
          <Select value={String(calendarId || "")} onValueChange={(value) => setCalendarId(Number(value))} disabled={gradingTemplateQueryResult?.isLoading}>
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

          <Select value={String(termId || "")} onValueChange={(value) => setTermId(Number(value))} disabled={!calendarId}>
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

          <Select value={String(classId || "")} onValueChange={(value) => setClassId(Number(value))} disabled={!termId}>
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
          <Select value={String(classDivisionId || "")} onValueChange={(value) => setClassDivisionId(Number(value))} disabled={!classId}>
            <SelectTrigger>
              <SelectValue placeholder="Class Division" />
            </SelectTrigger>
            <SelectContent>
              {gradingTemplate?.classDivisionOptions?.map((classDivisionOption, idx) => (
                <SelectItem key={idx} value={String(classDivisionOption?.id)}>
                  {classDivisionOption?.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="hidden md:flex md:flex-1" />
      </div>
      <Card className="overflow-hidden mt-8">
        <LoadingContent loading={gradingQueryResult?.isLoading} data={gradingQueryResult?.data} error={gradingQueryResult?.error} retry={gradingQueryResult?.refetch} shouldLoad={gradingQueryResult?.isFetched || gradingQueryResult?.isError}>
          <DataTable data={grading || []} columns={columns} />
        </LoadingContent>
      </Card>
    </>
  );
}
