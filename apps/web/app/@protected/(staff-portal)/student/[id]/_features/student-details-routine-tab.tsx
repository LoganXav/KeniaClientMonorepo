"use client";

import { Card, Typography } from "@repo/ui";
import React from "react";

export function StudentDetailsRoutineTab() {
  return (
    <Card>
      <Typography variant="h6" className="p-4 border-b font-heading uppercase text-sm">
        Routine
      </Typography>
      <Typography className="p-4">Routine details</Typography>
    </Card>
  );
}
