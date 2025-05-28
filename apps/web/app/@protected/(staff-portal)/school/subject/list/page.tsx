import React from "react";
import { PageBreadcrumbs } from "@/components/breadcrumbs";
import { RouteEnums } from "@/constants/router/route-constants";
import { SchoolSubjectListTable } from "./_features/school-subject-list-table";

type Props = {};

function SchoolSubjectListPage({}: Props) {
  const pageBreadcrumbs = [
    { title: "School", path: RouteEnums.SCHOOL },
    { title: "Subject List", path: RouteEnums.SCHOOL_SUBJECT_LIST },
  ];

  return (
    <div className="pb-8">
      <PageBreadcrumbs pages={pageBreadcrumbs} />
      <SchoolSubjectListTable />
    </div>
  );
}

export default SchoolSubjectListPage;
