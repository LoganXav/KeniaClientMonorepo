// @ts-nocheck
"use client";

import "./style.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";

interface CalendarGridProps {
  events: { title: string; start?: string; end?: string; date?: string }[] | undefined;
  views: ("multiMonthYear" | "dayGridMonth" | "timeGridWeek" | "timeGridDay")[];
  [key: string]: any;
}

const CalendarGrid = ({ events = [], views = [], ...props }: CalendarGridProps) => {
  const renderEventContent = (eventInfo: any) => {
    return <div className="w-full truncate text-center px-1">{eventInfo.event.title}</div>;
  };

  const viewsString = views.join(",");

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, multiMonthPlugin]}
      initialView={views[0]}
      // editable={true}
      selectable={true}
      eventContent={renderEventContent}
      events={events}
      slotMinTime="07:00"
      slotMaxTime="17:00"
      eventColor=""
      nowIndicator={true}
      dayMaxEvents={true}
      headerToolbar={{
        left: "prev,next",
        center: "title",
        right: viewsString,
      }}
      titleFormat={{ year: "numeric", month: "long" }}
      weekends={false}
      eventDidMount={(info) => attachTooltip(info)}
      {...props}
    />
  );
};

export { CalendarGrid };

// Show full title as native browser tooltip
const attachTooltip = (info) => {
  const tooltip = document.createElement("div");
  tooltip.innerText = info.event.title;
  tooltip.className = "custom-tooltip";
  tooltip.style.position = "absolute";
  tooltip.style.background = "#333";
  tooltip.style.color = "#fff";
  tooltip.style.padding = "4px 8px";
  tooltip.style.borderRadius = "4px";
  tooltip.style.fontSize = "12px";
  tooltip.style.zIndex = "1000";
  tooltip.style.display = "none";

  document.body.appendChild(tooltip);

  info.el.addEventListener("mouseenter", (e) => {
    tooltip.style.left = `${e.pageX + 10}px`;
    tooltip.style.top = `${e.pageY + 10}px`;
    tooltip.style.display = "block";
  });

  info.el.addEventListener("mouseleave", () => {
    tooltip.style.display = "none";
  });
};
