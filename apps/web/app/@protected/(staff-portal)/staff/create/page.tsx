import React from "react";
import { StaffCreateForm } from "./_features/staff-create-form";
import { RouteEnums } from "@/constants/router/route-constants";
import { PageBreadcrumbs } from "@/components/breadcrumbs";

type Props = {
  searchParams: {
    id?: string;
  };
};

function StaffCreatePage({ searchParams }: Props) {
  const staffId = searchParams.id ? parseInt(searchParams.id, 10) : undefined;

  const pageBreadcrumbs = [{ title: "Staff", path: RouteEnums.STAFF }, { title: "Staff List", path: RouteEnums.STAFF_LIST }, { title: staffId ? "Edit Staff" : "Employ Staff" }];
  return (
    <>
      <PageBreadcrumbs pages={pageBreadcrumbs} />
      <div className="mt-8">
        <StaffCreateForm staffId={staffId} />
      </div>
    </>
  );
}

export default StaffCreatePage;
