"use client";

import { Card, Typography } from "@repo/ui";
import React from "react";

export function StudentDetailsExtracurricularActivitiesTab() {
  return (
    <Card>
      <Typography size="small" className="p-4 border-b font-heading uppercase">
        Extracurricular Activities
      </Typography>
      <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: "Club Memberships", value: "Science Club" },
          { label: "Sports Participation", value: "Basketball" },
          { label: "Achievements & Awards", value: "MVP 2023" },
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
