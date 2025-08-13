"use client";

import React from "react";
import Link from "next/link";
import useToggle from "@/hooks/use-toggle";
import { calculateAge } from "@/lib/dates";
import { DataTable } from "@/components/data-table";
import { useAuthUser } from "@/hooks/use-auth-user";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { LoadingContent } from "@/components/loading-content";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { RouteEnums } from "@/constants/router/route-constants";
import { useGetStudentListQuery } from "@/apis/core-student-api/student";
import { PermissionRestrictor } from "@/components/permission-restrictor";
import { PERMISSIONS } from "@/constants/permissions/permission-constants";
import { CirclePlus, Download, UserPenIcon, UserRound } from "lucide-react";
import { StudentCreateBulkImportDialog } from "../../create/_features/student-create-bulk-import-dialog";
import { Button, Card, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Typography } from "@repo/ui";

export function StudentListTable() {
  const { authUserIds } = useAuthUser();
  const [open, toggle] = useToggle(false);

  const handleOpenDialog = () => {
    // Ensure we're running this after the dropdown's click event has completed
    setTimeout(() => {
      toggle();
    }, 0);
  };

  const handleCloseDialog = React.useCallback(() => {
    toggle();
    setTimeout(() => {}, 200);
  }, [toggle]);

  const columns = React.useMemo<ColumnDef<any, unknown>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",

        cell: ({ row }: CellContext<any, unknown>) => (
          <div className="flex items-center space-x-4">
            <div className="relative w-12 h-12 border bg-primary rounded-full overflow-hidden flex items-center justify-center">
              <Typography className="font-heading text-background">
                {row?.original?.user?.firstName.charAt(0)} {row?.original?.user?.lastName.charAt(0)}
              </Typography>
              {/* <Image */}
              {/*   src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/backgrounds/login-security.svg" */}
              {/*   alt="staff-image" */}
              {/*   fill */}
              {/*   className="object-cover rounded-full" */}
              {/* /> */}
            </div>
            <div>
              <p>
                {row?.original?.user?.firstName} {row?.original?.user?.lastName}
              </p>
              <Typography color="muted">{row?.original?.user?.email}</Typography>
            </div>
          </div>
        ),
      },
      {
        header: "Class",
        accessorKey: "class",
        cell: ({ row }) => (
          <p>
            {row?.original?.class?.name} {row?.original?.classDivision?.name}
          </p>
        ),
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
                <PermissionRestrictor requiredPermissions={[PERMISSIONS.STUDENT.READ]}>
                  <Link href={`${RouteEnums.STUDENT}/${student?.id}`}>
                    <DropdownMenuItem className="flex justify-between">
                      View <UserRound className="ml-2" size={15} strokeWidth={1} />
                    </DropdownMenuItem>
                  </Link>
                </PermissionRestrictor>
                <PermissionRestrictor requiredPermissions={[PERMISSIONS.STUDENT.UPDATE]}>
                  <Link href={`${RouteEnums.STUDENT}/create?id=${student?.id}`}>
                    <DropdownMenuItem className="flex justify-between">
                      Edit <UserPenIcon className="ml-2" size={15} strokeWidth={1} />
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

  const studentListQueryResult = useGetStudentListQuery({ params: { tenantId: authUserIds?.tenantId } });

  return (
    <>
      <div className="flex w-full pb-4 mt-8">
        <div className="hidden md:flex md:flex-1" />
        <PermissionRestrictor requiredPermissions={[PERMISSIONS.STUDENT.CREATE]}>
          <div className="grid md:grid-cols-2 gap-4 w-full md:w-auto">
            <Button onClick={handleOpenDialog} className="w-full" variant={"outline"}>
              Bulk Import <Download size={18} strokeWidth={1} />
            </Button>
            <Link href={RouteEnums.STUDENT_CREATE}>
              <Button className="w-full">
                Enroll Student <CirclePlus size={18} strokeWidth={1} />
              </Button>
            </Link>
          </div>
        </PermissionRestrictor>
      </div>
      <Card className="overflow-hidden">
        <LoadingContent loading={studentListQueryResult?.isLoading} error={studentListQueryResult?.error} data={studentListQueryResult.data} retry={studentListQueryResult?.refetch}>
          <DataTable data={studentListQueryResult?.data?.data} columns={columns} />
        </LoadingContent>
      </Card>

      <StudentCreateBulkImportDialog open={open} onClose={handleCloseDialog} tenantId={authUserIds?.tenantId} />
    </>
  );
}
