"use client";

import React from "react";
import { DataTable } from "@/components/data-table";
import { Button, Card, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@repo/ui";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { RouteEnums } from "@/constants/router/route-constants";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { LoadingContent } from "@/components/loading-content";
import { UserRound } from "lucide-react";
import { useGetClassListQuery } from "@/apis/core-class-api/class";
import { useAuthUser } from "@/hooks/use-auth-user";
type Props = {};

export function ClassListTable({}: Props) {
  const { authUserIds } = useAuthUser();
  const columns = React.useMemo<ColumnDef<any, unknown>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Class Teacher",
        accessorKey: "classTeacher",
        cell: ({ row }) => (
          <p>
            {row?.original?.classTeacher?.user?.lastName} {row?.original?.classTeacher?.user?.firstName}
          </p>
        ),
      },

      {
        id: "actions",
        cell: ({ row }) => {
          const classItem = row.original;

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
                <Link href={`${RouteEnums.CLASS}/${classItem.id}`}>
                  <DropdownMenuItem className="flex justify-between">
                    View <UserRound className="ml-2" size={15} strokeWidth={1} />
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    []
  );

  const classListQueryResult = useGetClassListQuery({ params: { tenantId: authUserIds?.tenantId } });

  return (
    <>
      <Card className="overflow-hidden mt-8">
        <LoadingContent loading={classListQueryResult?.isLoading} error={classListQueryResult?.error} data={classListQueryResult.data} retry={classListQueryResult?.refetch}>
          <DataTable data={classListQueryResult?.data?.data} columns={columns} />
        </LoadingContent>
      </Card>
    </>
  );
}
