import React from "react";
import { PageBreadcrumbs } from "@/components/breadcrumbs";
import { RouteEnums } from "@/constants/router/route-constants";
import { ClassDivisionDetails } from "./_features/class-division-details";

type Props = {
  params: {
    id: string;
  };
};

export default function ClassDivisionDetailsPage({ params }: Props) {
  const classDivisionId = parseInt(params.id, 10);

  const pageBreadcrumbs = [{ title: "Class", path: RouteEnums.CLASS }, { title: "Class Division List", path: RouteEnums.CLASS_DIVISION_LIST }, { title: "Class Division Details" }];

  return (
    <>
      <PageBreadcrumbs pages={pageBreadcrumbs} />
      <div className="mt-8">
        <ClassDivisionDetails classDivisionId={classDivisionId} />
      </div>
    </>
  );
}
