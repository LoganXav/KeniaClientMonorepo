import React from "react";
import StaffDetails from "./_features/staff-details";
import { PageBreadcrumbs } from "@/components/breadcrumbs";
import { RouteEnums } from "@/constants/router/route-constants";

type Props = {
  params: {
    id: string;
  };
};

export default function StaffDetailsPage({ params }: Props) {
  const staffId = parseInt(params.id, 10);

  const pageBreadcrumbs = [{ title: "Staff", path: RouteEnums.STAFF }, { title: "Staff List", path: RouteEnums.STAFF_LIST }, { title: "Staff Details" }];

  return (
    <>
      <PageBreadcrumbs pages={pageBreadcrumbs} />
      <div className="mt-8">
        <StaffDetails staffId={staffId} />
      </div>
    </>
  );
}
