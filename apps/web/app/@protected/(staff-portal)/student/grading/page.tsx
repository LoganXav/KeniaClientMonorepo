import React from "react";
import { PageBreadcrumbs } from "@/components/breadcrumbs";
import { RouteEnums } from "@/constants/router/route-constants";
import { StudentGradingTable } from "./_features/student-grading-table";

type Props = {};

function StudentGradingPage({}: Props) {
  const pageBreadcrumbs = [
    { title: "Student", path: RouteEnums.STUDENT },
    { title: "Student Grading", path: RouteEnums.STUDENT_GRADING },
  ];

  return (
    <div className="pb-8">
      <PageBreadcrumbs pages={pageBreadcrumbs} />
      <div className="mt-8">
        <StudentGradingTable />
      </div>
    </div>
  );
}

export default StudentGradingPage;
