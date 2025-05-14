"use client";

import { Button, Card, Typography } from "@repo/ui";
import Image from "next/image";

export function DashboardQuickActions() {
  return (
    <Card className="p-4 space-y-2">
      <Typography className="font-heading uppercase" size={"small"}>
        Quick actions
      </Typography>
      <div className="grid sm:grid-cols-4 gap-4 overflow-x-scroll">
        {Array.from({ length: 4 }).map((_, index) => (
          <Button key={index} variant="outline" className="w-full border-border flex flex-col h-32 items-start text-left">
            <div className="rounded-full overflow-hidden w-10 h-10 relative bg-border">
              <Image src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/backgrounds/login-security.svg" fill alt="placeholder-img" className="h-full w-full object-center dark:brightness-[0.2] dark:grayscale" />
            </div>
            <Typography size={"p"} className="">
              Enroll a new student
            </Typography>
          </Button>
        ))}
      </div>
    </Card>
  );
}
