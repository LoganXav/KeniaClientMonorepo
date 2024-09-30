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
      header: "GENERAL",
      routes: [
        {
          name: "Dashboard",
          path: "/dashboard",
        },
        // {
        //   name: "Notifications",
        //   path: "/notifications",
        // },
      ],
    },
    {
      header: "TEACHER PORTAL",
      routes: [
        {
          name: "My Classes",
          path: "/teacher/classes",
          subRoutes: [
            { name: "Class List", path: "/teacher/classes/list" },
            { name: "Timetable", path: "/teacher/classes/timetable" },
            { name: "Attendance", path: "/teacher/classes/attendance" },
            { name: "Assignments", path: "/teacher/classes/assignments" },
            { name: "Exams & Grades", path: "/teacher/classes/exams-grades" },
          ],
        },
        {
          name: "Student Management",
          path: "/teacher/students",
          subRoutes: [
            { name: "Student List", path: "/teacher/students/list" },
            { name: "Attendance", path: "/teacher/students/attendance" },
            { name: "Grades", path: "/teacher/students/grades" },
          ],
        },
      ],
    },
    {
      header: "ADMIN PORTAL",
      routes: [
        {
          name: "Staff",
          path: "/staff",
        },
        // {
        //   name: "Student Management",
        //   path: "/admin/students",
        //   subRoutes: [
        //     { name: "Admissions", path: "/admin/students/admissions" },
        //     { name: "Student List", path: "/admin/students/list" },
        //     { name: "Attendance", path: "/admin/students/attendance" },
        //     { name: "Grades", path: "/admin/students/grades" },
        //   ],
        // },
        {
          name: "Class",
          path: "/admin/classes",
          subRoutes: [
            { name: "Manage Classes", path: "/admin/classes/manage" },
            { name: "Timetable", path: "/admin/classes/timetable" },
            { name: "Attendance", path: "/admin/classes/attendance" },
          ],
        },
        {
          name: "Finance",
          path: "/admin/finance",
          subRoutes: [
            { name: "Fee Management", path: "/admin/finance/fees" },
            { name: "Payment Records", path: "/admin/finance/payments" },
          ],
        },
        {
          name: "Exams & Grades",
          path: "/admin/exams-grades",
          subRoutes: [
            { name: "Exam Setup", path: "/admin/exams-grades/exams" },
            { name: "Grade Management", path: "/admin/exams-grades/grades" },
          ],
        },
      ],
    },
    {
      header: "SETTINGS",
      routes: [
        {
          name: "Settings",
          path: "/admin/settings",
          subRoutes: [
            { name: "General Settings", path: "/admin/settings/general" },
            { name: "System Logs", path: "/admin/settings/logs" },
            { name: "Permissions", path: "/admin/settings/permissions" },
          ],
        },
      ],
    },
  ];
  const isActiveRoute = (path: string) =>
    pathname === path || pathname.split("/").includes(path.split("/")[1]);
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
                          ? "text-white bg-foreground"
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
                      isActiveRoute(route.path)
                        ? "text-white bg-foreground"
                        : "",
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
