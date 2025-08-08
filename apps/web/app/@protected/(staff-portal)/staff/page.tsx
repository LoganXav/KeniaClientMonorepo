import React from "react";
import Link from "next/link";
import { Card, Typography } from "@repo/ui";
import { hasAllPermissions } from "@/lib/permissions";
import { getAuthUserServer } from "@/helpers/auth-user";
import { PageBreadcrumbs } from "@/components/breadcrumbs";
import { RouteEnums } from "@/constants/router/route-constants";
import { PERMISSIONS } from "@/constants/permissions/permission-constants";

type Props = {};

function StaffMenu({}: Props) {
  const authUser = getAuthUserServer();
  const permissions = authUser?.data?.staff?.role?.permissions!;

  const pageBreadcrumbs = [
    {
      title: "Dashboard",
      path: RouteEnums.DASHBOARD,
    },
    { title: "Staff", path: RouteEnums.STAFF },
  ];

  return (
    <>
      <PageBreadcrumbs pages={pageBreadcrumbs} />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
        {[
          {
            label: "Manage Staff",
            desc: "Oversee all staff activities and departmental assignments.",
            url: RouteEnums.STAFF_LIST,
            permissionNames: [PERMISSIONS.STAFF.READ],
          },
          // {
          //   label: "Manage Payroll",
          //   desc: "Oversee all staff payment and payment history.",
          //   url: RouteEnums.STAFF_LIST,
          //   permissionNames: [],
          // },
          {
            label: "Staff Assignment",
            desc: "Assign and review staff class and subject duties.",
            url: RouteEnums.STAFF_ASSIGN,
            permissionNames: [PERMISSIONS.STAFF.UPDATE],
          },
        ].map(
          (
            {
              label,
              desc,
              url,
              permissionNames,
            }: {
              label: string;
              desc: string;
              url: string;
              permissionNames: string[];
            },
            idx: number,
          ) => {
            {
              if (!hasAllPermissions(permissions, permissionNames)) {
                return null;
              }
            }
            return (
              <Link key={idx} href={url} className="block">
                <Card className="rounded-lg border p-6 space-y-1 hover:border-primary transition-border duration-100 h-36">
                  <Typography size="h4" className="font-heading line-clamp-1">
                    {label}
                  </Typography>
                  <Typography color="muted" className="line-clamp-2">
                    {desc}
                  </Typography>
                </Card>
              </Link>
            );
          },
        )}
      </div>
    </>
  );
}

export default StaffMenu;
