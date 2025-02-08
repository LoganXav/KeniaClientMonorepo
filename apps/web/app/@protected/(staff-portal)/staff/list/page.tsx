import React from "react";
import { RouteEnums } from "@/constants/router/route-constants";
import { StaffListTable } from "./_features/staff-list-table";
import { PageBreadcrumbs } from "@/components/breadcrumbs";

type Props = {};

function StaffListPage({}: Props) {
  const pageBreadcrumbs = [
    { title: "Staff", path: RouteEnums.STAFF },
    { title: "Staff List", path: RouteEnums.STAFF_LIST },
  ];

  return (
    <div className="pb-8">
      <PageBreadcrumbs pages={pageBreadcrumbs} />
      <StaffListTable />
    </div>
  );
}

export default StaffListPage;
