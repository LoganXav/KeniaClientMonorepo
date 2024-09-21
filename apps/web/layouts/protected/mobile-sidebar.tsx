"use client";
import "./sidebar.css";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui";

type SidebarProps = {
  className?: string;
};
export default function ProtectedMobileSidebar({ className }: SidebarProps) {
  return (
    <nav className="sidebar__container">
      <div className="sidebar__logo">
        <div>Logo</div>
      </div>
      <div className="sidebar__route__groups">
        <div className="sidebar__route__group">
          <div className="sidebar__route__group__header">MENU</div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem className="border-0" value="item-1">
              <AccordionTrigger className="sidebar__route">
                Route
              </AccordionTrigger>
              <AccordionContent className="sidebar__route">
                Sub Route
              </AccordionContent>
              <AccordionContent className="sidebar__route">
                Sub Route
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem className="border-0" value="item-1">
              <AccordionTrigger className="sidebar__route">
                Route
              </AccordionTrigger>
              <AccordionContent className="sidebar__route">
                Sub Route
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="sidebar__route">Route</div>
        </div>
        <div className="sidebar__route__group">
          <div className="sidebar__route__group__header">ADMIN</div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem className="border-0" value="item-1">
              <AccordionTrigger className="sidebar__route">
                Route
              </AccordionTrigger>
              <AccordionContent className="sidebar__route">
                Sub Route
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="sidebar__route">Route</div>

          <div className="sidebar__route">Route</div>
        </div>
      </div>
    </nav>
  );
}
