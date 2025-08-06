"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RouteEnums } from "@/constants/router/route-constants";
import { usePermissions } from "@/providers/permission-provider";
// import { PERMISSIONS } from "@/constants/permissions/permission-constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Typography,
} from "@repo/ui";
import {
  Home,
  Users,
  User,
  Building2,
  Settings,
  Sliders,
  FileText,
  Shield,
  Building,
  BookType,
  Workflow,
} from "lucide-react";

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
        {
          name: "My Workspace",
          path: RouteEnums.WORKSPACE,
          icon: Workflow,
        },
        {
          name: "People",
          path: "#",
          icon: Users,
          subRoutes: [
            {
              name: "Staff",
              path: RouteEnums.STAFF,
              icon: Users,
            },
            {
              name: "Students",
              path: RouteEnums.STUDENT,
              icon: User,
            },
          ],
        },
        {
          name: "Academics",
          path: "#",
          icon: BookType,
          subRoutes: [
            {
              name: "Classes",
              path: RouteEnums.CLASS,
              icon: Building,
            },
            {
              name: "Subjects",
              path: RouteEnums.SUBJECT_LIST,
              icon: BookType,
            },
          ],
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
          path: "#",
          icon: Settings,
          subRoutes: [
            {
              name: "General Settings",
              path: "/admin/settings/general",
              icon: Sliders,
              permissions: ["PERMISSIONS.SETTINGS_GENERAL"],
            },
            {
              name: "System Logs",
              path: RouteEnums.LOGS,
              icon: FileText,
            },
            {
              name: "Permissions",
              path: RouteEnums.ROLES_AND_PERMISSIONS,
              icon: Shield,
            },
          ],
        },
      ],
    },
  ];

  const getBaseSegment = (path: string) => path.split("/")[1]; // returns "subject" from "/subject/list"

  const isActiveRoute = (path: string) =>
    getBaseSegment(pathname) === getBaseSegment(path);

  const isActiveSubRoute = (subRoutes: Record<string, any>[]) =>
    subRoutes?.some(
      (subRoute) => getBaseSegment(pathname) === getBaseSegment(subRoute.path),
    );

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
              <Typography
                size="small"
                className="font-heading uppercase pb-2 pl-2"
              >
                {group.header}
              </Typography>

              {group.routes.map((route, routeIndex) => {
                if (
                  route.permissions &&
                  !hasAllPermissions(route.permissions)
                ) {
                  return null;
                }

                return route.subRoutes ? (
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    key={routeIndex}
                  >
                    <AccordionItem
                      className="border-0"
                      value={`item-${groupIndex}-${routeIndex}`}
                    >
                      <AccordionTrigger
                        className={`w-full px-4 py-3 rounded-sm ${isActiveRoute(route.path) || isActiveSubRoute(route.subRoutes) ? "bg-black/5" : "hover:bg-accent"}`}
                      >
                        <div className="flex items-center gap-2">
                          {route.icon && (
                            <route.icon strokeWidth={1} size={16} />
                          )}
                          <Typography>{route.name}</Typography>
                        </div>
                      </AccordionTrigger>

                      {route.subRoutes
                        .filter((subRoute) =>
                          subRoute.permissions
                            ? hasAllPermissions(subRoute.permissions)
                            : true,
                        )
                        .map((subRoute, subRouteIndex) => (
                          <Link
                            className="w-full"
                            key={subRouteIndex}
                            href={subRoute.path}
                          >
                            <AccordionContent
                              className={`w-auto px-4 py-3 rounded-sm ${isActiveRoute(subRoute.path) ? "bg-black/10 border-foreground" : "hover:bg-accent"}`}
                            >
                              <div className="flex items-center gap-2">
                                {subRoute.icon && (
                                  <subRoute.icon strokeWidth={1} size={16} />
                                )}
                                <Typography>{subRoute.name}</Typography>
                              </div>
                            </AccordionContent>
                          </Link>
                        ))}
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <Link href={route.path} key={routeIndex}>
                    <div
                      className={`w-full px-4 py-3 rounded-sm ${isActiveRoute(route.path) ? "text-foreground bg-black/10 border-foreground" : "hover:bg-accent"}`}
                    >
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
