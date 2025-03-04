"use client";

import { StaffType } from "@/types";
import { Card, Typography } from "@repo/ui";
import React from "react";

type TabProps = {
  staff?: StaffType;
};

export function StaffDetailsDocumentsCertificationsTab({ staff }: TabProps) {
  return (
    <Card>
      <Typography size="small" className="p-4 border-b font-heading uppercase">
        Documents & Certifications
      </Typography>
      <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: "Uploaded CV", value: "Available" },
          { label: "Certificates", value: "Available" },
          { label: "Employment Contract", value: "Signed" },
          { label: "ID Documents", value: "Verified" },
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
