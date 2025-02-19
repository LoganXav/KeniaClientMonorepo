"use client";

import { Card, Typography } from "@repo/ui";
import React from "react";

export function StudentDetailsSalaryTab() {
  return (
    <Card>
      <Typography variant="h6" className="p-4 border-b font-heading uppercase text-sm">
        Salary
      </Typography>
      <Typography className="p-4">Salary details</Typography>
    </Card>
  );
}
