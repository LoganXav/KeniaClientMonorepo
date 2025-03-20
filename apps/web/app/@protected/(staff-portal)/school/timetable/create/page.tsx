import SchoolTimetableForm from "./_features/school-timetable-form";
import { PageBreadcrumbs } from "@/components/breadcrumbs";
import { RouteEnums } from "@/constants/router/route-constants";

function SchoolTimetableCreate() {
  const pageBreadcrumbs = [{ title: "School", path: RouteEnums.SCHOOL }, { title: "Timetable", path: RouteEnums.SCHOOL_TIMETABLE }, { title: "Manage Timetable" }];
  return (
    <>
      <PageBreadcrumbs pages={pageBreadcrumbs} />
      <div className="mt-8">
        <SchoolTimetableForm />
      </div>
    </>
  );
}

export default SchoolTimetableCreate;
