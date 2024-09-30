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
        id: "actions",
        cell: ({ row }) => {
          const payment = row.original;

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
                <DropdownMenuItem>View customer</DropdownMenuItem>
                <DropdownMenuItem>View payment details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [],
  );

  return (
    <div>
      <DataTable
        data={[
          { province: "Lagos Island", occupation: "Student", gender: "Male" },
          { province: "Lagos Island", occupation: "Student", gender: "Male" },
          { province: "Lagos Island", occupation: "Student", gender: "Male" },
          { province: "Lagos Island", occupation: "Student", gender: "Male" },
          { province: "Lagos Island", occupation: "Student", gender: "Male" },
          { province: "Lagos Island", occupation: "Student", gender: "Male" },
          { province: "Lagos Island", occupation: "Student", gender: "Male" },

          { province: "Lagos Island", occupation: "Student", gender: "Male" },
        ]}
        columns={columns}
      />
    </div>
  );
}

export default page;
