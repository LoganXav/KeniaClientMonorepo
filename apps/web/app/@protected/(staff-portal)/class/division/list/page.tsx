import { PageBreadcrumbs } from "@/components/breadcrumbs";
import { RouteEnums } from "@/constants/router/route-constants";
import { ClassDivisionListTable } from "./_features/class-division-list-table";

export default function ClassDivisionListPage() {
  const pageBreadcrumbs = [{ title: "Class", path: RouteEnums.CLASS }, { title: "Class Divisions List" }];
  return (
    <>
      <PageBreadcrumbs pages={pageBreadcrumbs} />
      <div className="mt-8">
        <ClassDivisionListTable />
      </div>
    </>
  );
}
