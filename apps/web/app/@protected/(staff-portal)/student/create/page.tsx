import React from "react";
import { StudentCreateForm } from "./_features/student-create-form";
import { RouteEnums } from "@/constants/router/route-constants";
import { PageBreadcrumbs } from "@/components/breadcrumbs";

type Props = {
  searchParams: {
    id?: string;
  };
};

function StudentCreatePage({ searchParams }: Props) {
  const studentId = searchParams.id ? parseInt(searchParams.id, 10) : undefined;

  const pageBreadcrumbs = [{ title: "Student", path: RouteEnums.STUDENT }, { title: "Student List", path: RouteEnums.STUDENT_LIST }, { title: studentId ? "Edit Student" : "Enroll Student" }];
  return (
    <>
      <PageBreadcrumbs pages={pageBreadcrumbs} />
      <div className="mt-8">
        <StudentCreateForm studentId={studentId} />
      </div>
    </>
  );
}

export default StudentCreatePage;
