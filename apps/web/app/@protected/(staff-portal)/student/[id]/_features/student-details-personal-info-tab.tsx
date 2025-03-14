"use client";

import { formatDateToString } from "@/lib/dates";
import { StudentType } from "@/types";
import { Card, Typography } from "@repo/ui";
import React from "react";

type TabProps = {
  student?: StudentType;
};

export function StudentDetailsPersonalInfoTab({ student }: TabProps) {
  return (
    <Card>
      <Typography size="small" className="p-4 border-b font-heading uppercase">
        Personal Information
      </Typography>
      <div className="p-4 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: "Full Name", value: student?.user?.lastName + " " + student?.user?.firstName },
          { label: "Date of Birth", value: formatDateToString(student?.user?.dateOfBirth || "") },
          { label: "Gender", value: student?.user?.gender },
          { label: "Blood Group", value: student?.user?.bloodGroup },
          { label: "Religion", value: student?.user?.religion },
        ].map((item, index) => (
          <div key={index} className="space-y-1">
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
