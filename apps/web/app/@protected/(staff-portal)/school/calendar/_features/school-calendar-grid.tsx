"use client";

import React from "react";
import Link from "next/link";
import { CalendarCog } from "lucide-react";
import { useAuthUser } from "@/hooks/use-auth-user";
import { Button, CalendarGrid, Card } from "@repo/ui";
import { parseCalendarDataToEvents } from "@/lib/dates";
import { LoadingContent } from "@/components/loading-content";
import { RouteEnums } from "@/constants/router/route-constants";
import { useGetCalendarQuery } from "@/apis/core-calendar-api/calendar";
import { PermissionRestrictor } from "@/components/permission-restrictor";
import { PERMISSIONS } from "@/constants/permissions/permission-constants";

function SchoolCalendarGrid() {
  const { authUserIds } = useAuthUser();
  const calendarQueryResult = useGetCalendarQuery({ params: { tenantId: authUserIds?.tenantId } });

  const events = parseCalendarDataToEvents(calendarQueryResult?.data?.data || []);

  return (
    <>
      <div className="flex w-full pb-4 mt-8">
        <div className="hidden md:flex md:flex-1" />
        <div className="grid md:grid-cols-2 gap-4 w-full md:w-auto">
          <div />
          <PermissionRestrictor requiredPermissions={[PERMISSIONS.SCHOOL_CALENDAR.CREATE]}>
            <Link className="" href={RouteEnums.SCHOOL_CALENDAR_CREATE}>
              <Button className="w-full">
                Manage Calendar <CalendarCog size={18} strokeWidth={1} />
              </Button>
            </Link>
          </PermissionRestrictor>
        </div>
      </div>
      <LoadingContent loading={calendarQueryResult?.isLoading} error={calendarQueryResult?.error} retry={calendarQueryResult?.refetch} data={calendarQueryResult?.data} shouldLoad={false}>
        <Card className="p-4 mb-8">
          <CalendarGrid events={events} views={["multiMonthYear", "dayGridMonth"]} />
        </Card>
      </LoadingContent>
    </>
  );
}

export default SchoolCalendarGrid;
