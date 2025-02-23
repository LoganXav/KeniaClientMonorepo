"use client";

import { Card, Typography } from "@repo/ui";
import React from "react";

export function StudentDetailsFeePaymentsTab() {
  return (
    <Card>
      <Typography size="small" className="p-4 border-b font-heading uppercase">
        Fee & Payments
      </Typography>
      <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: "Fee Structure", value: "$5000/year" },
          { label: "Payment Status", value: "Paid" },
          { label: "Due Dates", value: "N/A" },
          { label: "Payment History", value: "Paid on 01/01/2023" },
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
