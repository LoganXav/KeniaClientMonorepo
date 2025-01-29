/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Sheet, Button, SheetTrigger, SheetContent, Accordion, AccordionItem, AccordionTrigger, AccordionContent, cn } from "@repo/ui";
import { RouteEnums } from "../../constants/routes";
import "./ProtectedSidebar.stories.css";

const meta: Meta<typeof SheetContent> = {
  title: "Components/ProtectedSidebar",
  component: Sheet,
  argTypes: {
    className: {
      description: "Override or extend the styles applied to the component",
      control: "text",
      table: {
        category: "Override/extend",
        type: { summary: "string" },
        defaultValue: { summary: "" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    const routeGroups = [
      {
        header: "GENERAL",
        routes: [
          {
            name: "Dashboard",
            path: RouteEnums.DASHBOARD,
          },
        ],
      },

      {
        header: "ADMIN PORTAL",
        routes: [
          {
            name: "Staff",
            path: RouteEnums.STAFF,
          },

          {
            name: "School",
            path: RouteEnums.SCHOOL,
            subRoutes: [{ name: "Profile", path: RouteEnums.SCHOOL_PROFILE }],
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

    const isActiveRoute = (path: any) => false;
    const isActiveSubRoute = (subRoutes: Record<string, any>[]) => subRoutes?.some((subRoute: Record<string, any>) => false);

    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button>Open Sidebar</Button>
        </SheetTrigger>
        <SheetContent {...args}>
          <nav className="sidebar__container bg-card">
            <div className="sidebar__logo">
              <div className="font-heading">KENIA .</div>
            </div>
            <div className="sidebar__route__groups">
              {routeGroups.map((group, groupIndex) => (
                <div className="sidebar__route__group" key={groupIndex}>
                  <div className="sidebar__route__group__header font-heading text-sm">{group.header}</div>

                  {group.routes.map((route, routeIndex) =>
                    route.subRoutes ? (
                      <Accordion type="single" collapsible className="w-full" key={routeIndex}>
                        <AccordionItem className="border-0" value={`item-${groupIndex}-${routeIndex}`}>
                          <AccordionTrigger className={`sidebar__route border ${isActiveRoute(route.path) || isActiveSubRoute(route.subRoutes) ? "bg-transparent/5" : "hover:bg-transparent/5"}`}>{route.name}</AccordionTrigger>

                          {route.subRoutes?.map((subRoute, subRouteIndex) => (
                            <div className="w-full" key={subRouteIndex}>
                              <AccordionContent className={cn("w-full sidebar__route", isActiveRoute(subRoute.path) ? "bg-transparent/10 border border-foreground" : "border hover:bg-transparent/5")}>{subRoute.name}</AccordionContent>
                            </div>
                          ))}
                        </AccordionItem>
                      </Accordion>
                    ) : (
                      <div key={routeIndex}>
                        <div className={cn("sidebar__route", isActiveRoute(route.path) ? "text-foreground  bg-transparent/10 border border-foreground" : "hover:bg-transparent/5 border")}>{route.name}</div>
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    );
  },
};
