import React from "react";
import { PageBreadcrumbs } from "@/components/breadcrumbs";
import { RouteEnums } from "@/constants/router/route-constants";
import { RolesAndPermissionsList } from "./_features/roles-and-permissions-list";

function RolesAndPermissionsPage() {
  const pageBreadcrumbs = [
    {
      title: "Dashboard",
      path: RouteEnums.DASHBOARD,
    },
    { title: "Roles & Permissions", path: RouteEnums.ROLES_AND_PERMISSIONS },
  ];

  return (
    <>
      <PageBreadcrumbs pages={pageBreadcrumbs} />
      <div className="mt-8">
        <RolesAndPermissionsList />
      </div>
    </>
  );
}

export default RolesAndPermissionsPage;
