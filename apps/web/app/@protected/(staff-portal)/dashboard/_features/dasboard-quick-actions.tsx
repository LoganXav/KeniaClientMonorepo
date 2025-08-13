"use client";

import Image from "next/image";
import { MoveRight } from "lucide-react";
import { Card, Typography } from "@repo/ui";

export function DashboardQuickActions() {
  const dashboardMetrics = [
    {
      img: "/audience.png",
      number: 56,
      title: "Number of Staff",
    },
    { img: "/students.png", number: 723, title: "Number of Students" },
    { img: "/school.png", number: 25, title: "Upcoming Events" },
  ];
  return (
    <div className="grid sm:grid-cols-3 gap-4 overflow-x-scroll">
      {dashboardMetrics.map(({ img, number, title }, index) => (
        <Card key={index} className="px-4">
          <div className="flex items-center gap-3 border-b border-dashed py-4">
            <div className="rounded-md overflow-hidden w-12 h-12 relative bg-border">
              <Image src={img} fill alt="placeholder-img" className="h-full w-full object-center" />
            </div>
            <div className="">
              <Typography>{number}</Typography>
              <Typography size="small" color="muted">
                {title}
              </Typography>
            </div>
          </div>
          <div className="flex justify-between items-center py-4 w-full cursor-pointer">
            <Typography size={"small"} className="">
              View details
            </Typography>
            <MoveRight strokeWidth={1} size={16} />
          </div>
        </Card>
      ))}
    </div>
  );
}
