import { PageBreadcrumbs } from "@/components/breadcrumbs";
import { SubjectDetails } from "./_features/subject-details";
import { RouteEnums } from "@/constants/router/route-constants";

type Props = {
  params: {
    id: string;
  };
};

function SubjectPage({ params }: Props) {
  const subjectId = parseInt(params.id, 10);
  const pageBreadcrumbs = [{ title: "Subject List", path: RouteEnums.SUBJECT_LIST }, { title: "Subject Details" }];

  return (
    <>
      <PageBreadcrumbs pages={pageBreadcrumbs} />
      <div className="mt-8">
        <SubjectDetails subjectId={subjectId} />
      </div>
    </>
  );
}

export default SubjectPage;
