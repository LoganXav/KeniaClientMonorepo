import React from "react";
import { PageBreadcrumbs } from "@/components/breadcrumbs";
import { RouteEnums } from "@/constants/router/route-constants";
import { StaffAssignForm } from "./_features/staff-assign-form";

function StaffAssignmentPage() {
  const pageBreadcrumbs = [{ title: "Staff", path: RouteEnums.STAFF }, { title: "Staff List", path: RouteEnums.STAFF_LIST }, { title: "Staff Assignment" }];
  return (
    <>
      <PageBreadcrumbs pages={pageBreadcrumbs} />
      <div className="mt-8">
        <StaffAssignForm />
      </div>
    </>
  );
}

export default StaffAssignmentPage;
