"use client";

import Image from "next/image";
import { useAuthUser } from "@/hooks/use-auth-user";
import { LoadingContent } from "@/components/loading-content";
import { useGetAuthUserQuery } from "@/apis/core-user-api/user";
import { formatDateToString, formatTimeRange } from "@/lib/dates";
import { useGetPeriodQuery } from "@/apis/core-period-api/period";
import { PermissionRestrictor } from "@/components/permission-restrictor";
import { PERMISSIONS } from "@/constants/permissions/permission-constants";
import { Card, cn, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Typography } from "@repo/ui";

export function WorkspaceOverview() {
  const { authUserIds } = useAuthUser();
  // const { data: staff, isLoading, error, refetch } = useGetSingleStaffQuery({ path: { staffId: authUserIds?.id }, params: { tenantId: authUserIds?.tenantId } });
  const authUserQueryResult = useGetAuthUserQuery({ params: { tenantId: authUserIds?.tenantId, userId: authUserIds?.id } });
  const authUser = authUserQueryResult?.data?.data;

  const periodQueryResult = useGetPeriodQuery({ params: { tenantId: authUserIds?.tenantId, today: new Date() } });

  const period = periodQueryResult?.data?.data || [];

  return (
    <div>
      <div className="flex w-full pb-4">
        <div className="hidden md:flex md:flex-1" />
        <div className="grid md:grid-cols-1 gap-4 w-full md:w-auto">
          {/* <Select value={String("")}>
            <SelectTrigger className="w-auto h-10">
              <SelectValue placeholder="Quick Actions" />
            </SelectTrigger>
            <SelectContent>
              {["Apply for Leave", "Report an Issue"].map((item, idx) => (
                <SelectItem key={idx} value={String(item)}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="md:col-span-2 p-4 min-h-48">
          <LoadingContent data={authUserQueryResult?.data} loading={authUserQueryResult?.isLoading} error={authUserQueryResult?.error} retry={authUserQueryResult?.refetch}>
            <div className="p-4 border-b flex items-center gap-4">
              <div className="relative w-20 h-20 border rounded-md overflow-hidden">
                <Image src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/backgrounds/login-security.svg" alt="staff-image" fill className="object-cover rounded-full" />
              </div>
              <div>
                <Typography className="font-heading">
                  {authUser?.firstName} {authUser?.lastName}
                </Typography>
                <Typography>{authUser?.staff?.jobTitle}</Typography>
                <Typography>Joined: {formatDateToString(authUser?.staff?.startDate)}</Typography>
              </div>
            </div>
            <div className="p-4 space-y-2">
              <div className="uppercase text-sm font-heading pb-2">Basic Information</div>
              {[
                { label: "Gender", value: authUser?.gender },
                { label: "Date of Birth", value: formatDateToString(authUser?.dateOfBirth || "") },
              ].map((info, idx) => (
                <div key={idx} className="flex justify-between md:flex-col">
                  <Typography size="small" color="muted">
                    {info.label}
                  </Typography>
                  <Typography>{info.value}</Typography>
                </div>
              ))}
            </div>
          </LoadingContent>
        </Card>
        <PermissionRestrictor requiredPermissions={[PERMISSIONS.PERIOD.READ]}>
          <Card className="min-h-48">
            <LoadingContent data={periodQueryResult?.data} error={periodQueryResult?.error} loading={periodQueryResult?.isLoading} retry={periodQueryResult?.refetch}>
              <Typography className="font-heading uppercase border-b p-4" size={"small"}>
                Today's Class Periods
              </Typography>
              <div className="space-y-2 p-4">
                {period?.length > 0 ? (
                  period?.map((period, idx) => (
                    <div key={idx} className={cn("flex sm:flex-row flex-col gap-2 justify-between sm:items-center px-2 pb-2", idx <= 2 && "border-b")}>
                      <div>
                        <Typography>{period?.subject}</Typography>
                        <Typography size="small" color="muted">
                          {period?.class} {period?.classDivision}
                        </Typography>
                      </div>
                      <Typography>{formatTimeRange(period?.startTime, period?.endTime)}</Typography>
                    </div>
                  ))
                ) : (
                  <div className="w-full flex justify-center">
                    <Typography color="muted">You have no periods today.</Typography>
                  </div>
                )}
              </div>
            </LoadingContent>
          </Card>
        </PermissionRestrictor>
      </div>
    </div>
  );
}
