"use client";

import { StudentType } from "@/types";
import { Card, Typography } from "@repo/ui";
import React from "react";

type TabProps = {
  student?: StudentType;
};

export function StudentDetailsGuardiansInfoTab({ student }: TabProps) {
  return (
    <div className="grid space-y-4">
      {student?.guardians.map((guardian, idx) => (
        <Card key={guardian.id}>
          <Typography size="small" className="p-4 border-b font-heading uppercase">
            Guardian Information {idx + 1}
          </Typography>
          <div className="p-4 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: "Parent/Guardian Full Name", value: guardian.lastName + " " + guardian.firstName },
              { label: "Email", value: guardian.email },
              { label: "Relationship", value: guardian.relationship },
              { label: "Contact Information", value: guardian.phoneNumber },
              { label: "Address", value: guardian.residentialAddress },
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
      ))}
    </div>
  );
}
