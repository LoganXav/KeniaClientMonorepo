import { PageBreadcrumbs } from "@/components/breadcrumbs";
import { RouteEnums } from "@/constants/router/route-constants";
import { ClassDivisionCreateForm } from "./_features/class-division-create-form";

type Props = {
  searchParams: {
    id?: string;
  };
};

function ClassDivisionCreatePage({ searchParams }: Props) {
  const classDivisionId = searchParams.id ? parseInt(searchParams.id, 10) : undefined;

  const pageBreadcrumbs = [{ title: "Class", path: RouteEnums.CLASS }, { title: "Class Divisions", path: RouteEnums.CLASS_DIVISION_LIST }, { title: classDivisionId ? "Edit Class Division" : "Create Class Division" }];
  return (
    <>
      <PageBreadcrumbs pages={pageBreadcrumbs} />
      <div className="mt-8">
        <ClassDivisionCreateForm classDivisionId={classDivisionId} />
      </div>
    </>
  );
}

export default ClassDivisionCreatePage;
