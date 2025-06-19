import React from "react";
import Link from "next/link";
import { Card, Typography } from "@repo/ui";
import { PageBreadcrumbs } from "@/components/breadcrumbs";
import { RouteEnums } from "@/constants/router/route-constants";

type Props = {};

function StudentMenu({}: Props) {
  const pageBreadcrumbs = [
    {
      title: "Dashboard",
      path: RouteEnums.DASHBOARD,
    },
    { title: "Student", path: RouteEnums.STUDENT },
  ];

  return (
    <>
      <PageBreadcrumbs pages={pageBreadcrumbs} />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
        {[
          {
            label: "Manage Students",
            desc: "Oversee all student activities and academic records.",
            url: RouteEnums.STUDENT_LIST,
          },
          {
            label: "Manage Grading",
            desc: "Oversee all student results and grading.",
            url: RouteEnums.STUDENT_GRADING,
          },
          {
            label: "Subject Registration",
            desc: "Register students for subjects offered in a calendar year.",
            url: RouteEnums.STUDENT_SUBJECT_REGISTRATION,
          },
        ].map(({ label, desc, url }: Record<string, any>, idx: number) => (
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
        ))}
      </div>
    </>
  );
}

export default StudentMenu;
