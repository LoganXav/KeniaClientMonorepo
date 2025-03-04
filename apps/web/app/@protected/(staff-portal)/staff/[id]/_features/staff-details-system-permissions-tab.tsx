"use client";

import { StaffType } from "@/types";
import { Card, Typography } from "@repo/ui";
import React from "react";

type TabProps = {
  staff?: StaffType;
};

export function StaffDetailsSystemPermissionsTab({ staff }: TabProps) {
  return (
    <Card>
      <Typography size="small" className="p-4 border-b font-heading uppercase">
        System & Permissions
      </Typography>
      <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: "User Role & Access Level", value: "Admin" },
          { label: "Last Login Activity", value: "2023-09-15 10:00 AM" },
          { label: "Device & IP Logins", value: "MacBook Pro, 192.168.1.1" },
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
