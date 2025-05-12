import { Card, SelectItem, SelectContent, SelectValue, SelectTrigger, Select, Typography } from "@repo/ui";

export function DashboardEarnings() {
  return (
    <Card className="p-4 space-y-2 col-span-2 h-80">
      <div className="flex items-start justify-between">
        <Typography className="font-heading uppercase" size={"small"}>
          Earnings
        </Typography>
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
      </div>
    </Card>
  );
}
