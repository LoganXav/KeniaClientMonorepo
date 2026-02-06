"use client";

import React from "react";
import { DataTable } from "@/components/data-table";
import { ColumnDef, CellContext } from "@tanstack/react-table";
import { Card, Typography, CardContent, ChartContainer, ChartConfig, ChartTooltip, ChartTooltipContent, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, ScrollArea, ScrollBar } from "@repo/ui";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { mockAtRiskStudents } from "@/mocks/data/analytics";
import { mockClassList } from "@/mocks/data";
import { AtRiskStudent } from "../_types/analytics-types";

export function AtRiskStudentsTab() {
  const [selectedClassId, setSelectedClassId] = React.useState<number | undefined>(undefined);

  const filteredStudents = React.useMemo(() => {
    if (!selectedClassId) return mockAtRiskStudents;
    return mockAtRiskStudents.filter((student) => student.classId === selectedClassId);
  }, [selectedClassId]);

  const chartData = filteredStudents.map((student) => ({
    name: student.name, // First name only for chart
    attendance: student.attendancePercent,
    avgScore: student.avgScore,
  }));

  const chartConfig = {
    attendance: {
      label: "Attendance %",
      color: "var(--chart-1)",
    },
    avgScore: {
      label: "Avg Score",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  const columns = React.useMemo<ColumnDef<AtRiskStudent, unknown>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
        cell: ({ row }: CellContext<AtRiskStudent, unknown>) => (
          <Typography>{row.original.name}</Typography>
        ),
      },
      {
        header: "Grade",
        accessorKey: "grade",
        cell: ({ row }: CellContext<AtRiskStudent, unknown>) => (
          <Typography>{row.original.grade}</Typography>
        ),
      },
      {
        header: "Attendance %",
        accessorKey: "attendancePercent",
        cell: ({ row }: CellContext<AtRiskStudent, unknown>) => (
          <Typography>{row.original.attendancePercent}%</Typography>
        ),
      },
      {
        header: "Avg Score",
        accessorKey: "avgScore",
        cell: ({ row }: CellContext<AtRiskStudent, unknown>) => (
          <Typography>{row.original.avgScore}%</Typography>
        ),
      },
      {
        header: "Risk Score",
        accessorKey: "riskScore",
        cell: ({ row }: CellContext<AtRiskStudent, unknown>) => (
          <Typography weight="medium" className={row.original.riskScore >= 80 ? "text-destructive" : row.original.riskScore >= 70 ? "text-orange-500" : "text-muted-foreground"}>
            {row.original.riskScore}
          </Typography>
        ),
      },
      {
        header: "Risk Explanation",
        accessorKey: "riskExplanation",
        cell: ({ row }: CellContext<AtRiskStudent, unknown>) => (
          <Typography size="small" color="muted">
            {row.original.riskExplanation}
          </Typography>
        ),
      },
    ],
    []
  );

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <Typography size="h5" className="font-heading">
            Top At-Risk Students
          </Typography>
          <Select
            value={selectedClassId ? String(selectedClassId) : "all"}
            onValueChange={(value) => setSelectedClassId(value === "all" ? undefined : Number(value))}
          >
            <SelectTrigger className="w-auto min-w-[180px]">
              <SelectValue placeholder="All Classes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              {mockClassList.map((cls) => (
                <SelectItem key={cls.id} value={String(cls.id)}>
                  {cls.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DataTable data={filteredStudents} columns={columns} showPagination={false} />
      </Card>

      <Card className="p-6">
        <Typography size="h5" className="font-heading mb-4">
          Score vs Attendance Correlation
        </Typography>
        <CardContent className="px-2 sm:p-6">
          <ScrollArea className="w-full">
            <div className="min-w-[1000px]">
              <ChartContainer config={chartConfig} className="aspect-auto h-[300px] w-full">
                <BarChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={50}
                    angle={-90}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <ChartTooltip
                    content={(props) => (
                      <ChartTooltipContent
                        {...props}
                        className="w-[180px]"
                      />
                    )}
                  />
                  <Bar dataKey="attendance" fill={chartConfig.attendance.color} radius={[4, 4, 0, 0]} name={chartConfig.attendance.label} />
                  <Bar dataKey="avgScore" fill={chartConfig.avgScore.color} radius={[4, 4, 0, 0]} name={chartConfig.avgScore.label} />
                </BarChart>
              </ChartContainer>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="p-6">
        <Typography size="h5" className="font-heading mb-4">
          Analysis Summary
        </Typography>
        <div className="space-y-3">
          <Typography>
            Analysis shows {filteredStudents.filter((s) => s.riskScore >= 80).length} students require immediate intervention, with risk scores above 80. These students exhibit patterns of low attendance (below 60%) combined with declining academic performance.
          </Typography>
          <div className="space-y-2">
            <Typography weight="medium">Key Insights:</Typography>
            <ul className="space-y-2">
              <li>
                <Typography size="small">
                 1. Average attendance for at-risk students: {filteredStudents.length > 0 ? Math.round(filteredStudents.reduce((acc, s) => acc + s.attendancePercent, 0) / filteredStudents.length) : 0}%
                </Typography>
              </li>
              <li>
                <Typography size="small">
                 2. Average score for at-risk students: {filteredStudents.length > 0 ? Math.round(filteredStudents.reduce((acc, s) => acc + s.avgScore, 0) / filteredStudents.length) : 0}%
                </Typography>
              </li>
              <li>
                <Typography size="small">
                  3. Strong negative correlation observed between attendance and academic performance
                </Typography>
              </li>
            </ul>
          </div>
          <div className="mt-4 p-4 bg-accent rounded-md">
            <Typography weight="medium" className="mb-2">
              Recommended Action:
            </Typography>
            <Typography size="small">
              Implement targeted intervention programs for the top 3 at-risk students. Schedule parent-teacher meetings, assign academic mentors, and create personalized attendance improvement plans. Monitor progress bi-weekly and adjust strategies based on student response.
            </Typography>
          </div>
        </div>
      </Card>
    </div>
  );
}
