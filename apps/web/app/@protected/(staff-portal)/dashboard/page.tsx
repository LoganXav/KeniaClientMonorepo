import React from "react";
import { DashboardLessons } from "./_features/dashboard-lessons";
// import { DashboardAttendance } from "./_features/dashboard-attendance";
import { DashboardQuickActions } from "./_features/dasboard-quick-actions";
// import { DashboardAgendaAndNoticeBoard } from "./_features/dashboard-agenda-notice-board";
import { DashboardScheduleCalendar } from "./_features/dashboard-schedule-calendar";

export default function DashboardPage() {
  return (
    <div className="grid xl:grid-cols-3 gap-4">
      <div className="space-y-4 xl:col-span-2">
        <DashboardQuickActions />
        <div className="grid gap-4 md:grid-cols-2">
          <DashboardLessons />
          <DashboardLessons />
        </div>
        {/* <DashboardAttendance /> */}
      </div>

      <div className="space-y-4">
        <DashboardScheduleCalendar />
        {/* <DashboardAgendaAndNoticeBoard /> */}
      </div>
    </div>
  );
}
