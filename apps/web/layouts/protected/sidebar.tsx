"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, cn } from "@repo/ui";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { RouteEnums } from "@/constants/router/route-constants";

export default function ProtectedSidebar() {
  const pathname = usePathname();

  const routeGroups = [
    {
      header: "GENERAL",
      routes: [
        {
          name: "Dashboard",
          path: RouteEnums.DASHBOARD,
        },
        // {
        //   name: "Notifications",
        //   path: "/notifications",
        // },
      ],
    },
    // {
    //   header: "TEACHER PORTAL",
    //   routes: [
    //     {
    //       name: "My Classes",
    //       path: "/teacher/classes",
    //       subRoutes: [
    //         { name: "Class List", path: "/teacher/classes/list" },
    //         { name: "Timetable", path: "/teacher/classes/timetable" },
    //         { name: "Attendance", path: "/teacher/classes/attendance" },
    //         { name: "Assignments", path: "/teacher/classes/assignments" },
    //         { name: "Exams & Grades", path: "/teacher/classes/exams-grades" },
    //       ],
    //     },
    //     {
    //       name: "Student Management",
    //       path: "/teacher/students",
    //       subRoutes: [
    //         { name: "Student List", path: "/teacher/students/list" },
    //         { name: "Attendance", path: "/teacher/students/attendance" },
    //         { name: "Grades", path: "/teacher/students/grades" },
    //       ],
    //     },
    //   ],
    // },
    {
      header: "ADMIN PORTAL",
      routes: [
        {
          name: "Staff",
          path: RouteEnums.STAFF,
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
          name: "School",
          path: RouteEnums.SCHOOL,
          subRoutes: [{ name: "Profile", path: RouteEnums.SCHOOL_PROFILE }],
        },
        // {
        //   name: "Class",
        //   path: "/admin/classes",
        //   subRoutes: [
        //     { name: "Manage Classes", path: "/admin/classes/manage" },
        //     { name: "Timetable", path: "/admin/classes/timetable" },
        //     { name: "Attendance", path: "/admin/classes/attendance" },
        //   ],
        // },
        // {
        //   name: "Finance",
        //   path: "/admin/finance",
        //   subRoutes: [
        //     { name: "Fee Management", path: "/admin/finance/fees" },
        //     { name: "Payment Records", path: "/admin/finance/payments" },
        //   ],
        // },
        // {
        //   name: "Exams & Grades",
        //   path: "/admin/exams-grades",
        //   subRoutes: [
        //     { name: "Exam Setup", path: "/admin/exams-grades/exams" },
        //     { name: "Grade Management", path: "/admin/exams-grades/grades" },
        //   ],
        // },
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

  const isActiveRoute = (path: string) => pathname === path;

  const isActiveSubRoute = (subRoutes: Record<string, any>[]) => subRoutes?.some((subRoute: Record<string, any>) => pathname === subRoute.path);

  return (
    <nav className="w-[250px] px-2 pb-20 fixed overflow-scroll h-screen border-r border-gray-300 bg-card">
      <div className="border border-gray-300 h-[70px] flex items-center justify-center">
        <div className="font-heading">KENIA .</div>
      </div>
      <div className="mt-4 flex flex-col gap-8">
        {routeGroups.map((group, groupIndex) => (
          <div key={groupIndex}>
            <div className="pl-4 text-[13px] font-semibold font-heading">{group.header}</div>

            {group.routes.map((route, routeIndex) =>
              route.subRoutes ? (
                <Accordion type="single" collapsible className="w-full" key={routeIndex}>
                  <AccordionItem className="border-0" value={`item-${groupIndex}-${routeIndex}`}>
                    <AccordionTrigger className={`w-full p-4 rounded-lg border mt-2 ${isActiveRoute(route.path) || isActiveSubRoute(route.subRoutes) ? "bg-black/5" : "hover:bg-black/5"}`}>{route.name}</AccordionTrigger>

                    {route.subRoutes?.map((subRoute, subRouteIndex) => (
                      <Link className="w-full" key={subRouteIndex} href={subRoute.path}>
                        <AccordionContent className={`w-full p-4 rounded-lg mt-2 ${isActiveRoute(subRoute.path) ? "bg-black/10 border border-foreground" : "border hover:bg-black/5"}`}>{subRoute.name}</AccordionContent>
                      </Link>
                    ))}
                  </AccordionItem>
                </Accordion>
              ) : (
                <Link href={route.path} key={routeIndex}>
                  <div className={`w-full p-4 rounded-lg border mt-2 ${isActiveRoute(route.path) ? "text-foreground bg-black/10 border border-foreground" : "hover:bg-black/5"}`}>{route.name}</div>
                </Link>
              )
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
