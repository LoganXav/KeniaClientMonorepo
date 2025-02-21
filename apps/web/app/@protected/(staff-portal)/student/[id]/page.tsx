import React from "react";
import StudentDetails from "./_features/student-details";
import { PageBreadcrumbs } from "@/components/breadcrumbs";
import { RouteEnums } from "@/constants/router/route-constants";

type Props = {
  params: {
    id: string;
  };
};

export default function StudentDetailsPage({ params }: Props) {
  const studentId = parseInt(params.id, 10);

  const pageBreadcrumbs = [{ title: "Student", path: RouteEnums.STUDENT }, { title: "Student List", path: RouteEnums.STUDENT_LIST }, { title: "Student Details" }];

  return (
    <>
      <PageBreadcrumbs pages={pageBreadcrumbs} />
      <div className="mt-8">
        <StudentDetails studentId={studentId} />
      </div>
    </>
  );
}
