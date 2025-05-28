import React from "react";
import { PageBreadcrumbs } from "@/components/breadcrumbs";
import { RouteEnums } from "@/constants/router/route-constants";
import { SchoolGradingStructureList } from "./_features/school-grading-structure-list";

type Props = {};

function SchoolGradingStructureListPage({}: Props) {
  const pageBreadcrumbs = [
    { title: "School", path: RouteEnums.SCHOOL },
    { title: "Grading Structure List", path: RouteEnums.SCHOOL_GRADING_LIST },
  ];

  return (
    <div className="pb-8">
      <PageBreadcrumbs pages={pageBreadcrumbs} />
      <SchoolGradingStructureList />
    </div>
  );
}

export default SchoolGradingStructureListPage;
