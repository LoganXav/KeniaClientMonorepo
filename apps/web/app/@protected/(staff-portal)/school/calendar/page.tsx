import React from "react";
import { PageBreadcrumbs } from "@/components/breadcrumbs";
import { RouteEnums } from "@/constants/router/route-constants";
import SchoolCalendarGrid from "./_features/school-calendar-grid";
type Props = {};

function SchoolCalendar({}: Props) {
  const pageBreadcrumbs = [
    {
      title: "School",
      path: RouteEnums.SCHOOL,
    },
    { title: "Calendar", path: RouteEnums.SCHOOL_CALENDAR },
  ];

  return (
    <>
      <PageBreadcrumbs pages={pageBreadcrumbs} />
      <div className="mt-8">
        <SchoolCalendarGrid />
      </div>
    </>
  );
}

export default SchoolCalendar;
