import React from "react";
import { PageBreadcrumbs } from "@/components/breadcrumbs";
import { RouteEnums } from "@/constants/router/route-constants";
import { StudentSubjectRegistrationForm } from "./_features/student-subject-registration-form";

type Props = {
  searchParams: {
    id?: string;
  };
};

function StudentSubjectRegistrationPage({ searchParams }: Props) {
  const studentId = searchParams.id ? parseInt(searchParams.id, 10) : undefined;

  const pageBreadcrumbs = [{ title: "Student", path: RouteEnums.STUDENT }, { title: "Student List", path: RouteEnums.STUDENT_LIST }, { title: "Subject Registration" }];
  return (
    <>
      <PageBreadcrumbs pages={pageBreadcrumbs} />
      <div className="mt-8">
        <StudentSubjectRegistrationForm studentId={studentId} />
      </div>
    </>
  );
}

export default StudentSubjectRegistrationPage;
