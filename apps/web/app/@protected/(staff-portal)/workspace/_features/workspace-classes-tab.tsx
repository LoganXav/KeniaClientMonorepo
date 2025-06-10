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
import { useGetClassDivisionListQuery } from "@/apis/core-class-api/class-division";
import { Button, Card, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@repo/ui";

export function WorkspaceClassessTab() {
  const { authUserIds } = useAuthUser();
  const columns = React.useMemo<ColumnDef<any, unknown>[]>(
    () => [
      {
        header: "Division",
        accessorKey: "name",
      },
      {
        header: "Class",
        accessorKey: "class",
        cell: ({ row }) => <p>{row?.original?.class?.name}</p>,
      },
      {
        header: "Class Teacher",
        accessorKey: "class",
        cell: ({ row }) => (
          <p>
            {row?.original?.classDivisionTeacher?.user?.lastName} {row?.original?.classDivisionTeacher?.user?.firstName}
          </p>
        ),
      },

      {
        id: "actions",
        cell: ({ row }) => {
          const classDivision = row.original;

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
                <Link href={`${RouteEnums.CLASS_DIVISION}/${classDivision.id}`}>
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

  const classDivisionListQueryResult = useGetClassDivisionListQuery({ params: { tenantId: authUserIds?.tenantId, classTeacherId: authUserIds?.id } });

  return (
    <>
      <Card className="overflow-hidden mt-8">
        <LoadingContent loading={classDivisionListQueryResult?.isLoading} error={classDivisionListQueryResult?.error} data={classDivisionListQueryResult.data} retry={classDivisionListQueryResult?.refetch}>
          <DataTable data={classDivisionListQueryResult?.data?.data} columns={columns} />
        </LoadingContent>
      </Card>
    </>
  );
}
