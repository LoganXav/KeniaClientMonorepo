"use client";

import React from "react";
import { DataTable } from "@/components/data-table";
import { Button, Card, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { RouteEnums } from "@/constants/router/route-constants";
import Link from "next/link";
import { useGetStudentListQuery } from "@/apis/core-student-api/student";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { LoadingContent } from "@/components/loading-content";
import { CirclePlus, UserRound } from "lucide-react";
import { calculateAge } from "@/lib/dates";
import { useAuthUser } from "@/hooks/use-auth-user";

export function StudentListTable() {
  const { authUserIds } = useAuthUser();
  const columns = React.useMemo<ColumnDef<any, unknown>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
        cell: ({ row }: CellContext<any, unknown>) => (
          <div className="flex space-x-2">
            <p>
              {row?.original?.user?.firstName} {row?.original?.user?.lastName}
            </p>
          </div>
        ),
      },
      {
        header: "Class",
        accessorKey: "class",
        cell: ({ row }) => <p>{row?.original?.class?.type}</p>,
      },
      {
        header: "Gender",
        accessorKey: "gender",
        cell: ({ row }) => <p>{row?.original?.user?.gender}</p>,
      },
      {
        header: "Age",
        accessorKey: "dateOfBirth",
        cell: ({ row }) => <p>{calculateAge(row?.original?.user?.dateOfBirth)} yrs</p>,
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const student = row.original;
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
                <Link href={`${RouteEnums.STUDENT}/${student?.id}`}>
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

  const studentListQueryResult = useGetStudentListQuery({ params: { tenantId: authUserIds?.tenantId } });

  return (
    <>
      <div className="flex w-full pb-4 mt-8">
        <div className="hidden md:flex md:flex-1" />
        <div className="grid md:grid-cols-2 gap-4 w-full md:w-auto">
          <Select onValueChange={() => null} value={""}>
            <SelectTrigger className="w-auto h-10">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              {["Class", "Gender"].map((item, idx) => (
                <SelectItem key={idx} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Link href={RouteEnums.STUDENT_CREATE}>
            <Button className="w-full">
              Enroll Student <CirclePlus size={18} strokeWidth={1} />
            </Button>
          </Link>
        </div>
      </div>
      <Card className="overflow-hidden">
        <LoadingContent loading={studentListQueryResult?.isLoading} error={studentListQueryResult?.error} data={studentListQueryResult.data} retry={studentListQueryResult?.refetch}>
          <DataTable data={studentListQueryResult?.data?.data} columns={columns} />
        </LoadingContent>
      </Card>
    </>
  );
}
