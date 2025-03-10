"use client";

import { CalendarCog } from "lucide-react";
import { RouteEnums } from "@/constants/router/route-constants";
import { Button, CalendarGrid, Card } from "@repo/ui";
import Link from "next/link";
import React from "react";

function SchoolCalendarGrid() {
  const events = [
    { title: "Multi-Day Event", start: "2025-03-04", end: "2025-03-10" },
    { title: "3rd Term Examination Week", date: "2025-03-08" },
    { title: "Event 3", date: "2025-03-07" },
  ];
  return (
    <>
      <div className="flex w-full pb-4 mt-8">
        <div className="hidden md:flex md:flex-1" />
        <div className="grid md:grid-cols-2 gap-4 w-full md:w-auto">
          <div />
          <Link className="" href={RouteEnums.SCHOOL_CALENDAR_CREATE}>
            <Button className="w-full">
              Manage Calendar <CalendarCog size={18} strokeWidth={1} />
            </Button>
          </Link>
        </div>
      </div>
      <Card className="p-4 mb-8">
        <CalendarGrid events={events} />
      </Card>
    </>
  );
}

export default SchoolCalendarGrid;
