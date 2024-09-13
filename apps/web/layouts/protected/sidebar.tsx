"use client";
import "./sidebar.css";

import { useSidebar } from "@/hooks/use-sidebar";
import React from "react";

type SidebarProps = {
  className?: string;
};
export default function ProtectedSidebar({ className }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();
  const [status, setStatus] = React.useState(false);

  const handleToggle = () => {
    setStatus(true);
    toggle();
    setTimeout(() => setStatus(false), 500);
  };

  return (
    <nav className="sidebar__container">
      <div className="sidebar__logo">
        <div>Logo</div>
      </div>
      <div className="sidebar__route__groups">
        <div className="sidebar__route__group">
          <div className="sidebar__route__group__header">
            <div>Menu</div>
          </div>
          <div className="sidebar__route">Route</div>
          <div className="sidebar__route">Route</div>
        </div>
        <div className="sidebar__route__group">
          <div className="sidebar__route__group__header">
            <div>Menu</div>
          </div>
          <div className="sidebar__route">Route</div>
          <div className="sidebar__route">Route</div>
        </div>
      </div>
    </nav>
  );
}
