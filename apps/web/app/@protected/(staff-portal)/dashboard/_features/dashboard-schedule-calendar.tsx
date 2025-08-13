"use client";

import { Zap, Grid3X3, Briefcase, ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { Button, cn } from "@repo/ui";
import { Typography } from "@repo/ui";
import { Card, CardContent } from "@repo/ui";

export interface CalendarEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  date: Date;
  icon?: "grid" | "zap" | "briefcase" | "default";
}

interface ScheduleCalendarProps {
  events?: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
}

const iconMap = {
  grid: Grid3X3,
  zap: Zap,
  briefcase: Briefcase,
  default: Grid3X3,
};

// Hardcoded sample events
const sampleEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "English Language Class",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    date: new Date(), // Today
    icon: "grid",
  },
  {
    id: "2",
    title: "2nd Semester Test",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    date: new Date(), // Today
    icon: "grid",
  },
  {
    id: "3",
    title: "Midterm Holiday",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    date: new Date(), // Today
    icon: "grid",
  },
  {
    id: "4",
    title: "Children's Day",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    date: new Date(), // Today
    icon: "grid",
  },
  {
    id: "6",
    title: "Prepare Job Interview",
    startTime: "09:00 AM",
    endTime: "10:30 AM",
    date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    icon: "briefcase",
  },
  {
    id: "7",
    title: "Team Meeting",
    startTime: "2:00 PM",
    endTime: "3:00 PM",
    date: new Date(), // Today
    icon: "grid",
  },
  {
    id: "8",
    title: "Client Presentation",
    startTime: "4:00 PM",
    endTime: "5:30 PM",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
    icon: "briefcase",
  },
];

export function DashboardScheduleCalendar({ events = sampleEvents, onEventClick }: ScheduleCalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  // Get the start of the week (Monday)
  const getWeekStart = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    return new Date(d.setDate(diff));
  };

  // Generate week days
  const getWeekDays = () => {
    const weekStart = getWeekStart(currentDate);
    const days = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      days.push(day);
    }

    return days;
  };

  const weekDays = getWeekDays();
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Navigation functions
  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  // Check if date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Check if date is selected
  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return events.filter((event) => event.date.toDateString() === date.toDateString());
  };

  // Get today's events
  const getTodayEvents = () => {
    const today = new Date();
    return events.filter((event) => event.date.toDateString() === today.toDateString());
  };

  // Get events for selected date (if not today)
  const getSelectedDateEvents = () => {
    if (isToday(selectedDate)) return [];
    return getEventsForDate(selectedDate);
  };

  // Format month and year
  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  // Format date for event sections
  const formatEventDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const renderEvent = (event: CalendarEvent) => {
    const IconComponent = iconMap[event.icon || "default"];

    return (
      <div key={Number(event.id)} className="group flex items-center gap-3 p-3 bg-accent rounded-lg cursor-pointer transition-colors" onClick={() => onEventClick?.(event)}>
        <div className="w-8 h-8 bg-card group-hover:bg-accent rounded-lg flex items-center justify-center">
          <IconComponent className="w-4 h-4 group-hover:text-primary" />
        </div>
        <div className="flex-1">
          <Typography as="div" className="group-hover:text-primary" weight="medium">
            {event.title}
          </Typography>
          <Typography as="div" size="small" className="text-xs text-muted-foreground group-hover:text-primary">
            {event.startTime} - {event.endTime}
          </Typography>
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardContent className="px-4 pb-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Typography size="small" className="uppercase font-heading">
            {formatMonthYear(currentDate)}
          </Typography>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={goToPreviousWeek}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={goToNextWeek}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Week View */}
        <div className="grid grid-cols-7 gap-1 mb-6">
          {weekDays.map((day) => {
            const dayName = dayNames[day.getDay() === 0 ? 6 : day.getDay() - 1]; // Adjust so Mon is first
            return (
              <div key={day.toISOString()} className="flex flex-col items-center gap-2">
                <Typography as="div" size="small" color="muted">
                  {dayName}
                </Typography>
                <button onClick={() => setSelectedDate(day)} className={cn("h-10 w-10 rounded-full font-medium transition-colors", isSelected(day) ? "bg-primary text-card" : isToday(day) ? "bg-accent text-primary" : "hover:bg-accent")}>
                  {day.getDate()}
                </button>
              </div>
            );
          })}
        </div>

        {/* Today Section */}
        {getTodayEvents().length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-8 mb-3">
              <Typography size="small" color="muted" className="whitespace-nowrap">
                Today
              </Typography>
              <div className="flex-1 border-t border-dashed border-border" />
            </div>
            <div className="space-y-1">{getTodayEvents().map(renderEvent)}</div>
          </div>
        )}

        {/* Selected Date Events */}
        {getSelectedDateEvents().length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-8 mb-3">
              <Typography size="small" color="muted" className="whitespace-nowrap">
                {formatEventDate(selectedDate)}
              </Typography>
              <div className="flex-1 border-t border-dashed border-border" />
            </div>
            <div className="space-y-1">{getSelectedDateEvents().map(renderEvent)}</div>
          </div>
        )}

        {/* No events message */}
        {getTodayEvents().length === 0 && getSelectedDateEvents().length === 0 && (
          <Typography color="muted" className="text-center py-4">
            No events scheduled
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
