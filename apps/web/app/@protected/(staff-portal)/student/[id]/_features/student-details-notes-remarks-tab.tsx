"use client";

import { Card, Typography } from "@repo/ui";
import React from "react";

export function StudentDetailsNotesRemarksTab() {
  return (
    <Card>
      <Typography size="small" className="p-4 border-b font-heading uppercase">
        Notes & Remarks
      </Typography>
      <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: "Teacher Notes", value: "Needs improvement in math" },
          { label: "Special Needs/Accommodations", value: "None" },
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
