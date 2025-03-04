import React from "react";
import { RouteEnums } from "@/constants/router/route-constants";
import { ClassListTable } from "./_features/class-list-table";
import { PageBreadcrumbs } from "@/components/breadcrumbs";

type Props = {};

function ClassListPage({}: Props) {
  const pageBreadcrumbs = [
    { title: "Class", path: RouteEnums.CLASS },
    { title: "Class List", path: RouteEnums.CLASS_LIST },
  ];

  return (
    <div className="pb-8">
      <PageBreadcrumbs pages={pageBreadcrumbs} />
      <ClassListTable />
    </div>
  );
}

export default ClassListPage;
