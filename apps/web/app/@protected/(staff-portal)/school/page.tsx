import { PageBreadcrumbs } from "@/components/breadcrumbs";
import { RouteEnums } from "@/constants/router/route-constants";
import { Card, Typography } from "@repo/ui";
import Link from "next/link";
import React from "react";

type Props = {};

function SchoolMenu({}: Props) {
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
            label: "Onboarding",
            desc: "Onboard school and its class divisions.",
            url: RouteEnums.SCHOOL_PROFILE,
          },
          {
            label: "Calendar",
            desc: "Manage school calendar and break periods.",
            url: RouteEnums.SCHOOL_CALENDAR,
          },
          {
            label: "Timetable",
            desc: "Manage school timetable and class schedules.",
            url: RouteEnums.SCHOOL_TIMETABLE,
          },
          {
            label: "Subjects",
            desc: "Manage school subjects and allocate them to classes.",
            url: RouteEnums.SUBJECT,
          },
        ].map(({ label, desc, url }: Record<string, any>, idx: number) => (
          <Link key={idx} href={url} className="block">
            <Card className="rounded-lg border p-6 space-y-1 hover:border-foreground transition-border duration-100 h-36">
              <Typography size="h3" className="font-heading">
                {label}
              </Typography>
              <Typography color="muted">{desc}</Typography>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}

export default SchoolMenu;
