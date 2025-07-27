"use client";

import React from "react";
import { Logs } from "lucide-react";
import { StudentType } from "@/types";
import useToggle from "@/hooks/use-toggle";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { useAuthUser } from "@/hooks/use-auth-user";
import { LoadingContent } from "@/components/loading-content";
import { useGetSubjectGradingTemplateQuery } from "@/apis/core-subject-api/subject-grading";
import ClassTermResultCollationGradesDialog from "./class-term-result-collation-grades-dialog";
import { useGetStudentTermResultListQuery } from "@/apis/core-student-api/student-term-result";
import { Badge, Button, Card, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui";

type Props = {};

export function ClassTermResultCollationListTable({}: Props) {
  const { authUserIds } = useAuthUser();
  const [open, toggle] = useToggle(false);
  const [termId, setTermId] = React.useState(0);
  const [classId, setClassId] = React.useState(0);
  const [calendarId, setCalendarId] = React.useState(0);
  const [classDivisionId, setClassDivisionId] = React.useState(0);
  const [selectedStudent, setSelectedStudent] = React.useState<StudentType | null>(null);

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

  const gradingTemplateQueryResult = useGetSubjectGradingTemplateQuery(React.useMemo(() => ({ params: { calendarId, classId, tenantId: authUserIds?.tenantId } }), [calendarId, classId, authUserIds?.tenantId]));
  const gradingTemplate = gradingTemplateQueryResult?.data?.data;

  const studentTermResultListQuery = useGetStudentTermResultListQuery({ params: { tenantId: authUserIds?.tenantId, classId, classDivisionId, termId } });
  const studentTermResultList = studentTermResultListQuery?.data?.data || [];

  const columns = React.useMemo<ColumnDef<any, unknown>[]>(
    () => [
      {
        header: "Student Name",
        accessorKey: "name",
        cell: ({ row }) => (
          <p>
            {row?.original?.student?.user?.lastName} {row?.original?.student?.user?.firstName}
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
          let color: "default" | "destructive" | "secondary" | "outline" = "default";
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
          const termResult = row.original;
          const student = termResult.student;
          const variant = termResult.finalized ? "outline" : "default";
          const buttonText = termResult.finalized ? "Undo Confirmation" : "Confirm Results";

          return (
            <div className="w-full flex justify-end items-center space-x-2">
              <Button variant="ghost" onClick={() => handleOpenDialog(student)}>
                <Logs strokeWidth={1} size={24} />
              </Button>
              <Button variant={variant} className="w-[200px] line-clamp-1" size="sm">
                {buttonText}
              </Button>
            </div>
          );
        },
      },
    ],
    []
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
        <LoadingContent loading={studentTermResultListQuery?.isLoading} data={studentTermResultListQuery?.data} error={studentTermResultListQuery?.error} retry={studentTermResultListQuery?.refetch}>
          <DataTable data={studentTermResultList} columns={columns} />
        </LoadingContent>
      </Card>

      <ClassTermResultCollationGradesDialog open={open} onClose={handleCloseDialog} student={selectedStudent || undefined} />
    </>
  );
}
