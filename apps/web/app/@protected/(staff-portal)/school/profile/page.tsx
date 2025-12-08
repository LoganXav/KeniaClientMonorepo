import React from "react";
import { PageBreadcrumbs } from "@/components/breadcrumbs";
import SchoolProfileForm from "./_features/school-profile-form";
import { RouteEnums } from "@/constants/router/route-constants";

type Props = {};

function SchoolProfile({}: Props) {
  const pageBreadcrumbs = [
    {
      title: "School",
      path: RouteEnums.SCHOOL,
    },
    { title: "Profile", path: RouteEnums.SCHOOL_PROFILE },
  ];

  return (
    <div>
      <PageBreadcrumbs pages={pageBreadcrumbs} />
      <div className="mt-8">
        <SchoolProfileForm />
      </div>
    </div>
  );
}

export default SchoolProfile;
