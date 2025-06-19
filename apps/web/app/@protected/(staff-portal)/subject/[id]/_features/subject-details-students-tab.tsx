"use client";

import React from "react";
import { Card } from "@repo/ui";
import { calculateAge } from "@/lib/dates";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { useAuthUser } from "@/hooks/use-auth-user";
import { LoadingContent } from "@/components/loading-content";
import { useGetSingleSubjectQuery } from "@/apis/core-subject-api/subject";

export function SubjectDetailsStudentsTab({ subjectId, classId }: { subjectId: number; classId?: number }) {
  const { authUserIds } = useAuthUser();

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

  const subjectQueryResult = useGetSingleSubjectQuery({
    params: { tenantId: authUserIds?.tenantId, subjectId },
  });

  const subject = subjectQueryResult?.data?.data;

  // Extract students offering the subject
  const students =
    subject?.subjectRegistration?.map((reg) => ({
      ...reg.student,
    })) || [];

  return (
    <>
      <Card className="overflow-hidden mt-8">
        <LoadingContent data={subjectQueryResult?.data} loading={subjectQueryResult?.isLoading} error={subjectQueryResult?.error} retry={subjectQueryResult?.refetch}>
          <DataTable data={students} columns={columns} />
        </LoadingContent>
      </Card>
    </>
  );
}
