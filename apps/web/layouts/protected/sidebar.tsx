"use client";

import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@repo/ui";
import { ChevronLeft } from "lucide-react";
import React from "react";
// import { DashboardNav } from "./dashboard-nav";
// import { navItems } from "@/constants/site";

type SidebarProps = {
  className?: string;
};
export default function ProtectedSidebar({ className }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();
  const [status, setStatus] = React.useState(false);

  const handleToggle = () => {
    setStatus(true);
    toggle();
    setTimeout(() => setStatus(false), 500);
  };

  return (
    // <nav className={cn(`relative hidden min-h-screen flex-none border-r z-10 pt-20 md:block`, status && "duration-500", !isMinimized ? "w-72" : "w-[72px]", className)}>
    <div className="pt-24 border-r px-4 flex bg-black">
      {/* <ChevronLeft className={cn("absolute -right-3 top-20 cursor-pointer rounded-full border bg-background text-3xl text-foreground", isMinimized && "rotate-180")} onClick={handleToggle} /> */}
      {/* <div className="space-y-4 py-4"> */}
      {/* <div className="px-3 py-2"> */}
      {/* <div className="mt-3 space-y-1"> */}
      {/* <DashboardNav items={navItems} /> */}
      <div className="pt-8">Helloooooooooo</div>
      {/* <div /> */}
      {/* </div> */}
      {/* </div> */}
      {/* </div> */}
    </div>
  );
}
