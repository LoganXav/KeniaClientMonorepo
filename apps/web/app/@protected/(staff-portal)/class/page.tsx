import React from "react";
import Link from "next/link";
import { Card, Typography } from "@repo/ui";
import { hasAllPermissions } from "@/lib/permissions";
import { getAuthUserServer } from "@/helpers/auth-user";
import { PageBreadcrumbs } from "@/components/breadcrumbs";
import { RouteEnums } from "@/constants/router/route-constants";
import { PERMISSIONS } from "@/constants/permissions/permission-constants";

type Props = {};

function ClassMenu({}: Props) {
  const authUser = getAuthUserServer();
  const permissions = authUser?.data?.staff?.role?.permissions!;

  const pageBreadcrumbs = [
    {
      title: "Dashboard",
      path: RouteEnums.DASHBOARD,
    },
    { title: "Class", path: RouteEnums.CLASS },
  ];

  return (
    <>
      <PageBreadcrumbs pages={pageBreadcrumbs} />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
        {[
          {
            label: "Manage Classes",
            desc: "Oversee all class activities and departmental assignments.",
            url: RouteEnums.CLASS_LIST,
            permissionNames: [PERMISSIONS.CLASS.READ],
          },
          {
            label: "Manage Divisions",
            desc: "Manage class divisions, inventory and their assigned teachers.",
            url: RouteEnums.CLASS_DIVISION_LIST,
            permissionNames: [PERMISSIONS.CLASS_DIVISION.READ],
          },
          {
            label: "Term Results Collation",
            desc: "Compile and finalize students' term results across all subjects.",
            url: RouteEnums.CLASS_TERM_RESULT_COLLATION,
            permissionNames: [PERMISSIONS.CLASS_TERM_RESULT_COLLATION.READ],
          },
          {
            label: "Session Results Collation",
            desc: "Compile and finalize students' session results across all subjects.",
            url: RouteEnums.CLASS_CALENDAR_RESULT_COLLATION,
            permissionNames: [PERMISSIONS.CLASS_CALENDAR_RESULT_COLLATION.READ],
          },
          {
            label: "Promotion Decision",
            desc: "Promote or repeat students based on their academic performance.",
            url: RouteEnums.CLASS_PROMOTION,
            permissionNames: [PERMISSIONS.CLASS_PROMOTION.READ],
          },
        ].map(({ label, desc, url, permissionNames }: { label: string; desc: string; url: string; permissionNames: string[] }, idx: number) => {
          {
            if (!hasAllPermissions(permissions, permissionNames)) {
              return null;
            }
          }
          return (
            <Link key={idx} href={url} className="block">
              <Card className="rounded-lg border p-6 space-y-1 hover:border-foreground transition-border duration-100 h-36">
                <Typography size="h4" className="font-heading line-clamp-1">
                  {label}
                </Typography>
                <Typography color="muted" className="line-clamp-2">
                  {desc}
                </Typography>
              </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default ClassMenu;
