import React from "react";
import { PageBreadcrumbs } from "@/components/breadcrumbs";
import { RouteEnums } from "@/constants/router/route-constants";
import { SchoolGradingStructureForm } from "./_features/school-grading-structure-form";
import { Card, CardDescription, CardTitle } from "@repo/ui";

type Props = {
  searchParams: {
    id?: string;
  };
};

function SchoolGradingStructureCreatePage({ searchParams }: Props) {
  const gradeStructureId = searchParams.id ? parseInt(searchParams.id, 10) : undefined;

  const pageBreadcrumbs = [
    { title: "Grading Structure List", path: RouteEnums.SCHOOL_GRADING_LIST },
    { title: "Manage Grading Structure", path: RouteEnums.SCHOOL_GRADING_CREATE },
  ];

  return (
    <div className="pb-8">
      <PageBreadcrumbs pages={pageBreadcrumbs} />
      <div className="mt-8">
        <Card className="border shadow-none grid gap-2 p-4 my-8 md:p-8">
          <CardTitle className="font-heading">School Grading Structure</CardTitle>
          <CardDescription className="max-w-xl">
            Define how student scores are translated into letter grades. For example: a score between <strong>90 – 100</strong> could be graded as <strong>A+ (Excellent)</strong>.
          </CardDescription>
        </Card>
        <SchoolGradingStructureForm gradeStructureId={gradeStructureId} />
      </div>
    </div>
  );
}

export default SchoolGradingStructureCreatePage;
