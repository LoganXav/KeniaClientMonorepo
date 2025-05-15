"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RouteEnums } from "@/constants/router/route-constants";
import { usePermissions } from "@/providers/permission-provider";
// import { PERMISSIONS } from "@/constants/permissions/permission-constants";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Typography } from "@repo/ui";
import { Home, Users, User, Building2, Settings, Sliders, FileText, Shield, Building } from "lucide-react";

export default function ProtectedSidebar() {
  const pathname = usePathname();
  const { hasAllPermissions } = usePermissions();

  const routeGroups: routeGroups[] = [
    {
      header: "General",
      routes: [
        {
          name: "Dashboard",
          path: RouteEnums.DASHBOARD,
          icon: Home,
        },
      ],
    },

    {
      header: "People",
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
      header: "Academics",
      routes: [
        {
          name: "Class",
          path: RouteEnums.CLASS,
          icon: Building,
        },
      ],
    },
    {
      header: "Management",
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
      header: "Settings",
      routes: [
        {
          name: "Settings",
          path: "/admin/settings",
          icon: Settings,
          subRoutes: [
            {
              name: "General Settings",
              path: "/admin/settings/general",
              icon: Sliders,
              permissions: ["PERMISSIONS.SETTINGS_GENERAL"], // Test
            },
            { name: "System Logs", path: "/admin/settings/logs", icon: FileText },
            { name: "Permissions", path: "/admin/settings/permissions", icon: Shield },
          ],
        },
      ],
    },
  ];

  const isActiveRoute = (path: string) => pathname.startsWith(path);

  const isActiveSubRoute = (subRoutes: Record<string, any>[]) => subRoutes?.some((subRoute: Record<string, any>) => pathname === subRoute.path);

  return (
    <nav className="w-[250px] px-2 pb-20 fixed overflow-scroll h-screen border-r border-border bg-card">
      <div className="border border-border h-[70px] flex items-center justify-center">
        <div className="font-heading">KENIA .</div>
      </div>
      <div className="mt-4 flex flex-col gap-4 overflow-y-auto">
        {routeGroups.map((group, groupIndex) => {
          if (group.permissions && !hasAllPermissions(group.permissions)) {
            return null;
          }

          return (
            <div key={groupIndex}>
              <Typography size="small" className="font-heading uppercase">
                {group.header}
              </Typography>

              {group.routes.map((route, routeIndex) => {
                if (route.permissions && !hasAllPermissions(route.permissions)) {
                  return null;
                }

                return route.subRoutes ? (
                  <Accordion type="single" collapsible className="w-full" key={routeIndex}>
                    <AccordionItem className="border-0" value={`item-${groupIndex}-${routeIndex}`}>
                      <AccordionTrigger className={`w-full px-4 py-2 rounded-sm mt-2 ${isActiveRoute(route.path) || isActiveSubRoute(route.subRoutes) ? "bg-black/5" : "hover:bg-accent"}`}>
                        <div className="flex items-center gap-2">
                          {route.icon && <route.icon strokeWidth={1} size={16} />}
                          <Typography>{route.name}</Typography>
                        </div>
                      </AccordionTrigger>

                      {route.subRoutes
                        .filter((subRoute) => (subRoute.permissions ? hasAllPermissions(subRoute.permissions) : true))
                        .map((subRoute, subRouteIndex) => (
                          <Link className="w-full" key={subRouteIndex} href={subRoute.path}>
                            <AccordionContent className={`w-auto ml-2 px-4 py-2 border rounded-sm mt-2 ${isActiveRoute(subRoute.path) ? "bg-black/10 border-foreground" : "hover:bg-accent border-transparent"}`}>
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
                    <div className={`w-full px-4 py-2 border rounded-sm mt-2 ${isActiveRoute(route.path) ? "text-foreground bg-black/10 border-foreground" : "hover:bg-accent border-transparent"}`}>
                      <div className="flex items-center gap-2">
                        {route.icon && <route.icon strokeWidth={1} size={16} />}
                        <Typography>{route.name}</Typography>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>
    </nav>
  );
}

interface routeGroups {
  header: string;
  permissions?: string[];
  routes: {
    name: string;
    path: string;
    icon: React.ElementType;
    permissions?: string[];
    subRoutes?: {
      name: string;
      path: string;
      icon: React.ElementType;
      permissions?: string[];
    }[];
  }[];
}
