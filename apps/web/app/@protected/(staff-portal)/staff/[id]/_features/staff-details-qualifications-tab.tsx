"use client";

import { StaffType } from "@/types";
import { Card, Typography } from "@repo/ui";
import React from "react";

type TabProps = {
  staff?: StaffType;
};

export function StaffDetailsQualificationsTab({ staff }: TabProps) {
  return (
    <Card>
      <Typography size="small" className="p-4 border-b font-heading uppercase">
        Academic & Professional Qualifications
      </Typography>
      <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: "Degrees & Certifications", value: "B.Sc. Computer Science" },
          { label: "Institutions Attended", value: "University of Example" },
          { label: "Year of Graduation", value: "2015" },
          { label: "Specialized Training", value: "Project Management" },
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
