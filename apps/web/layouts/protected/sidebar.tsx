"use client";
import "./sidebar.css";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  cn,
} from "@repo/ui";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function ProtectedSidebar() {
  const pathname = usePathname();

  const routeGroups = [
    {
      header: "MENU",
      routes: [
        {
          name: "Route",
          path: "/route1",
          subRoutes: [
            { name: "Sub Route", path: "/route1/subroute1" },
            { name: "Sub Route", path: "/route1/subroute2" },
          ],
        },
        { name: "Test", path: "/test" },
      ],
    },
    {
      header: "ADMIN",
      routes: [
        {
          name: "Route",
          path: "/admin/route1",
          subRoutes: [{ name: "Sub Route", path: "/admin/route1/subroute1" }],
        },
        { name: "Route", path: "/admin/route2" },
        { name: "Route", path: "/admin/route3" },
      ],
    },
  ];

  const isActiveRoute = (path: string) => pathname === path;
  const isActiveSubRoute = (subRoutes: Record<string, any>[]) =>
    subRoutes?.some(
      (subRoute: Record<string, any>) => pathname === subRoute.path,
    );

  return (
    <nav className="sidebar__container">
      <div className="sidebar__logo">
        <div>Logo</div>
      </div>
      <div className="sidebar__route__groups">
        {routeGroups.map((group, groupIndex) => (
          <div className="sidebar__route__group" key={groupIndex}>
            <div className="sidebar__route__group__header">{group.header}</div>

            {group.routes.map((route, routeIndex) =>
              route.subRoutes ? (
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
                      className={`sidebar__route ${
                        isActiveRoute(route.path) ||
                        isActiveSubRoute(route.subRoutes)
                          ? "bg-muted-foreground"
                          : ""
                      }`}
                    >
                      {route.name}
                    </AccordionTrigger>

                    {route.subRoutes?.map((subRoute, subRouteIndex) => (
                      <Link
                        className="w-full"
                        key={subRouteIndex}
                        href={subRoute.path}
                      >
                        <AccordionContent
                          className={cn(
                            "w-full sidebar__route",
                            isActiveRoute(subRoute.path) ? "bg-muted" : "",
                          )}
                        >
                          {subRoute.name}
                        </AccordionContent>
                      </Link>
                    ))}
                  </AccordionItem>
                </Accordion>
              ) : (
                <Link href={route.path} key={routeIndex}>
                  <div
                    className={cn(
                      "sidebar__route",
                      isActiveRoute(route.path) ? "bg-muted-foreground" : "",
                    )}
                  >
                    {route.name}
                  </div>
                </Link>
              ),
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
