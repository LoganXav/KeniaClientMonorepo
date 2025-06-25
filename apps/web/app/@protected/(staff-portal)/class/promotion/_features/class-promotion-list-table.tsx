"use client";

import React from "react";
import Link from "next/link";
import { ChartNoAxesCombined } from "lucide-react";
import { useAuthUser } from "@/hooks/use-auth-user";
import { DataTable } from "@/components/data-table";
import { LoadingContent } from "@/components/loading-content";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { RouteEnums } from "@/constants/router/route-constants";
import { PermissionRestrictor } from "@/components/permission-restrictor";
import { PERMISSIONS } from "@/constants/permissions/permission-constants";
import { Badge, Button, Card, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui";
import { useGetClassPromotionListQuery, useGetClassPromotionTemplateQuery } from "@/apis/core-class-api/class-promotion";

type Props = {};

export function ClassPromotionListTable({}: Props) {
  const { authUserIds } = useAuthUser();
  const [classId, setClassId] = React.useState(0);
  const [calendarId, setCalendarId] = React.useState(0);
  const [classDivisionId, setClassDivisionId] = React.useState(0);

  const columns = React.useMemo<ColumnDef<any, unknown>[]>(
    () => [
      {
        header: "Student Name",
        accessorKey: "name",
        cell: ({ row }: CellContext<any, unknown>) => (
          <div className="flex space-x-2">
            <p>
              {row?.original?.student?.user?.firstName} {row?.original?.student?.user?.lastName}
            </p>
          </div>
        ),
      },
      {
        header: "Current Class",
        accessorKey: "fromClass",
        cell: ({ row }) => <p>{row?.original?.fromClass?.name}</p>,
      },
      {
        header: "Next Class",
        accessorKey: "toClass",
        cell: ({ row }) => <p>{row?.original?.toClass?.name}</p>,
      },
      {
        header: "Promotion Decision",
        accessorKey: "promotionStatus",
        cell: ({ row }) => {
          const status = row.original.promotionStatus;
          let color: "default" | "destructive" | "secondary" | "outline" = "default";

          switch (status) {
            case "Promoted":
              color = "default";
              break;
            case "Withheld":
              color = "destructive";
              break;
          }

          return <Badge variant={color}>{status}</Badge>;
        },
      },
      {
        header: "Remarks",
        accessorKey: "comments",
      },
    ],
    []
  );

  const classPromotionTemplateQuery = useGetClassPromotionTemplateQuery(
    React.useMemo(
      () => ({
        params: {
          tenantId: authUserIds?.tenantId,
          classId: Number(classId),
          classDivisionId: Number(classDivisionId),
        },
      }),
      [classId, classDivisionId, authUserIds?.tenantId]
    )
  );

  const classPromotionTemplate = classPromotionTemplateQuery?.data?.data;

  const classListQueryResult = useGetClassPromotionListQuery({ params: { tenantId: authUserIds?.tenantId, calendarId: Number(calendarId), classId: Number(classId), classDivisionId: Number(classDivisionId) } });

  return (
    <>
      <div className="flex flex-col md:flex-row w-full gap-4 pb-4 mt-8 justify-between">
        <div className="grid md:grid-cols-4 xl:grid-cols-4 gap-4 w-full md:w-auto">
          <Select value={String(calendarId || "")} onValueChange={(value) => setCalendarId(Number(value))} disabled={classPromotionTemplateQuery?.isLoading}>
            <SelectTrigger>
              <SelectValue placeholder="Select Session" />
            </SelectTrigger>
            <SelectContent>
              {classPromotionTemplate?.calendarOptions?.map((calendarOption, idx) => (
                <SelectItem key={idx} value={String(calendarOption?.id)}>
                  {calendarOption?.year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={String(classId || "")} onValueChange={(value) => setClassId(Number(value))} disabled={!calendarId}>
            <SelectTrigger>
              <SelectValue placeholder="Class" />
            </SelectTrigger>
            <SelectContent>
              {classPromotionTemplate?.classOptions?.map((classOption, idx) => (
                <SelectItem key={idx} value={String(classOption?.id)}>
                  {classOption?.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={String(classDivisionId || "")} onValueChange={(value) => setClassDivisionId(Number(value))} disabled={!classId}>
            <SelectTrigger>
              <SelectValue placeholder="Class Division" />
            </SelectTrigger>
            <SelectContent>
              {classPromotionTemplate?.classDivisionOptions?.map((classDivisionOption, idx) => (
                <SelectItem key={idx} value={String(classDivisionOption?.id)}>
                  {classDivisionOption?.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <PermissionRestrictor requiredPermissions={[PERMISSIONS.CLASS_PROMOTION.CREATE]}>
          <Link className="w-full md:w-fit" href={RouteEnums.CLASS_PROMOTION_CREATE}>
            <Button className="w-full">
              Manage Promotions <ChartNoAxesCombined size={18} strokeWidth={1} />
            </Button>
          </Link>
        </PermissionRestrictor>
      </div>
      <Card className="overflow-hidden">
        <LoadingContent loading={classListQueryResult?.isLoading} data={classListQueryResult?.data} error={classListQueryResult?.error} retry={classListQueryResult?.refetch}>
          <DataTable data={classListQueryResult?.data?.data || []} columns={columns} />
        </LoadingContent>
      </Card>
    </>
  );
}
