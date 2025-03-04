"use client";

import { StaffType } from "@/types";
import { Card, Typography } from "@repo/ui";
import React from "react";

type TabProps = {
  staff?: StaffType;
};

export function StaffDetailsSubjectsResponsibilitiesTab({ staff }: TabProps) {
  return (
    <Card>
      <Typography size="small" className="p-4 border-b font-heading uppercase">
        Subjects & Responsibilities
      </Typography>
      <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: "Courses/Subjects Taught", value: "Mathematics, Physics" },
          { label: "Class Assignments", value: "10th Grade" },
          { label: "Academic Advising Responsibilities", value: "Advisor for Science Club" },
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
