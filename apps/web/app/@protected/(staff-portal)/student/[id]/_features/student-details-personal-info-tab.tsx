"use client";

import { Card, Typography } from "@repo/ui";
import React from "react";

export function StudentDetailsPersonalInfoTab() {
  return (
    <Card>
      <Typography variant="h6" className="p-4 border-b font-heading uppercase text-sm">
        Personal Information
      </Typography>
      <Typography className="p-4">Details</Typography>
    </Card>
  );
}
