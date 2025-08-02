"use client";

import React from "react";
import Link from "next/link";
import { UserRound } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { useAuthUser } from "@/hooks/use-auth-user";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { LoadingContent } from "@/components/loading-content";
import { RouteEnums } from "@/constants/router/route-constants";
import { useGetClassListQuery } from "@/apis/core-class-api/class";
import { PermissionRestrictor } from "@/components/permission-restrictor";
import { PERMISSIONS } from "@/constants/permissions/permission-constants";
import {
  Button,
  Card,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui";
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
                <PermissionRestrictor
                  requiredPermissions={[PERMISSIONS.CLASS.READ]}
                >
                  <Link href={`${RouteEnums.CLASS}/${classItem.id}`}>
                    <DropdownMenuItem className="flex justify-between">
                      View{" "}
                      <UserRound className="ml-2" size={15} strokeWidth={1} />
                    </DropdownMenuItem>
                  </Link>
                </PermissionRestrictor>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [],
  );

  const classListQueryResult = useGetClassListQuery({
    params: { tenantId: authUserIds?.tenantId },
  });

  return (
    <>
      <Card className="overflow-hidden mt-8">
        <LoadingContent
          loading={classListQueryResult?.isLoading}
          error={classListQueryResult?.error}
          data={classListQueryResult.data}
          retry={classListQueryResult?.refetch}
        >
          <DataTable
            data={classListQueryResult?.data?.data}
            columns={columns}
          />
        </LoadingContent>
      </Card>
    </>
  );
}
