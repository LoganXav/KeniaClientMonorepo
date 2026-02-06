"use client";

import React from "react";
import { Card, Typography, CardContent, ChartContainer, ChartConfig, ChartTooltip, ChartTooltipContent, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, ScrollArea, ScrollBar } from "@repo/ui";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { mockSubjectFailures } from "@/mocks/data/analytics";
import { mockClassList } from "@/mocks/data";

export function SubjectFailuresTab() {
  const [selectedClassId, setSelectedClassId] = React.useState<number | undefined>(undefined);

  const filteredSubjects = React.useMemo(() => {
    if (!selectedClassId) return mockSubjectFailures;
    return mockSubjectFailures.filter((subject) => subject.classId === selectedClassId);
  }, [selectedClassId]);

  const chartData = filteredSubjects.map((subject) => ({
    subject: subject.subject,
    failureRate: subject.failureRate,
    avgScore: subject.avgScore,
  }));

  const chartConfig = {
    failureRate: {
      label: "Failure Rate %",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <Typography size="h5" className="font-heading">
            Failure Rates by Subject
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
        <CardContent className="px-2 sm:p-6">
          <ScrollArea className="w-full">
            <div className="min-w-[1000px]">
              <ChartContainer config={chartConfig} className="aspect-auto h-[350px] w-full">
                <BarChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 60,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="subject"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={60}
                    angle={-90}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    label={{ value: "Failure Rate %", angle: -90, position: "insideLeft" }}
                  />
                  <ChartTooltip
                    content={(props) => (
                      <ChartTooltipContent
                        {...props}
                        className="w-[180px]"
                      />
                    )}
                  />
                  <Bar dataKey="failureRate" fill={chartConfig.failureRate.color} radius={[4, 4, 0, 0]} name={chartConfig.failureRate.label} />
                </BarChart>
              </ChartContainer>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <Typography size="h5" className="font-heading mb-4">
            Worst-Performing Subjects
          </Typography>
          <div className="space-y-3">
            {filteredSubjects.slice(0, 5).map((subject, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-md hover:bg-accent transition-colors cursor-default">
                <div>
                  <Typography weight="medium">{subject.subject}</Typography>
                  <Typography size="small" color="muted">
                    {subject.studentCount} students
                  </Typography>
                </div>
                <div className="text-right">
                  <Typography weight="medium" className="text-destructive">
                    {subject.failureRate}%
                  </Typography>
                  <Typography size="small" color="muted">
                    Avg: {subject.avgScore}%
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <Typography size="h5" className="font-heading mb-4">
            Analysis Summary
          </Typography>
          <div className="space-y-3">
            <Typography>
              {filteredSubjects.length > 0 ? (
                <>
                  {filteredSubjects[0]?.subject} and {filteredSubjects[1]?.subject || filteredSubjects[0]?.subject} show the highest failure rates at {filteredSubjects[0]?.failureRate}% and {filteredSubjects[1]?.failureRate || filteredSubjects[0]?.failureRate}% respectively. These subjects require immediate attention and targeted intervention strategies.
                </>
              ) : (
                "No subject failure data available for the selected class."
              )}
            </Typography>
            {filteredSubjects.length > 0 && (
              <div className="space-y-2">
                <Typography weight="medium">Key Insights:</Typography>
                <ul className="space-y-2">
                  <li>
                    <Typography size="small">
                      1. Top 3 subjects account for {filteredSubjects.slice(0, 3).reduce((acc, s) => acc + s.failureRate, 0) / Math.min(3, filteredSubjects.length).toFixed(0)}% average failure rate
                    </Typography>
                  </li>
                  <li>
                    <Typography size="small">
                      2. STEM subjects (Math, Physics, Chemistry) show higher failure rates than humanities
                    </Typography>
                  </li>
                  <li>
                    <Typography size="small">
                      3. Average failure rate across all subjects: {Math.round(filteredSubjects.reduce((acc, s) => acc + s.failureRate, 0) / filteredSubjects.length)}%
                    </Typography>
                  </li>
                </ul>
              </div>
            )}
            <div className="mt-4 p-4 bg-accent rounded-md">
              <Typography weight="medium" className="mb-2">
                Recommended Action:
              </Typography>
              <Typography size="small">
                Implement remedial classes for Mathematics and Physics. Review curriculum delivery methods, provide additional teaching resources, and consider peer tutoring programs. Schedule regular assessments to track improvement and adjust teaching strategies accordingly.
              </Typography>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
