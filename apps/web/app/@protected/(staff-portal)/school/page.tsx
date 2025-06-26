import React from "react";
import Link from "next/link";
import { Card, Typography } from "@repo/ui";
import { hasAllPermissions } from "@/lib/permissions";
import { getAuthUserServer } from "@/helpers/auth-user";
import { PageBreadcrumbs } from "@/components/breadcrumbs";
import { RouteEnums } from "@/constants/router/route-constants";
import { PERMISSIONS } from "@/constants/permissions/permission-constants";

type Props = {};

function SchoolMenu({}: Props) {
  const authUser = getAuthUserServer();
  const permissions = authUser?.data?.staff?.role?.permissions!;

  const pageBreadcrumbs = [
    {
      title: "Dashboard",
      path: RouteEnums.DASHBOARD,
    },
    { title: "School", path: RouteEnums.SCHOOL },
  ];

  return (
    <>
      <PageBreadcrumbs pages={pageBreadcrumbs} />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
        {[
          {
            label: "Profile",
            desc: "Manage school profile and general inform.",
            url: RouteEnums.SCHOOL_PROFILE,
            permissionNames: [PERMISSIONS.SCHOOL.UPDATE],
          },
          {
            label: "Calendar",
            desc: "Manage school calendar and break periods.",
            url: RouteEnums.SCHOOL_CALENDAR,
            permissionNames: [PERMISSIONS.SCHOOL_CALENDAR.READ],
          },
          {
            label: "Timetables",
            desc: "Manage school timetable and class schedules.",
            url: RouteEnums.SCHOOL_TIMETABLE,
            permissionNames: [PERMISSIONS.SCHOOL_TIMETABLE.READ],
          },
          {
            label: "Grading Policy",
            desc: "Manage school grading system and grade scales.",
            url: RouteEnums.SCHOOL_GRADING_LIST,
            permissionNames: [PERMISSIONS.SCHOOL_GRADING_POLICY.READ],
          },
          {
            label: "Subjects",
            desc: "Manage school subjects and allocate them to classes.",
            url: RouteEnums.SCHOOL_SUBJECT_LIST,
            permissionNames: [PERMISSIONS.SUBJECT.READ],
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
                <Typography size="h3" className="font-heading line-clamp-1">
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

export default SchoolMenu;
