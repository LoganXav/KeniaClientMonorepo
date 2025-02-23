"use client";

import { Card, Typography } from "@repo/ui";
import React from "react";

export function StudentDetailsTimetableScheduleTab() {
  return (
    <Card>
      <Typography size="small" className="p-4 border-b font-heading uppercase">
        Timetable & Schedule
      </Typography>
      <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: "Class Schedule", value: "Mon-Fri, 8 AM - 3 PM" },
          { label: "Upcoming Exams", value: "Math on 10/10/2023" },
          { label: "School Events", value: "Science Fair on 15/10/2023" },
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
