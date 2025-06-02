"use client";

import React from "react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { useAuthUser } from "@/hooks/use-auth-user";
import { EyeIcon, TableOfContents } from "lucide-react";
import { LoadingContent } from "@/components/loading-content";
import { SubjectGradingTemplateOptions } from "../_types/subject-grading-types";
import { useGetSubjectGradingTemplateQuery } from "@/apis/core-subject-api/subject-grading";
import { Button, Card, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui";

export function StudentGradingTable() {
  const { authUserIds } = useAuthUser();
  const [calendarId, setCalendarId] = React.useState(0);
  const [termId, setTermId] = React.useState(0);
  const [classId, setClassId] = React.useState(0);
  const [classDivisionId, setClassDivisionId] = React.useState(0);

  const columns = React.useMemo<ColumnDef<any, unknown>[]>(
    () => [
      {
        header: "Student Name",
        accessorKey: "name",
      },
      {
        header: "Continuous Assessment",
        accessorKey: "continuousAssessmentScore",
      },
      {
        header: "Exam",
        accessorKey: "examScore",
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const staff = row.original;

          return (
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">View grades</span>
              <EyeIcon className="h-4 w-4" />
            </Button>
          );
        },
      },
    ],
    []
  );

  const gradingTemplateQueryResult = useGetSubjectGradingTemplateQuery(React.useMemo(() => ({ params: { calendarId, classId, tenantId: authUserIds?.tenantId } }), [calendarId, classId, authUserIds?.tenantId])) as SubjectGradingTemplateOptions;
  const gradingTemplate = gradingTemplateQueryResult?.data?.data;

  // TODO - fetch list of students in a class and include their grades

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
        <LoadingContent loading={false} data={{}}>
          <DataTable data={{}} columns={columns} />
        </LoadingContent>
      </Card>
    </>
  );
}
