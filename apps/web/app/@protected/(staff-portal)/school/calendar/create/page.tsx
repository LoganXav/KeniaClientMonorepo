import { PageBreadcrumbs } from "@/components/breadcrumbs";
import { RouteEnums } from "@/constants/router/route-constants";
import SchoolCalendarForm from "./_features/school-calendar-form";

export default function SchoolCalendarCreatePage() {
  const pageBreadcrumbs = [{ title: "School", path: RouteEnums.SCHOOL }, { title: "Calendar", path: RouteEnums.SCHOOL_CALENDAR }, { title: "Manage Calendar" }];
  return (
    <>
      <PageBreadcrumbs pages={pageBreadcrumbs} />
      <div className="mt-8">
        <SchoolCalendarForm />
      </div>
    </>
  );
}
