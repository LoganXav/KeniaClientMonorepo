import React from "react";
import { PageBreadcrumbs } from "@/components/breadcrumbs";
import { RouteEnums } from "@/constants/router/route-constants";
import { AnalyticsTabs } from "./_features/analytics-tabs";

type Props = {};

function AnalyticsPage({}: Props) {
  const pageBreadcrumbs = [
    {
      title: "Dashboard",
      path: RouteEnums.DASHBOARD,
    },
    { title: "Analytics", path: RouteEnums.ANALYTICS },
  ];

  return (
    <div className="pb-8">
      <PageBreadcrumbs pages={pageBreadcrumbs} />
      <div className="mt-8">
        <AnalyticsTabs />
      </div>
    </div>
  );
}

export default AnalyticsPage;
