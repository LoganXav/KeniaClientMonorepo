import React from "react";
import { DashboardAttendance } from "./_features/dashboard-attendance";
import { DashboardQuickActions } from "./_features/dasboard-quick-actions";
// import { DashboardAgendaAndNoticeBoard } from "./_features/dashboard-agenda-notice-board";
import { DashboardScheduleCalendar } from "./_features/dashboard-schedule-calendar";
import { DashboardEnrollment } from "./_features/dashboard-enrollment";
// import { DashboardAgendaAndNoticeBoard } from "./_features/dashboard-agenda-notice-board";

export default function DashboardPage() {
  return (
    <div className="grid xl:grid-cols-3 gap-4">
      <div className="space-y-4 xl:col-span-2">
        <DashboardQuickActions />
        <div className="grid gap-4 md:grid-cols-2">
          <DashboardEnrollment />
          <DashboardAttendance />
        </div>
        {/* <DashboardAgendaAndNoticeBoard /> */}
      </div>

      <div className="space-y-4">
        <DashboardScheduleCalendar />
      </div>
    </div>
  );
}
