"use client";

import React from "react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { useAuthUser } from "@/hooks/use-auth-user";
import { CirclePlus, UserRound } from "lucide-react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { LoadingContent } from "@/components/loading-content";
import { RouteEnums } from "@/constants/router/route-constants";
import { PermissionRestrictor } from "@/components/permission-restrictor";
import { PERMISSIONS } from "@/constants/permissions/permission-constants";
import { useGetClassDivisionListQuery } from "@/apis/core-class-api/class-division";
import { Button, Card, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@repo/ui";

export function ClassDivisionListTable() {
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
        accessorKey: "classTeacher",
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
                <PermissionRestrictor requiredPermissions={[PERMISSIONS.CLASS_DIVISION.READ]}>
                  <Link href={`${RouteEnums.CLASS_DIVISION}/${classDivision.id}`}>
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

  const classDivisionListQueryResult = useGetClassDivisionListQuery({ params: { tenantId: authUserIds?.tenantId } });

  return (
    <>
      <div className="flex w-full pb-4 mt-8">
        <div className="hidden md:flex md:flex-1" />

        <PermissionRestrictor requiredPermissions={[PERMISSIONS.CLASS_DIVISION.CREATE]}>
          <Link className="w-full md:w-auto" href={RouteEnums.CLASS_DIVISION_CREATE}>
            <Button className="w-full">
              Create Class Division <CirclePlus size={18} strokeWidth={1} />
            </Button>
          </Link>
        </PermissionRestrictor>
      </div>

      <Card className="overflow-hidden">
        <LoadingContent loading={classDivisionListQueryResult?.isLoading} error={classDivisionListQueryResult?.error} data={classDivisionListQueryResult.data} retry={classDivisionListQueryResult?.refetch}>
          <DataTable data={classDivisionListQueryResult?.data?.data} columns={columns} />
        </LoadingContent>
      </Card>
    </>
  );
}
