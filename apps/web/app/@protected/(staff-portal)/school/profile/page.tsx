import React from "react";
import SchoolProfileOnboardingForm from "./_features/school-profile-onboarding-form";
import { PageBreadcrumbs } from "@/components/breadcrumbs";
import { RouteEnums } from "@/constants/router/route-constants";

type Props = {};

function SchoolProfile({}: Props) {
  const pageBreadcrumbs = [
    {
      title: "Dashboard",
      path: RouteEnums.DASHBOARD,
    },
    { title: "Onboarding", path: RouteEnums.SCHOOL_PROFILE },
  ];

  return (
    <div>
      <PageBreadcrumbs pages={pageBreadcrumbs} />
      <div className="mt-8">
        <SchoolProfileOnboardingForm />
      </div>
    </div>
  );
}

export default SchoolProfile;
