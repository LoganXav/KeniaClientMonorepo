import React from "react";
import { RouteEnums } from "@/constants/router/route-constants";
import { StudentListTable } from "./_features/student-list-table";
import { PageBreadcrumbs } from "@/components/breadcrumbs";

type Props = {};

function StudentListPage({}: Props) {
  const pageBreadcrumbs = [
    { title: "Student", path: RouteEnums.STUDENT },
    { title: "Student List", path: RouteEnums.STUDENT_LIST },
  ];

  return (
    <div className="pb-8">
      <PageBreadcrumbs pages={pageBreadcrumbs} />
      <StudentListTable />
    </div>
  );
}

export default StudentListPage;
