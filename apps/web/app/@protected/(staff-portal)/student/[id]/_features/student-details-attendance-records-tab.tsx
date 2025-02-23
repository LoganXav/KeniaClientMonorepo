"use client";

import { Card, Typography } from "@repo/ui";
import React from "react";

export function StudentDetailsAttendanceRecordsTab() {
  return (
    <Card>
      <Typography size="small" className="p-4 border-b font-heading uppercase">
        Attendance Records
      </Typography>
      <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: "Monthly Attendance", value: "95%" },
          { label: "Absence/Tardiness History", value: "2 days absent" },
          { label: "Attendance Percentage", value: "98%" },
        ].map((item, index) => (
          <div key={index} className="space-y-2">
            <Typography size="small" color="muted">
              {item.label}
            </Typography>
            <Typography>{item.value}</Typography>
          </div>
        ))}
      </div>
    </Card>
  );
}
