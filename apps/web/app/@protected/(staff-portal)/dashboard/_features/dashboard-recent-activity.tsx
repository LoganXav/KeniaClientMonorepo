"use client";

import { Typography, Card } from "@repo/ui";

export function DashboardRecentActivity() {
  return (
    <Card className="p-4 space-y-2 h-96">
      <Typography className="font-heading uppercase" size={"small"}>
        Recent activity
      </Typography>
    </Card>
  );
}
