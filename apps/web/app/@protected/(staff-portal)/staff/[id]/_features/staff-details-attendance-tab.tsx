"use client";

import { Card } from "@repo/ui";

export function StaffDetailsAttendanceTab() {
  return (
    <div className="space-y-4">
      <Card>
        <div className="p-4 border-b font-heading uppercase text-sm">Leave Summary</div>
        <div className="p-4">{/* Leave summary content */}</div>
      </Card>

      <Card>
        <div className="p-4 border-b font-heading uppercase text-sm">Attendance History</div>
        <div className="p-4">{/* Attendance history content */}</div>
      </Card>
    </div>
  );
}
