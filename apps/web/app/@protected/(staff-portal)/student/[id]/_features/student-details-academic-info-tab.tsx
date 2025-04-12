"use client";

import { formatDateToString } from "@/lib/dates";
import { StudentType } from "@/types";
import { Card, Typography } from "@repo/ui";
import React from "react";

type TabProps = {
  student?: StudentType;
};

export function StudentDetailsAcademicInfoTab({ student }: TabProps) {
  return (
    <Card>
      <Typography size="small" className="p-4 border-b font-heading uppercase">
        Academic Information
      </Typography>
      <div className="p-4 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: "Student ID", value: student?.id },
          { label: "Admission Number", value: student?.admissionNo },
          { label: "Enrollment Date", value: formatDateToString(student?.enrollmentDate || "") },
          // { label: "Class & Division", value: student?.class?.type + " - " + student?.class?.classDivision || "" },
          { label: "Assigned Subjects", value: "" },
          { label: "Attendance Record", value: "" },
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
