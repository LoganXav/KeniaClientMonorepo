"use client";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@repo/ui";
import React from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { RouteEnums } from "@/constants/router/route-constants";
import Link from "next/link";
import { useGetStaffListQuery } from "@/apis/core-staff-api/staff";
import { CellContext, ColumnDef, RowData } from "@tanstack/react-table";

type Props = {};

function StaffListPage({}: Props) {
  const columns = React.useMemo<ColumnDef<any, unknown>[]>(
    () => [
      {
        header: "Expatriate Name",
        accessorKey: "name",
        cell: ({ row }: CellContext<any, unknown>) => (
          <div className="flex space-x-2">
            <p>{row?.original?.user?.firstName}</p>
            <p>{row?.original?.user?.lastName}</p>
          </div>
        ),
      },
      {
        header: "Passport Number",
        accessorKey: "passportNumber",
      },
      {
        header: "Applicant Type",
        accessorKey: "applicantType",
      },
      {
        header: "Request Type",
        accessorKey: "requestType",
        cell: ({ row }) => <p>{row.original.user.phoneNumber}</p>,
      },
      {
        header: "Date Applied",
        accessorKey: "dateApplied",
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

  const { data } = useGetStaffListQuery();

  return (
    <div className="pb-8">
      <div className="flex justify-between w-full pb-4">
        <div />
        <Link href={RouteEnums.STAFF_CREATE}>
          <Button className="py-6 rounded-lg">Create Staff</Button>
        </Link>
      </div>
      <DataTable data={data?.data} columns={columns} />
    </div>
  );
}

export default StaffListPage;
