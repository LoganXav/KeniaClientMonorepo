import React from "react";
import { PageBreadcrumbs } from "@/components/breadcrumbs";
import { WorkspaceTabs } from "./_features/workspace-tabs";
import { RouteEnums } from "@/constants/router/route-constants";
import { WorkspaceOverview } from "./_features/workspace-overview";

type Props = {};

function WorkspacePage({}: Props) {
  const pageBreadcrumbs = [
    { title: "Dashboard", path: RouteEnums.DASHBOARD },
    { title: "My Workspace", path: RouteEnums.WORKSPACE },
  ];

  return (
    <div className="pb-8">
      <PageBreadcrumbs pages={pageBreadcrumbs} />
      <div className="mt-8 space-y-12">
        <WorkspaceOverview />
        <WorkspaceTabs />
      </div>
    </div>
  );
}

export default WorkspacePage;
