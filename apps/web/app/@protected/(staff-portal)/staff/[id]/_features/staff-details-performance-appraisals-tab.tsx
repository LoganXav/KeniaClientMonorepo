"use client";

import { StaffType } from "@/types";
import { Card, Typography } from "@repo/ui";
import React from "react";

type TabProps = {
  staff?: StaffType;
};

export function StaffDetailsPerformanceAppraisalsTab({ staff }: TabProps) {
  return (
    <Card>
      <Typography size="small" className="p-4 border-b font-heading uppercase">
        Performance & Appraisals
      </Typography>
      <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: "Performance Reviews", value: "Exceeds Expectations" },
          { label: "Feedback & Evaluations", value: "Positive feedback from peers" },
          { label: "Achievements & Awards", value: "Best Teacher Award 2022" },
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
