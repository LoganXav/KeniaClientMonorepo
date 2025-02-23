import { PageBreadcrumbs } from "@/components/breadcrumbs";
import { RouteEnums } from "@/constants/router/route-constants";
import { Card, Typography } from "@repo/ui";
import Link from "next/link";
import React from "react";

type Props = {};

function ClassMenu({}: Props) {
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

export default ClassMenu;
