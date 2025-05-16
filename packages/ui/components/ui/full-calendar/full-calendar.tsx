// @ts-nocheck
"use client";

import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
import FullCalendar from "@fullcalendar/react";
import "./style.css";

interface CalendarGridProps {
  events: { title: string; start?: string; end?: string; date?: string }[] | undefined;
  views: ("multiMonthYear" | "dayGridMonth" | "timeGridWeek" | "timeGridDay")[];
  [key: string]: any;
}

const CalendarGrid = ({ events = [], views = [], ...props }: CalendarGridProps) => {
  const renderEventContent = (eventInfo: any) => {
    return <div className="w-full rounded-none h-auto text-wrap">{eventInfo.event.title}</div>;
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
      {...props} // Spread additional props here
    />
  );
};

export { CalendarGrid };
