"use client";

import { Typography, Card, SelectContent, SelectItem, SelectTrigger, SelectValue, Select } from "@repo/ui";

export function DashboardAttendance() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card className="p-4 space-y-2 h-96">
        <Typography className="font-heading uppercase" size={"small"}>
          Students
        </Typography>
      </Card>

      <Card className="p-4 space-y-2 h-96">
        <div className="flex items-start justify-between">
          <Typography className="font-heading uppercase" size={"small"}>
            Attendance
          </Typography>
          <div className="flex items-center gap-2">
            <Select onValueChange={() => null} value={String("")}>
              <SelectTrigger className="w-auto h-auto p-0 border-none leading-none">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                {["Weekly", "Monthly"].map((item, idx) => (
                  <SelectItem key={idx} value={String(item)}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={() => null} value={String("")}>
              <SelectTrigger className="w-auto h-auto p-0 border-none leading-none">
                <SelectValue placeholder="Class" />
              </SelectTrigger>
              <SelectContent>
                {["JSS1", "JSS2", "JSS3", "SSS1", "SSS2", "SSS3"].map((item, idx) => (
                  <SelectItem key={idx} value={String(item)}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>
    </div>
  );
}
