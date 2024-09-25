import { RouteEnums } from "@/constants/router/route-constants";
import { Card, CardDescription, CardTitle } from "@repo/ui";
import Link from "next/link";
import React from "react";

type Props = {};

function Staff({}: Props) {
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {[
          {
            label: "Staff employment",
            desc: "Manage staff employment",
            url: RouteEnums.STAFF_EMPLOYMENT,
          },
        ].map(({ label, desc, url }: Record<string, any>, idx: number) => (
          <Link key={idx} href={url}>
            <Card className="rounded-md border p-4">
              <CardTitle>{label}</CardTitle>
              <CardDescription>{desc}</CardDescription>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Staff;
