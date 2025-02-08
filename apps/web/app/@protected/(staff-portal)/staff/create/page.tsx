import React from "react";
import { StaffCreateForm } from "./_features/staff-create-form";
import { RouteEnums } from "@/constants/router/route-constants";
import { PageBreadcrumbs } from "@/components/breadcrumbs";

type Props = {};

function StaffCreatePage({}: Props) {
  const pageBreadcrumbs = [
    { title: "Staff", path: RouteEnums.STAFF },
    { title: "Staff List", path: RouteEnums.STAFF_LIST },
    { title: "Employ Staff", path: RouteEnums.STAFF_CREATE },
  ];
  return (
    <>
      <PageBreadcrumbs pages={pageBreadcrumbs} />
      <div className="mt-8">
        <StaffCreateForm />
      </div>
    </>
  );
}

export default StaffCreatePage;
