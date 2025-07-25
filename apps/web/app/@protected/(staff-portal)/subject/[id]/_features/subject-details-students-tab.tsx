"use client";

import React from "react";
import { calculateAge } from "@/lib/dates";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { useAuthUser } from "@/hooks/use-auth-user";
import { LoadingContent } from "@/components/loading-content";
import { useGetSubjectGradingTemplateQuery } from "@/apis/core-subject-api/subject-grading";
import { useGetStudentSubjectRegistrationListQuery } from "@/apis/core-student-api/student";
import { Card, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui";

export function SubjectDetailsStudentsTab({ subjectId, classId }: { subjectId: number; classId?: number }) {
  const { authUserIds } = useAuthUser();
  const [calendarId, setCalendarId] = React.useState(0);

  const columns = React.useMemo<ColumnDef<any, unknown>[]>(
    () => [
      {
        header: "Student Name",
        accessorKey: "name",
        cell: ({ row }) => (
          <p>
            {row?.original?.user?.lastName} {row?.original?.user?.firstName}
          </p>
        ),
      },

      {
        header: "Class",
        accessorKey: "classId",
        cell: ({ row }) => <p>{row?.original?.class?.name}</p>,
      },
      {
        header: "Admission Number",
        accessorKey: "admissionNo",
        cell: ({ row }) => <p>{row?.original?.admissionNo}</p>,
      },
      {
        header: "Age",
        accessorKey: "dateOfBirth",
        cell: ({ row }) => <p>{calculateAge(row?.original?.user?.dateOfBirth)} yrs</p>,
      },
      {
        header: "Gender",
        accessorKey: "gender",
        cell: ({ row }) => <p>{row?.original?.user?.gender}</p>,
      },
    ],
    []
  );

  const gradingTemplateQueryResult = useGetSubjectGradingTemplateQuery(React.useMemo(() => ({ params: { tenantId: authUserIds?.tenantId } }), [authUserIds?.tenantId]));
  const gradingTemplate = gradingTemplateQueryResult?.data?.data;

  const registration = useGetStudentSubjectRegistrationListQuery(
    React.useMemo(
      () => ({
        params: { tenantId: authUserIds?.tenantId, subjectId, classId, calendarId },
      }),
      [authUserIds?.tenantId, subjectId, classId, calendarId]
    )
  );

  const subjectRegistration = registration?.data?.data;

  // Extract students offering the subject
  const students =
    (calendarId &&
      subjectRegistration?.map((reg) => ({
        ...reg.student,
      }))) ||
    [];

  return (
    <>
      <div className="grid md:grid-cols-4 xl:grid-cols-4 gap-4 w-full md:w-auto">
        <Select value={String(calendarId || "")} onValueChange={(value) => setCalendarId(Number(value))} disabled={gradingTemplateQueryResult?.isLoading}>
          <SelectTrigger>
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent>
            {gradingTemplate?.calendarOptions?.map((calendarOption, idx) => (
              <SelectItem key={idx} value={String(calendarOption?.id)}>
                {calendarOption?.year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Card className="overflow-hidden mt-8">
        <LoadingContent data={registration?.data} loading={registration?.isLoading} error={registration?.error} retry={registration?.refetch}>
          <DataTable data={students} columns={columns} />
        </LoadingContent>
      </Card>
    </>
  );
}
