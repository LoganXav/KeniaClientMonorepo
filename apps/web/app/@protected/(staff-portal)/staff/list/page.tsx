import { Button } from "@repo/ui";
import React from "react";
import { RouteEnums } from "@/constants/router/route-constants";
import Link from "next/link";
import { StaffListTable } from "./_features/staff-list-table";
import { CirclePlus } from "lucide-react";
import { PageBreadcrumbs } from "@/components/breadcrumbs";

type Props = {};

function StaffListPage({}: Props) {
  const pageBreadcrumbs = [
    {
      title: "Dashboard",
      path: RouteEnums.DASHBOARD,
    },
    { title: "Staff", path: RouteEnums.STAFF },
    { title: "Staff List", path: RouteEnums.STAFF_LIST },
  ];

  return (
    <div className="pb-8">
      <PageBreadcrumbs pages={pageBreadcrumbs} />
      <div className="flex justify-between w-full pb-4 mt-8">
        <div className="hidden md:flex md:flex-1" />
        <Link className="w-full md:w-auto" href={RouteEnums.STAFF_CREATE}>
          <Button className="w-full">
            Add a new Staff <CirclePlus size={18} strokeWidth={1} />
          </Button>
        </Link>
      </div>
      <StaffListTable />
    </div>
  );
}

export default StaffListPage;
