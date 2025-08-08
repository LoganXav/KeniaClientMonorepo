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
  cn,
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
  Dot,
  EarthLock,
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
              icon: Dot,
            },
            {
              name: "Students",
              path: RouteEnums.STUDENT,
              icon: Dot,
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
              icon: Dot,
            },
            {
              name: "Subjects",
              path: RouteEnums.SUBJECT_LIST,
              icon: Dot,
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
              icon: Dot,
              permissions: ["PERMISSIONS.SETTINGS_GENERAL"],
            },
            {
              name: "System Logs",
              path: RouteEnums.LOGS,
              icon: Dot,
            },
            {
              name: "Permissions",
              path: RouteEnums.ROLES_AND_PERMISSIONS,
              icon: Dot,
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
      <div className="h-[70px] flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Typography size={"h5"} className="" weight={"bold"}>
            KENIA
          </Typography>
          <EarthLock strokeWidth={1.25} size={20} />
        </div>
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

                const isActive = isActiveRoute(route.path);
                const isSubActive =
                  route.subRoutes && isActiveSubRoute(route.subRoutes);

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
                        className={cn(
                          "group w-full px-4 py-3 rounded-sm hover:bg-accent",
                          (isActive || isSubActive) && "bg-accent",
                        )}
                        isActive={isActive || isSubActive}
                      >
                        <div className="flex items-center gap-2">
                          {route.icon && (
                            <route.icon
                              strokeWidth={isActive || isSubActive ? 2 : 1}
                              size={16}
                              className={cn(
                                "group-hover:stroke-2 group-hover:text-accent-foreground transition-all",
                                isActive ||
                                  (isSubActive && "text-accent-foreground"),
                              )}
                            />
                          )}
                          <Typography
                            className={cn(
                              "group-hover:text-accent-foreground",
                              isSubActive && "text-accent-foreground",
                            )}
                          >
                            {route.name}
                          </Typography>
                        </div>
                      </AccordionTrigger>

                      {route.subRoutes
                        .filter((subRoute) =>
                          subRoute.permissions
                            ? hasAllPermissions(subRoute.permissions)
                            : true,
                        )
                        .map((subRoute, subRouteIndex) => {
                          const isSubRouteActive = isActiveRoute(subRoute.path);
                          return (
                            <Link
                              className="w-full"
                              key={subRouteIndex}
                              href={subRoute.path}
                            >
                              <AccordionContent
                                className={cn(
                                  "group w-auto px-4 py-3 rounded-sm",
                                  isSubRouteActive
                                    ? "bg-accent border-foreground"
                                    : "hover:bg-accent",
                                )}
                              >
                                <div className="flex items-center gap-2">
                                  {subRoute.icon && (
                                    <subRoute.icon
                                      strokeWidth={isSubRouteActive ? 2 : 1}
                                      size={28}
                                      className={cn(
                                        "group-hover:stroke-2 group-hover:text-accent-foreground transition-all",
                                        isActive ||
                                          (isSubActive &&
                                            "text-accent-foreground"),
                                      )}
                                    />
                                  )}
                                  <Typography
                                    className={cn(
                                      "transition-all group-hover:text-accent-foreground",
                                      isSubRouteActive &&
                                        "text-accent-foreground",
                                    )}
                                  >
                                    {subRoute.name}
                                  </Typography>
                                </div>
                              </AccordionContent>
                            </Link>
                          );
                        })}
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <Link href={route.path} key={routeIndex}>
                    <div
                      className={cn(
                        "group w-full px-4 py-3 rounded-sm hover:bg-accent",
                        isActive &&
                          "text-foreground bg-accent border-foreground",
                      )}
                    >
                      <div className="flex items-center gap-2">
                        {route.icon && (
                          <route.icon
                            strokeWidth={isActive ? 2 : 1}
                            size={16}
                            className={cn(
                              "group-hover:stroke-2 group-hover:text-accent-foreground transition-all",
                              isActive && "text-accent-foreground",
                            )}
                          />
                        )}
                        <Typography
                          className={cn(
                            "transition-all group-hover:text-accent-foreground",
                            isActive && "text-accent-foreground",
                          )}
                        >
                          {route.name}
                        </Typography>
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
