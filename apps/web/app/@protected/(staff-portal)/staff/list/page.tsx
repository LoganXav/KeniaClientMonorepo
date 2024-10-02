"use client";
import { DataTable, DataTableColumnHeader } from "@/components/data-table";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui";
import React from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { RouteEnums } from "@/constants/router/route-constants";
import Link from "next/link";

type Props = {};

function page({}: Props) {
  const columns = React.useMemo<ColumnDef<any, unknown>[]>(
    () => [
      {
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Province" />
        ),
        accessorKey: "province",
      },
      {
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Occupation" />
        ),
        accessorKey: "occupation",
      },
      {
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Gender" />
        ),
        accessorKey: "gender",
      },
      {
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Occupation" />
        ),
        accessorKey: "occupation",
      },
      {
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Gender" />
        ),
        accessorKey: "gender",
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
    [],
  );

  return (
    <div className="pb-8">
      <div className="flex justify-between w-full pb-4">
        <div />
        <Link href={RouteEnums.STAFF_CREATE}>
          <Button>Create Staff</Button>
        </Link>
      </div>
      <DataTable
        data={[
          {
            id: 1,
            province: "Lagos Island",
            occupation: "Student",
            gender: "Male",
          },
          {
            id: 2,
            province: "Lagos Island",
            occupation: "Student",
            gender: "Male",
          },
          {
            id: 3,
            province: "Lagos Island",
            occupation: "Student",
            gender: "Male",
          },
          {
            id: 4,
            province: "Lagos Island",
            occupation: "Student",
            gender: "Male",
          },
          {
            id: 5,
            province: "Lagos Island",
            occupation: "Student",
            gender: "Male",
          },
          {
            id: 6,
            province: "Lagos Island",
            occupation: "Student",
            gender: "Male",
          },
          {
            id: 7,
            province: "Lagos Island",
            occupation: "Student",
            gender: "Male",
          },
          {
            id: 7,
            province: "Lagos Island",
            occupation: "Student",
            gender: "Male",
          },
          {
            id: 7,
            province: "Lagos Island",
            occupation: "Student",
            gender: "Male",
          },
          {
            id: 7,
            province: "Lagos Island",
            occupation: "Student",
            gender: "Male",
          },
          {
            id: 7,
            province: "Lagos Island",
            occupation: "Student",
            gender: "Male",
          },
          {
            id: 7,
            province: "Lagos Island",
            occupation: "Student",
            gender: "Male",
          },
          {
            id: 7,
            province: "Lagos Island",
            occupation: "Student",
            gender: "Male",
          },
          {
            id: 7,
            province: "Lagos Island",
            occupation: "Student",
            gender: "Male",
          },
          {
            id: 7,
            province: "Lagos Island",
            occupation: "Student",
            gender: "Male",
          },
          {
            id: 7,
            province: "Lagos Island",
            occupation: "Student",
            gender: "Male",
          },
          {
            id: 7,
            province: "Lagos Island",
            occupation: "Student",
            gender: "Male",
          },
          {
            id: 7,
            province: "Lagos Island",
            occupation: "Student",
            gender: "Male",
          },
          {
            id: 7,
            province: "Lagos Island",
            occupation: "Student",
            gender: "Male",
          },
          {
            id: 7,
            province: "Lagos Island",
            occupation: "Student",
            gender: "Male",
          },
        ]}
        columns={columns}
      />
    </div>
  );
}

export default page;
