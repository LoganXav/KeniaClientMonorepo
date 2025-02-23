"use client";

import { Card, Typography } from "@repo/ui";
import React from "react";

export function StudentDetailsDocumentsCertificationsTab() {
  return (
    <Card>
      <Typography size="small" className="p-4 border-b font-heading uppercase">
        Documents & Certifications
      </Typography>
      <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: "Admission Letter", value: "Available" },
          { label: "ID Card", value: "Issued" },
          { label: "Report Cards", value: "Available" },
          { label: "Certificates", value: "None" },
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
