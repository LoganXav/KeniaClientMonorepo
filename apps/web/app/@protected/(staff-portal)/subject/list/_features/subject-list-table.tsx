"use client";

import React from "react";
import Link from "next/link";
import { UserRound } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { useAuthUser } from "@/hooks/use-auth-user";
import { DataTable } from "@/components/data-table";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { LoadingContent } from "@/components/loading-content";
import { RouteEnums } from "@/constants/router/route-constants";
import { useGetSubjectListQuery } from "@/apis/core-subject-api/subject";
import { PermissionRestrictor } from "@/components/permission-restrictor";
import { PERMISSIONS } from "@/constants/permissions/permission-constants";
import { Button, Card, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@repo/ui";

type Props = {};

export function SubjectListTable({}: Props) {
  const columns = React.useMemo<ColumnDef<any, unknown>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Class",
        accessorKey: "class",
        cell: ({ row }) => <p>{row?.original?.class?.name}</p>,
      },

      {
        id: "actions",
        cell: ({ row }) => {
          const subject = row.original;

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
                <PermissionRestrictor requiredPermissions={[PERMISSIONS.SUBJECT.READ]}>
                  <Link href={`${RouteEnums.SUBJECT}/${subject?.id}`}>
                    <DropdownMenuItem className="flex justify-between">
                      View <UserRound className="ml-2" size={15} strokeWidth={1} />
                    </DropdownMenuItem>
                  </Link>
                </PermissionRestrictor>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    []
  );

  const { authUserIds } = useAuthUser();
  const subjectListQueryResult = useGetSubjectListQuery(React.useMemo(() => ({ params: { tenantId: authUserIds?.tenantId } }), [authUserIds?.tenantId]));

  return (
    <>
      <div className="flex w-full pb-4 mt-8">
        <div className="hidden md:flex md:flex-1" />
        <div className="grid gap-4 w-full md:w-auto"></div>
      </div>
      <Card className="overflow-hidden">
        <LoadingContent loading={subjectListQueryResult?.isLoading} error={subjectListQueryResult?.error} data={subjectListQueryResult.data} retry={subjectListQueryResult?.refetch}>
          <DataTable data={subjectListQueryResult?.data?.data} columns={columns} />
        </LoadingContent>
      </Card>
    </>
  );
}
