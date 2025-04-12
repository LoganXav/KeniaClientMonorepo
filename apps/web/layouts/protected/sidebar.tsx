"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, cn, Typography } from "@repo/ui";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { RouteEnums } from "@/constants/router/route-constants";
import { Home, Users, User, Building2, Settings, Sliders, FileText, Shield, Building } from "lucide-react";

export default function ProtectedSidebar() {
  const pathname = usePathname();

  const routeGroups: routeGroups[] = [
    {
      header: "GENERAL",
      routes: [
        {
          name: "Dashboard",
          path: RouteEnums.DASHBOARD,
          icon: Home,
        },
      ],
    },

    {
      header: "PEOPLE",
      routes: [
        {
          name: "Staff",
          path: RouteEnums.STAFF,
          icon: Users,
        },
        {
          name: "Student",
          path: RouteEnums.STUDENT,
          icon: User,
        },
      ],
    },
    {
      header: "ACADEMICS",
      routes: [
        {
          name: "Class",
          path: RouteEnums.CLASS,
          icon: Building,
        },
      ],
    },
    {
      header: "MANAGEMENT",
      routes: [
        {
          name: "School",
          path: RouteEnums.SCHOOL,
          icon: Building2,
          // subRoutes: [{ name: "Profile", path: RouteEnums.SCHOOL_PROFILE, icon: User }],
        },
      ],
    },
    {
      header: "SETTINGS",
      routes: [
        {
          name: "Settings",
          path: "/admin/settings",
          icon: Settings,
          subRoutes: [
            { name: "General Settings", path: "/admin/settings/general", icon: Sliders },
            { name: "System Logs", path: "/admin/settings/logs", icon: FileText },
            { name: "Permissions", path: "/admin/settings/permissions", icon: Shield },
          ],
        },
      ],
    },
  ];

  const isActiveRoute = (path: string) => pathname === path;

  const isActiveSubRoute = (subRoutes: Record<string, any>[]) => subRoutes?.some((subRoute: Record<string, any>) => pathname === subRoute.path);

  return (
    <nav className="w-[250px] px-2 pb-20 fixed overflow-scroll h-screen border-r border-border bg-card">
      <div className="border border-border h-[70px] flex items-center justify-center">
        <div className="font-heading">KENIA .</div>
      </div>
      <div className="mt-4 flex flex-col gap-8">
        {routeGroups.map((group, groupIndex) => (
          <div key={groupIndex}>
            <Typography size="small" className="pl-4 font-heading">
              {group.header}
            </Typography>

            {group.routes.map((route, routeIndex) =>
              route.subRoutes ? (
                <Accordion type="single" collapsible className="w-full" key={routeIndex}>
                  <AccordionItem className="border-0" value={`item-${groupIndex}-${routeIndex}`}>
                    <AccordionTrigger className={`w-full p-4 rounded-lg border mt-2 ${isActiveRoute(route.path) || isActiveSubRoute(route.subRoutes) ? "bg-black/5" : "hover:bg-black/5"}`}>
                      <div className="flex items-center gap-2">
                        {route.icon && <route.icon strokeWidth={1} size={16} />}
                        <Typography>{route.name}</Typography>
                      </div>
                    </AccordionTrigger>

                    {route.subRoutes?.map((subRoute, subRouteIndex) => (
                      <Link className="w-full" key={subRouteIndex} href={subRoute.path}>
                        <AccordionContent className={`w-full p-4 border rounded-lg mt-2 ${isActiveRoute(subRoute.path) ? "bg-black/10 border-foreground" : "hover:bg-black/5"}`}>
                          <div className="flex items-center gap-2">
                            {subRoute.icon && <subRoute.icon strokeWidth={1} size={16} />}
                            <Typography>{subRoute.name}</Typography>
                          </div>
                        </AccordionContent>
                      </Link>
                    ))}
                  </AccordionItem>
                </Accordion>
              ) : (
                <Link href={route.path} key={routeIndex}>
                  <div className={`w-full p-4 rounded-lg border mt-2 ${isActiveRoute(route.path) ? "text-foreground bg-black/10 border border-foreground" : "hover:bg-black/5"}`}>
                    <div className="flex items-center gap-2">
                      {route.icon && <route.icon strokeWidth={1} size={16} />}
                      <Typography>{route.name}</Typography>
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}

interface routeGroups {
  header: string;
  routes: {
    name: string;
    path: string;
    icon: React.ElementType;
    subRoutes?: {
      name: string;
      path: string;
      icon: React.ElementType;
    }[];
  }[];
}
