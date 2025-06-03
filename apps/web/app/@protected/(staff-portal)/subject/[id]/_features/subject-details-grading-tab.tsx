"use client";

import React from "react";
import Link from "next/link";
import { FileCheck2 } from "lucide-react";
import useToggle from "@/hooks/use-toggle";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { useAuthUser } from "@/hooks/use-auth-user";
import { ContinuousAssessmentScore } from "@/types";
import { LoadingContent } from "@/components/loading-content";
import { SubjectGradingCreateDialog } from "./subject-grading-create-dialog";
import { Button, Card, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui";
import { useGetSubjectGradingStructureQuery } from "@/apis/core-subject-api/subject-grading-structure";
import { useGetSubjectGradingListQuery, useGetSubjectGradingTemplateQuery } from "@/apis/core-subject-api/subject-grading";
import { SubjectGradingTemplateOptions } from "@/app/@protected/(staff-portal)/student/grading/_types/subject-grading-types";

export function SubjectDetailsGradingTab({ subjectId }: { subjectId: number }) {
  const { authUserIds } = useAuthUser();
  const [open, toggle] = useToggle(false);
  const [termId, setTermId] = React.useState(0);
  const [classId, setClassId] = React.useState(0);
  const [calendarId, setCalendarId] = React.useState(0);
  const [classDivisionId, setClassDivisionId] = React.useState(0);

  const gradingTemplateQueryResult = useGetSubjectGradingTemplateQuery(React.useMemo(() => ({ params: { calendarId, classId, tenantId: authUserIds?.tenantId, subjectId } }), [calendarId, classId, authUserIds?.tenantId, subjectId])) as SubjectGradingTemplateOptions;
  const gradingTemplate = gradingTemplateQueryResult?.data?.data;

  const gradingQueryResult = useGetSubjectGradingListQuery(React.useMemo(() => ({ path: {}, params: { calendarId, termId, subjectId, classId, classDivisionId, tenantId: authUserIds?.tenantId } }), [calendarId, termId, subjectId, classId, classDivisionId, authUserIds?.tenantId]));
  const grading = gradingQueryResult?.data?.data;

  const subjectGradingStructureQueryResult = useGetSubjectGradingStructureQuery({ path: {}, params: { tenantId: authUserIds?.tenantId, subjectId } });

  const dynamicColumns = React.useMemo(() => {
    if (!grading || grading.length === 0) return [];

    const assessmentNames = Array.from(new Set(grading.flatMap((item) => item.continuousAssessmentScores?.map((score) => score.name) ?? [])));

    const caColumns: ColumnDef<any, unknown>[] = assessmentNames.map((name) => ({
      header: name,
      accessorKey: `ca-${name}`,
      cell: ({ row }) => {
        const scoreObj = row.original.continuousAssessmentScores?.find((s: ContinuousAssessmentScore) => s.name === name);
        return <p>{scoreObj?.score ?? "-"}</p>;
      },
    }));

    return caColumns;
  }, [grading]);

  const columns = React.useMemo<ColumnDef<any, unknown>[]>(
    () => [
      {
        header: "Student Name",
        accessorKey: "studentName",
        cell: ({ row }) => {
          return (
            <p>
              {row?.original?.student?.user?.lastName} {row?.original?.student?.user?.firstName}
            </p>
          );
        },
      },
      {
        header: "Class Division",
        accessorKey: "classDivisionName",
        cell: ({ row }) => {
          return <p>{row?.original?.student?.classDivision?.name}</p>;
        },
      },
      ...dynamicColumns,
      {
        header: "Exam",
        accessorKey: "examScore",
      },
      {
        header: "Total Score",
        accessorKey: "totalScore",
      },
      {
        header: "Grade",
        accessorKey: "grade",
      },
      {
        header: "Remark",
        accessorKey: "remark",
      },
    ],
    [dynamicColumns]
  );

  const handleOpenDialog = () => {
    // Ensure we're running this after the dropdown's click event has completed
    setTimeout(() => {
      toggle();
    }, 0);
    subjectGradingStructureQueryResult?.refetch();
  };

  const handleCloseDialog = React.useCallback(() => {
    toggle();
  }, [toggle]);

  return (
    <>
      <div className="flex w-full flex-col md:flex-row gap-4 pb-4 mt-8">
        <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-4 w-full md:w-auto">
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

        <Link className="" href={"#"}>
          <Button className="w-full" onClick={handleOpenDialog}>
            Submit Grades <FileCheck2 size={18} strokeWidth={1} />
          </Button>
        </Link>
      </div>
      <Card className="overflow-hidden mt-8">
        <LoadingContent loading={gradingQueryResult?.isLoading} data={gradingQueryResult?.data} error={gradingQueryResult?.error} retry={gradingQueryResult?.refetch} shouldLoad={gradingQueryResult?.isFetched || gradingQueryResult?.isError}>
          <DataTable data={grading || []} columns={columns} />
        </LoadingContent>
      </Card>

      <SubjectGradingCreateDialog open={open} onClose={handleCloseDialog} subjectId={subjectId} subjectGradingStructureQueryResult={subjectGradingStructureQueryResult} tenantId={authUserIds?.tenantId} />
    </>
  );
}
