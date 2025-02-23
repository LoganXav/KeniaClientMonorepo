"use client";

import { Card, Typography } from "@repo/ui";
import React from "react";

export function StudentDetailsPerformanceReportsTab() {
  return (
    <Card>
      <Typography size="small" className="p-4 border-b font-heading uppercase">
        Performance & Reports
      </Typography>
      <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: "Recent Grades", value: "A, B, A" },
          { label: "Overall GPA/CGPA", value: "3.8" },
          { label: "Exam Reports", value: "Excellent" },
          { label: "Subject-wise Performance", value: "Math: A, Science: B" },
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
