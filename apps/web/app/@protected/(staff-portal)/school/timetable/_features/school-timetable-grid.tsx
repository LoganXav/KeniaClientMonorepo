"use client";
import { CalendarGrid } from "@repo/ui";

import { Button } from "@repo/ui";
import { Card } from "@repo/ui";

import { RouteEnums } from "@/constants/router/route-constants";
import Link from "next/link";
import { CalendarCog } from "lucide-react";
import { LoadingContent } from "@/components/loading-content";

function SchoolTimetableGrid() {
  return (
    <>
      <div className="flex w-full pb-4 mt-8">
        <div className="hidden md:flex md:flex-1" />
        <div className="grid md:grid-cols-2 gap-4 w-full md:w-auto">
          <div />
          <Link className="" href={RouteEnums.SCHOOL_TIMETABLE_CREATE}>
            <Button className="w-full">
              Manage Timetable <CalendarCog size={18} strokeWidth={1} />
            </Button>
          </Link>
        </div>
      </div>
      {/* 
        <LoadingContent loading={timetableQueryResult?.isLoading} error={timetableQueryResult?.error} retry={timetableQueryResult?.refetch} data={timetableQueryResult?.data} shouldLoad={false}>
            <Card className="p-4 mb-8">
            <CalendarGrid events={events} views={["multiMonthYear", "dayGridMonth"]} />
            </Card>
        </LoadingContent>
      */}
    </>
  );
}

export default SchoolTimetableGrid;
