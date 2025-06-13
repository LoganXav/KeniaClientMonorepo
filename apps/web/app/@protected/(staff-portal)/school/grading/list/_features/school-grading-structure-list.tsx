"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDateToString } from "@/lib/dates";
import { ColumnDef } from "@tanstack/react-table";
import { useAuthUser } from "@/hooks/use-auth-user";
import { DataTable } from "@/components/data-table";
import { CirclePlus, UserRound } from "lucide-react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { LoadingContent } from "@/components/loading-content";
import { RouteEnums } from "@/constants/router/route-constants";
import { useGetSchoolGradingStructureListQuery } from "@/apis/core-tenant-api/tenant-grading-structure";
import { Button, Card, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@repo/ui";

export function SchoolGradingStructureList() {
  const router = useRouter();
  const { authUserIds } = useAuthUser();

  const schoolGradingStructureQueryListResult = useGetSchoolGradingStructureListQuery({ path: {}, params: { tenantId: authUserIds?.tenantId } });

  const columns = React.useMemo<ColumnDef<any, unknown>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Exam ( % )",
        accessorKey: "examWeight",
      },
      {
        header: "Continuous Assessment ( % )",
        accessorKey: "continuousAssessmentWeight",
      },
      {
        header: "Used By",
        accessorKey: "classes",
        cell: ({ row }) => (
          <p>
            {row.original.classes.length} class{row.original.classes.length > 1 && "es"}
          </p>
        ),
      },
      {
        header: "Last Updated",
        accessorKey: "updatedAt",
        cell: ({ row }) => <p>{formatDateToString(row?.original?.updatedAt)}</p>,
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const gradeStructureItem = row?.original;

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
                <Link href={`${RouteEnums.SCHOOL_GRADING_CREATE}?id=${gradeStructureItem?.id}`}>
                  <DropdownMenuItem className="flex justify-between">
                    Edit <UserRound className="ml-2" size={15} strokeWidth={1} />
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

  return (
    <>
      <div className="flex w-full pb-4 mt-8">
        <div className="hidden md:flex md:flex-1" />
        <div className="grid gap-4 w-full md:w-auto">
          <Button className="w-full" onClick={() => router.push(RouteEnums.SCHOOL_GRADING_CREATE)}>
            Add Grading Policy <CirclePlus size={18} strokeWidth={1} />
          </Button>
        </div>
      </div>
      <Card className="overflow-hidden">
        <LoadingContent loading={schoolGradingStructureQueryListResult?.isLoading} error={schoolGradingStructureQueryListResult?.error} data={schoolGradingStructureQueryListResult?.data} retry={schoolGradingStructureQueryListResult?.refetch}>
          <DataTable data={schoolGradingStructureQueryListResult?.data?.data} columns={columns} />
        </LoadingContent>
      </Card>
    </>
  );
}
