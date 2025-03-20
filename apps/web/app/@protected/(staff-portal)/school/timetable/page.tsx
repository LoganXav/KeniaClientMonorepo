import React from "react";
import { PageBreadcrumbs } from "@/components/breadcrumbs";
import { RouteEnums } from "@/constants/router/route-constants";
import SchoolTimetableGrid from "./_features/school-timetable-grid";

type Props = {};

function SchoolTimetable({}: Props) {
  const pageBreadcrumbs = [
    {
      title: "School",
      path: RouteEnums.SCHOOL,
    },
    { title: "Timetable", path: RouteEnums.SCHOOL_TIMETABLE },
  ];

  return (
    <>
      <PageBreadcrumbs pages={pageBreadcrumbs} />
      <div className="mt-8">
        <SchoolTimetableGrid />
      </div>
    </>
  );
}

export default SchoolTimetable;
