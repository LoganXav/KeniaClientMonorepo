"use client";

import { useGetClassDivisionListQuery } from "@/apis/core-class-api/class-division";
import { Button, Card, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@repo/ui";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import Link from "next/link";
import { RouteEnums } from "@/constants/router/route-constants";
import { CirclePlus, UserRound } from "lucide-react";
import { LoadingContent } from "@/components/loading-content";
import { DataTable } from "@/components/data-table";

export function ClassDivisionListTable() {
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
      // {
      //   header: "Class Teacher",
      //   accessorKey: "class",
      //   cell: ({ row }) => (
      //     <p>
      //       {row?.original?.class?.classTeacher?.user?.firstName} {row?.original?.class?.classTeacher?.user?.lastName}
      //     </p>
      //   ),
      // },

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

  const classDivisionListQueryResult = useGetClassDivisionListQuery();

  return (
    <>
      <div className="flex w-full pb-4 mt-8">
        <div className="hidden md:flex md:flex-1" />

        <Link className="w-full md:w-auto" href={RouteEnums.CLASS_DIVISION_CREATE}>
          <Button className="w-full">
            Create Class Division <CirclePlus size={18} strokeWidth={1} />
          </Button>
        </Link>
      </div>

      <Card className="overflow-hidden">
        <LoadingContent loading={classDivisionListQueryResult?.isLoading} error={classDivisionListQueryResult?.error} data={classDivisionListQueryResult.data} retry={classDivisionListQueryResult?.refetch}>
          <DataTable data={classDivisionListQueryResult?.data?.data} columns={columns} />
        </LoadingContent>
      </Card>
    </>
  );
}
