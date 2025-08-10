"use client";

import {
  Card,
  SelectItem,
  SelectContent,
  SelectValue,
  SelectTrigger,
  Select,
  Typography,
} from "@repo/ui";

export function DashboardLessons() {
  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <Typography size="small" className="uppercase font-heading">
          Lessons
        </Typography>
        <Select onValueChange={() => null} value={String("")}>
          <SelectTrigger className="w-auto h-auto leading-none">
            <SelectValue placeholder="Period" />
          </SelectTrigger>
          <SelectContent>
            {["This term", "This month"].map((item, idx) => (
              <SelectItem key={idx} value={String(item)}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        {[1, 2, 3].map((id) => (
          <Card key={id} className="p-4 flex items-center justify-between">
            <div>
              <Typography>126</Typography>
              <Typography size={"small"} color="muted">
                Total quiz
              </Typography>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}
