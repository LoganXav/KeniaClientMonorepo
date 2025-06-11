"use client";

import React from "react";
import { UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { useAuthUser } from "@/hooks/use-auth-user";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { LoadingContent } from "@/components/loading-content";
import { RouteEnums } from "@/constants/router/route-constants";
import { useGetSubjectListQuery } from "@/apis/core-subject-api/subject";
import { Button, Card, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@repo/ui";

export function WorkspaceStudentsTab() {
  const router = useRouter();
  const { authUserIds } = useAuthUser();
  const columns = React.useMemo<ColumnDef<any, unknown>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
        cell: ({ row }) => (
          <p>
            {row?.original?.user?.lastName} {row?.original?.user?.firstName}
          </p>
        ),
      },
      {
        header: "Class",
        accessorKey: "class",
        cell: ({ row }) => <p>{row?.original?.class?.name}</p>,
      },
      {
        header: "Subjects",
        accessorKey: "subjects",
        cell: ({ row }) => <p>{row?.original?.subjects?.join(", ")}</p>,
      },
      {
        header: "Gender",
        accessorKey: "gender",
        cell: ({ row }) => <p>{row?.original?.user?.gender}</p>,
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const student = row.original;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex justify-between" onClick={() => router.push(`${RouteEnums.STUDENT}/${student?.id}`)}>
                  View <UserRound className="ml-2" size={15} strokeWidth={1} />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    []
  );

  const subjectListQueryResult = useGetSubjectListQuery(React.useMemo(() => ({ params: { tenantId: authUserIds?.tenantId, staffIds: String(authUserIds?.id) } }), [authUserIds?.tenantId, authUserIds?.id]));

  const subjectList = subjectListQueryResult?.data?.data;

  const studentSubjectMap = new Map();

  subjectList?.forEach((subject) => {
    subject.students.forEach((student) => {
      const existing = studentSubjectMap.get(student.id);

      if (existing) {
        existing.subjects.push(subject.name);
      } else {
        studentSubjectMap.set(student.id, {
          ...student,
          class: subject.class,
          subjects: [subject.name],
        });
      }
    });
  });

  const studentsWithSubjects = Array.from(studentSubjectMap.values());

  return (
    <>
      <Card className="overflow-hidden mt-8">
        <LoadingContent loading={subjectListQueryResult?.isLoading} data={subjectListQueryResult?.data} error={subjectListQueryResult?.error} retry={subjectListQueryResult?.refetch}>
          <DataTable data={studentsWithSubjects} columns={columns} />
        </LoadingContent>
      </Card>
    </>
  );
}
