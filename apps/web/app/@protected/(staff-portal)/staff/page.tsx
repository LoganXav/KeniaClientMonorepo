import { RouteEnums } from "@/constants/router/route-constants";
import { Card, CardDescription, CardTitle } from "@repo/ui";
import Link from "next/link";
import React from "react";

type Props = {};

function Staff({}: Props) {
  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {[
          {
            label: "Manage Staff",
            desc: "Oversee all staff activities, employment details, and departmental assignments.",
            url: RouteEnums.STAFF_LIST,
          },
          {
            label: "Manage Staff",
            desc: "Oversee all staff activities, employment details, and departmental assignments.",
            url: RouteEnums.STAFF_LIST,
          },
          {
            label: "Manage Staff",
            desc: "Oversee all staff activities, employment details, and departmental assignments.",
            url: RouteEnums.STAFF_LIST,
          },
          {
            label: "Manage Staff",
            desc: "Oversee all staff activities, employment details, and departmental assignments.",
            url: RouteEnums.STAFF_LIST,
          },
        ].map(({ label, desc, url }: Record<string, any>, idx: number) => (
          <Link key={idx} href={url} className="block">
            <Card className="rounded-lg border p-6 space-y-2 hover:border-foreground transition-border duration-100">
              <CardTitle className="font-heading">{label}</CardTitle>
              <CardDescription>{desc}</CardDescription>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Staff;
