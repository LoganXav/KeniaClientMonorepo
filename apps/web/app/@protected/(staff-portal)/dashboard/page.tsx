import { DashboardEarnings } from "./_features/dashboard-earnings";
import { DashboardAttendance } from "./_features/dashboard-attendance";
import { DashboardQuickActions } from "./_features/dasboard-quick-actions";
import { DashboardRecentActivity } from "./_features/dashboard-recent-activity";
import { DashboardAgendaAndNoticeBoard } from "./_features/dashboard-agenda-notice-board";

export default function DashboardPage() {
  return (
    <div className="grid xl:grid-cols-2 gap-4">
      <div className="space-y-4">
        <DashboardQuickActions />
        <DashboardAttendance />
        <DashboardEarnings />
      </div>

      <div className="space-y-4">
        <DashboardAgendaAndNoticeBoard />

        <DashboardRecentActivity />
      </div>
    </div>
  );
}
