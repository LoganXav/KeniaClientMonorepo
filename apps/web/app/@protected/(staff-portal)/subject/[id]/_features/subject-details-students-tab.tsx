"use client";

import React from "react";
import { Card } from "@repo/ui";
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
        cell: ({ row }) => <p>{row?.original?.user?.admissionNo}</p>,
      },
      {
        header: "Age",
        accessorKey: "age",
        cell: ({ row }) => <p>{row?.original?.user?.age}</p>,
      },

      {
        header: "Gender",
        accessorKey: "age",
        cell: ({ row }) => <p>{row?.original?.user?.gender}</p>,
      },
    ],
    []
  );

  const subjectQueryResult = useGetSingleSubjectQuery({
    params: { tenantId: authUserIds?.tenantId, subjectId },
  });

  const subject = subjectQueryResult?.data?.data;

  return (
    <>
      <Card className="overflow-hidden mt-8">
        <LoadingContent data={subjectQueryResult?.data} loading={subjectQueryResult?.isLoading} error={subjectQueryResult?.error} retry={subjectQueryResult?.refetch}>
          <DataTable data={subject?.students} columns={columns} />
        </LoadingContent>
      </Card>
    </>
  );
}
