"use client";

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, SearchInput, Sheet, SheetContent, SheetTrigger, Tabs, TabsContent, TabsList, TabsTrigger, DialogTitle } from "@repo/ui";
import ProtectedSidebar from "./sidebar";
import { ThemeToggler } from "@/components/theme-tooggler";
import { Bell, CircleAlert, LoaderCircle, Menu, UserCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { clearAuthUserAction } from "@/helpers/server/auth-user-action";
import { RouteEnums } from "@/constants/router/route-constants";
import Link from "next/link";
import React from "react";
import { useAuthUser } from "@/hooks/use-auth-user";
import { useGetAuthUserQuery } from "@/apis/core-user-api/user";

export default function ProtectedNavbar() {
  const router = useRouter();
  const [notificationType, setNotificationType] = React.useState("all");
  const [isOpen, setIsOpen] = React.useState(false);
  const { deleteAuthUserIds } = useAuthUser();

  async function handleSignOut() {
    deleteAuthUserIds();
    clearAuthUserAction();
    router.push(RouteEnums.HOME);
  }

  // Fetch auth user data
  const authUserQueryResult = useGetAuthUserQuery();
  const authUser = authUserQueryResult?.data?.data;

  return (
    <Sheet>
      <div className="sticky top-0 h-[70px] right-0 left-0 border-b border-gray-300 z-50">
        <nav className="h-full container flex items-center justify-between bg-card">
          <div className="flex gap-4">
            <SheetTrigger className="lg:hidden">
              <Menu />
            </SheetTrigger>

            <div className="hidden md:flex">
              <SearchInput placeholder="Search..." />
            </div>
          </div>

          <div className="flex items-center gap-8">
            <ThemeToggler />

            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-lg border-none bg-transparent shadow-none" variant="outline" size="icon">
                  <Bell strokeWidth={1} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[400px]" align="end">
                <div className="px-1 md:px-4 pt-4">
                  <DropdownMenuLabel className="flex justify-between items-center">
                    <p className="text-base">Notifications</p>
                    <Button className="rounded-lg border-none bg-transparent shadow-none" variant="outline" size="icon" onClick={() => setIsOpen(false)}>
                      <X size={16} strokeWidth={1} />
                    </Button>
                  </DropdownMenuLabel>

                  <Tabs value={notificationType} onValueChange={(value) => setNotificationType(value)} className="w-full space-y-8 py-6">
                    <TabsList className="grid grid-cols-2 h-9">
                      <TabsTrigger className="h-9 text-sm" value="all">
                        All
                      </TabsTrigger>
                      <TabsTrigger className="h-9 text-sm" value="unread">
                        Unread (0)
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="all">
                      <div className="border p-4 flex items-center space-x-2 rounded-md">
                        <CircleAlert size={16} strokeWidth={1} /> <p className="text-sm text-muted-foreground">You have no notifications.</p>
                      </div>
                    </TabsContent>
                    <TabsContent value="unread">
                      <div className="border p-4 flex items-center space-x-2 rounded-md">
                        <CircleAlert size={16} strokeWidth={1} /> <p className="text-sm text-muted-foreground">You have no notifications.</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
                <DropdownMenuSeparator />
                <div className="p-4 w-full flex">
                  <div className="flex-1" />
                  <div className="flex items-center gap-4">
                    <p className="border-foreground pl-4 text-xs">
                      <Link href={"#"} className="font-semibold text-muted-foreground transition-colors hover:text-link underline pl-1">
                        Go to settings.
                      </Link>
                    </p>
                    <Button size={"xs"} variant={"outline"}>
                      Mark all as read
                    </Button>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-lg border-none bg-transparent shadow-none" variant="outline" size="icon">
                  <UserCircle strokeWidth={1} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {authUserQueryResult?.isLoading ? (
                    <LoaderCircle className="animate-spin duration-300 mx-auto" size={15} />
                  ) : (
                    <div>
                      {authUser?.firstName} <span className="font-sans-semibold">{authUser?.lastName}</span>
                    </div>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled={authUserQueryResult?.isLoading} onClick={handleSignOut}>
                  Log out
                </DropdownMenuItem>
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
