"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { Card, Typography, CardContent, ChartContainer, ChartConfig, ChartTooltip, ChartTooltipContent } from "@repo/ui";
import React from "react";

export const description = "An interactive line chart";

export function DashboardEnrollment() {
  const chartData = [
    { date: "2016-06-01", male: 94, female: 120 }, // Low
    { date: "2017-06-01", male: 220, female: 270 }, // High
    { date: "2018-06-01", male: 80, female: 110 }, // Very Low
    { date: "2019-06-01", male: 260, female: 253 }, // Peak
    { date: "2020-06-01", male: 150, female: 150 }, // Drop
    { date: "2021-06-01", male: 250, female: 320 }, // High
    { date: "2022-06-01", male: 180, female: 100 }, // Very Low
    { date: "2023-06-01", male: 270, female: 290 }, // High
    { date: "2024-06-01", male: 120, female: 140 }, // Drop
    { date: "2025-06-01", male: 270, female: 330 }, // New Peak
  ];

  const chartConfig = {
    male: {
      label: "Male",
      color: "var(--chart-1)",
    },
    female: {
      label: "Female",
      color: "var(--chart-2)",
    },
    both: {
      label: "All",
      color: "var(--chart-3)",
    },
  } satisfies ChartConfig;

  const [activeChart, setActiveChart] = React.useState<"male" | "female" | "both">("male");

  const totals = React.useMemo(
    () => ({
      male: chartData.reduce((acc, curr) => acc + curr.male, 0),
      female: chartData.reduce((acc, curr) => acc + curr.female, 0),
      both: chartData.reduce((acc, curr) => acc + curr.male + curr.female, 0),
    }),
    []
  );

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <Typography size="small" className="uppercase font-heading">
          Enrollment & Demographics
        </Typography>
      </div>
      <div className="">
        <div className="flex flex-col">
          <div className="flex">
            {(["male", "female", "both"] as Array<keyof typeof chartConfig>).map((chart) => {
              return (
                <button key={chart} data-active={activeChart === chart} className="data-[active=true]:bg-accent flex flex-1 flex-col justify-center gap-1 border data-[active=true]:border-primary px-6 py-4 text-left" onClick={() => setActiveChart(chart)}>
                  <Typography size="small" color="muted">
                    {chartConfig[chart].label}
                  </Typography>
                  <Typography weight="medium">{totals[chart].toLocaleString()}</Typography>
                </button>
              );
            })}
          </div>
        </div>
        <CardContent className="px-2 sm:p-6">
          <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  // show short month + year e.g. "Jun 2025"
                  return date.toLocaleDateString("en-NG", {
                    month: "short",
                    year: "numeric",
                  });
                }}
              />
              <ChartTooltip
                content={(props) => (
                  <ChartTooltipContent
                    {...props}
                    className="w-[180px]"
                    {...(activeChart === "both" ? {} : { nameKey: activeChart })}
                    labelFormatter={(value: string | number | undefined) => {
                      if (!value) return "";
                      const date = new Date(value);
                      return date.toLocaleDateString("en-NG", {
                        month: "long",
                        year: "numeric",
                      });
                    }}
                  />
                )}
              />

              {/* If 'both', render both lines. Otherwise render the selected series. */}
              {activeChart === "both" ? (
                <>
                  <Line dataKey="male" type="monotone" stroke={chartConfig.male.color} strokeWidth={2} dot={true} name={chartConfig.male.label} />
                  <Line dataKey="female" type="monotone" stroke={chartConfig.female.color} strokeWidth={2} dot={true} name={chartConfig.female.label} />
                </>
              ) : (
                <Line dataKey={activeChart} type="monotone" stroke={chartConfig[activeChart].color || "currentColor"} strokeWidth={2} dot={true} />
              )}
            </LineChart>
          </ChartContainer>
        </CardContent>
      </div>
    </Card>
  );
}
