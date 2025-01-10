"use client";
import { SearchInput, Sheet, SheetContent, SheetTrigger } from "@repo/ui";
import "./navbar.css";
import ProtectedSidebar from "./sidebar";
import { ThemeToggler } from "@/components/theme-tooggler";

export default function ProtectedNavbar() {
  return (
    <Sheet>
      <div className="navbar__container">
        <nav className="container navbar bg-background">
          <div className="flex gap-4">
            <SheetTrigger className="lg:hidden">Menu Trigger</SheetTrigger>

            <div>
              <SearchInput placeholder="Search..." />
            </div>
          </div>

          <div className="navbar__right">
            <ThemeToggler />
            <div>Notification</div>
            <div>Avatar</div>
          </div>
        </nav>
      </div>

      <SheetContent>
        <ProtectedSidebar />
      </SheetContent>
    </Sheet>
  );
}
