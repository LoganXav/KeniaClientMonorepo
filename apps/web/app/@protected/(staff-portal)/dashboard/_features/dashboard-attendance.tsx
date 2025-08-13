"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, Typography } from "@repo/ui";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@repo/ui";

export const description = "A donut chart showing attendance rate";

const chartData = [
  { status: "Present", value: 920, fill: "var(--chart-1)" },
  { status: "Absent", value: 50, fill: "var(--chart-2)" },
  { status: "Late", value: 30, fill: "var(--chart-3)" },
];

const chartConfig = {
  attendance: {
    label: "Attendance",
  },
  present: {
    label: "Present",
    color: "var(--chart-1)",
  },
  absent: {
    label: "Absent",
    color: "var(--chart-2)",
  },
  late: {
    label: "Late",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function DashboardAttendance() {
  const totalStudents = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, []);

  const attendanceRate = React.useMemo(() => {
    const presentCount = chartData.find((d) => d.status === "Present")?.value || 0;
    return ((presentCount / totalStudents) * 100).toFixed(1);
  }, [totalStudents]);

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <Typography size="small" className="uppercase font-heading">
          Attendance Rate
        </Typography>
      </div>
      <div className="flex justify-center items-center pb-0">
        <Typography color="muted">January - June 2024</Typography>
      </div>
      <div className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="value" nameKey="status" innerRadius={60} strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-2xl font-bold">
                          {attendanceRate}%
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          Present
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>
      <CardFooter className="flex-col gap-2">
        <div className="flex items-center gap-2 leading-none font-medium text-center">
          Trending up by 3.5% this term <TrendingUp className="h-4 w-4" />
        </div>
        <Typography size="small" color={"muted"} className="leading-none text-center">
          Showing attendance breakdown for the last 6 months
        </Typography>
      </CardFooter>
    </Card>
  );
}
