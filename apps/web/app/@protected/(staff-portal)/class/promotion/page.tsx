import React from "react";
import { PageBreadcrumbs } from "@/components/breadcrumbs";
import { RouteEnums } from "@/constants/router/route-constants";
import { ClassPromotionListTable } from "./_features/class-promotion-list-table";

type Props = {};

function ClassPromotionPage({}: Props) {
  const pageBreadcrumbs = [{ title: "Class", path: RouteEnums.CLASS }, { title: "Class Promotion" }];

  return (
    <div className="pb-8">
      <PageBreadcrumbs pages={pageBreadcrumbs} />
      <ClassPromotionListTable />
    </div>
  );
}

export default ClassPromotionPage;
