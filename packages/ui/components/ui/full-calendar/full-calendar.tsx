// @ts-nocheck
"use client";

import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
import FullCalendar from "@fullcalendar/react";
import "./style.css";

interface CalendarGridProps {
  events: { title: string; start?: string; end?: string; date?: string }[];
  [key: string]: any;
}

const CalendarGrid = ({ events, ...props }: CalendarGridProps) => {
  const renderEventContent = (eventInfo: any) => {
    return <div className="w-full rounded-none h-auto text-wrap">{eventInfo.event.title}</div>;
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, multiMonthPlugin]}
      initialView="multiMonthYear"
      // editable={true}
      selectable={true}
      eventContent={renderEventContent}
      events={events}
      eventColor=""
      headerToolbar={{
        left: "prev,next",
        center: "title",
        right: "multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay",
      }}
      titleFormat={{ year: "numeric", month: "long" }}
      weekends={false}
      {...props} // Spread additional props here
    />
  );
};

export { CalendarGrid };
