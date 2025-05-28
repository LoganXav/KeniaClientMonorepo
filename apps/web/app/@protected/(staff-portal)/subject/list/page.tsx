import { PageBreadcrumbs } from "@/components/breadcrumbs";
import { RouteEnums } from "@/constants/router/route-constants";
import { SubjectListTable } from "./_features/subject-list-table";

type Props = {};

function SubjectPage({}: Props) {
  const pageBreadcrumbs = [
    { title: "Dashboard", path: RouteEnums.DASHBOARD },
    { title: "Subject List", path: RouteEnums.SUBJECT_LIST },
  ];

  return (
    <div className="pb-8">
      <PageBreadcrumbs pages={pageBreadcrumbs} />
      <SubjectListTable />
    </div>
  );
}

export default SubjectPage;
