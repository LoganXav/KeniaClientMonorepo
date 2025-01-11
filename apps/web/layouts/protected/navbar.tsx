"use client";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, SearchInput, Sheet, SheetContent, SheetTrigger } from "@repo/ui";
import "./navbar.css";
import ProtectedSidebar from "./sidebar";
import { ThemeToggler } from "@/components/theme-tooggler";
import { Bell, Menu, User, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { clearAuthUser } from "@/helpers/auth-user-action";
import { RouteEnums } from "@/constants/router/route-constants";

export default function ProtectedNavbar() {
  const router = useRouter();

  async function handleSignOut() {
    clearAuthUser();
    router.push(RouteEnums.HOME);
  }

  return (
    <Sheet>
      <div className="navbar__container">
        <nav className="container navbar bg-card">
          <div className="flex gap-4">
            <SheetTrigger className="lg:hidden">
              <Menu />
            </SheetTrigger>

            <div className="hidden md:flex">
              <SearchInput placeholder="Search..." />
            </div>
          </div>

          <div className="navbar__right">
            <ThemeToggler />
            <Button className="rounded-lg border-none bg-transparent shadow-none" variant="outline" size="icon">
              <Bell strokeWidth={1} />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-lg border-none bg-transparent shadow-none" variant="outline" size="icon">
                  <UserCircle strokeWidth={1} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </div>

      <SheetContent>
        <ProtectedSidebar />
      </SheetContent>
    </Sheet>
  );
}
