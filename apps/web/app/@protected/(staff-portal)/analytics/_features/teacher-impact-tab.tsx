"use client";

import React from "react";
import { Card, Typography, CardContent, ChartContainer, ChartConfig, ChartTooltip, ChartTooltipContent, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, ScrollArea, ScrollBar } from "@repo/ui";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { mockTeacherImpact } from "@/mocks/data/analytics";
import { mockClassList } from "@/mocks/data";

export function TeacherImpactTab() {
  const [selectedClassId, setSelectedClassId] = React.useState<number | undefined>(undefined);

  const filteredTeachers = React.useMemo(() => {
    if (!selectedClassId) return mockTeacherImpact;
    return mockTeacherImpact.filter((teacher) => teacher.classIds.includes(selectedClassId));
  }, [selectedClassId]);

  const chartData = filteredTeachers.map((teacher) => ({
    name: teacher.name, // First name only for chart
    improvement: teacher.avgStudentImprovement,
    subject: teacher.subject,
  }));

  const chartConfig = {
    improvement: {
      label: "Avg Student Improvement %",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
          <Typography size="h5" className="font-heading">
            Teacher Impact Metrics
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
        <Typography size="small" color="muted" className="mb-4">
          Impact is measured as average score improvement over time. Higher values indicate greater positive impact on student performance.
        </Typography>
        <CardContent className="px-2 sm:p-6">
          <ScrollArea className="w-full">
            <div className="min-w-[600px]">
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
                    label={{ value: "Improvement %", angle: -90, position: "insideLeft" }}
                  />
                  <ChartTooltip
                    content={(props) => (
                      <ChartTooltipContent
                        {...props}
                        className="w-[180px]"
                        formatter={(value, name, props) => {
                          const teacher = filteredTeachers.find((t) => t.name.split(" ")[0] === props.payload.name);
                          return [
                            `${value}%`,
                            teacher ? `${teacher.subject} - ${teacher.classCount} classes` : name,
                          ];
                        }}
                      />
                    )}
                  />
                  <Bar dataKey="improvement" fill={chartConfig.improvement.color} radius={[4, 4, 0, 0]} name={chartConfig.improvement.label} />
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
            Top Performers
          </Typography>
          <div className="space-y-3">
            {filteredTeachers.slice(0, 5).map((teacher, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-md hover:bg-accent transition-colors cursor-default">
                <div>
                  <Typography weight="medium">{teacher.name}</Typography>
                  <Typography size="small" color="muted">
                    {teacher.subject} • {teacher.classCount} {teacher.classCount === 1 ? "class" : "classes"}
                  </Typography>
                </div>
                <div className="text-right">
                  <Typography weight="medium" className="text-green-600">
                    +{teacher.avgStudentImprovement}%
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <Typography size="h5" className="font-heading mb-4">
            Impact Analysis
          </Typography>
          <div className="space-y-3">
            <Typography>
              {filteredTeachers.length > 0 ? (
                <>
                  {filteredTeachers[0]?.name} demonstrates the highest impact with an average student improvement of {filteredTeachers[0]?.avgStudentImprovement}% across {filteredTeachers[0]?.classCount} classes in {filteredTeachers[0]?.subject}. This performance significantly exceeds the school average.
                </>
              ) : (
                "No teacher impact data available for the selected class."
              )}
            </Typography>
            {filteredTeachers.length > 0 && (
              <div className="space-y-2">
                <Typography weight="medium">Key Insights:</Typography>
                <ul className="space-y-2">
                  <li>
                    <Typography size="small">
                      1. Average improvement across all teachers: {Math.round(filteredTeachers.reduce((acc, t) => acc + t.avgStudentImprovement, 0) / filteredTeachers.length)}%
                    </Typography>
                  </li>
                  <li>
                    <Typography size="small">
                      2. Top 3 teachers show {Math.round(filteredTeachers.slice(0, 3).reduce((acc, t) => acc + t.avgStudentImprovement, 0) / Math.min(3, filteredTeachers.length))}% average improvement
                    </Typography>
                  </li>
                  <li>
                    <Typography size="small">
                      3. Mathematics and English Language teachers show consistently high impact
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
                Recognize top-performing teachers and document their teaching methodologies. Organize peer learning sessions where high-impact teachers share best practices. Consider assigning additional classes or leadership roles to top performers. Review and potentially replicate successful teaching strategies across the school.
              </Typography>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
