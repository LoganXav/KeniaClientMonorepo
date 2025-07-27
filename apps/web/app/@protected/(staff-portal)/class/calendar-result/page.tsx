import React from "react";
import { PageBreadcrumbs } from "@/components/breadcrumbs";
import { RouteEnums } from "@/constants/router/route-constants";
import { ClassCalendarResultCollationListTable } from "./_features/class-calendar-result-collation-list-table";

type Props = {};

function ClassCalendarResultCollationPage({}: Props) {
  const pageBreadcrumbs = [{ title: "Class", path: RouteEnums.CLASS }, { title: "Session Result Collation" }];

  return (
    <div className="pb-8">
      <PageBreadcrumbs pages={pageBreadcrumbs} />
      <ClassCalendarResultCollationListTable />
    </div>
  );
}

export default ClassCalendarResultCollationPage;
