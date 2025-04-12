"use client";

import { Card, Typography } from "@repo/ui";
import React from "react";

export function StudentDetailsAttendanceTab() {
  return (
    <Card>
      <Typography size="h6" className="p-4 border-b font-heading uppercase text-sm">
        Attendance
      </Typography>
      <Typography className="p-4">Attendance details</Typography>
    </Card>
  );
}
