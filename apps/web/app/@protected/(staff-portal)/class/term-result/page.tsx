import React from "react";
import { PageBreadcrumbs } from "@/components/breadcrumbs";
import { RouteEnums } from "@/constants/router/route-constants";
import { ClassTermResultCollationListTable } from "./_features/class-term-result-collation-list-table";

type Props = {};

function ClassTermResultCollationPage({}: Props) {
  const pageBreadcrumbs = [{ title: "Class", path: RouteEnums.CLASS }, { title: "Term Result Collation" }];

  return (
    <div className="pb-8">
      <PageBreadcrumbs pages={pageBreadcrumbs} />
      <ClassTermResultCollationListTable />
    </div>
  );
}

export default ClassTermResultCollationPage;
