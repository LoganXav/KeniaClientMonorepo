"use client";

import React from "react";
import { DataTable } from "@/components/data-table";
import { Button, Card, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@repo/ui";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { RouteEnums } from "@/constants/router/route-constants";
import Link from "next/link";
import { useGetStaffListQuery } from "@/apis/core-staff-api/staff";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { formatDateToString } from "@/lib/dates";
import { useAuthUser } from "@/hooks/use-auth-user";

type Props = {};

export function StaffListTable({}: Props) {
  const columns = React.useMemo<ColumnDef<any, unknown>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
        cell: ({ row }: CellContext<any, unknown>) => (
          <div className="flex space-x-2">
            <p>{row?.original?.user?.firstName}</p>
            <p>{row?.original?.user?.lastName}</p>
          </div>
        ),
      },
      {
        header: "Phone Number",
        accessorKey: "phoneNumber",
        cell: ({ row }) => <p>{row?.original?.user?.phoneNumber}</p>,
      },
      {
        header: "Gender",
        accessorKey: "gender",
        cell: ({ row }) => <p>{row?.original?.user?.gender}</p>,
      },
      {
        header: "Job Title",
        accessorKey: "jobTitle",
      },

      {
        header: "Date Joined",
        accessorKey: "startDate",
        cell: ({ row }) => <p>{formatDateToString(row?.original?.startDate)}</p>,
      },

      {
        id: "actions",
        cell: ({ row }) => {
          const staff = row.original;

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
                <Link href={`${RouteEnums.STAFF}/${staff.id}`}>
                  <DropdownMenuItem>View</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    []
  );

  const { authUserIds } = useAuthUser();

  const { data } = useGetStaffListQuery();

  return (
    <Card className="p-4">
      <DataTable data={data?.data} columns={columns} />
    </Card>
  );
}
