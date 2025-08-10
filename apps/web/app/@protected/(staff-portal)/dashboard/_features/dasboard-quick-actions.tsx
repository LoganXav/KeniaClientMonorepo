"use client";

import Image from "next/image";
import { MoveRight } from "lucide-react";
import { Card, Typography } from "@repo/ui";

export function DashboardQuickActions() {
  return (
    <div className="grid sm:grid-cols-3 gap-4 overflow-x-scroll">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className="px-4">
          <div className="flex items-center gap-3 border-b border-dashed py-4">
            <div className="rounded-md overflow-hidden w-12 h-12 relative bg-border">
              <Image
                src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/backgrounds/login-security.svg"
                fill
                alt="placeholder-img"
                className="h-full w-full object-center dark:brightness-[0.2] dark:grayscale"
              />
            </div>
            <div className="">
              <Typography>56</Typography>
              <Typography size="small" color="muted">
                Enrolled courses
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
