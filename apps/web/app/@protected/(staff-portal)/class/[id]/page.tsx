import React from "react";
import ClassDetails from "./_features/class-details";
import { PageBreadcrumbs } from "@/components/breadcrumbs";
import { RouteEnums } from "@/constants/router/route-constants";

type Props = {
  params: {
    id: string;
  };
};

export default function ClassDetailsPage({ params }: Props) {
  const classId = parseInt(params.id, 10);

  const pageBreadcrumbs = [{ title: "Class", path: RouteEnums.CLASS }, { title: "Class List", path: RouteEnums.CLASS_LIST }, { title: "Class Details" }];

  return (
    <>
      <PageBreadcrumbs pages={pageBreadcrumbs} />
      <div className="mt-8">
        <ClassDetails classId={classId} />
      </div>
    </>
  );
}
