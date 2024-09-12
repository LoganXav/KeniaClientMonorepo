// import ThemeToggle from "../theme-toggle";
// import { MobileSidebar } from "./mobile-nav";
// import { UserNav } from "./user-nav";

import { cn } from "@repo/ui";

export function ProtectedNavbar() {
  return (
    <div className="w-full supports-backdrop-blur:bg-background/60 left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="w-full flex h-14 items-center justify-between px-20">
        <div className="hidden md:block text-5xl">Logo</div>
        <div className={cn("block md:!hidden")}>{/* <MobileSidebar /> */}</div>

        <div className="flex items-center gap-8">
          {/* <UserNav /> */}
          <div>UserNav</div>
          <div>ThemeToggle</div>
          {/* <ThemeToggle /> */}
        </div>
      </nav>
    </div>
  );
}
