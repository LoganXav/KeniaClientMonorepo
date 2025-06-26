"use client";

import React from "react";
import Link from "next/link";
import { CircleAlert } from "lucide-react";
import { useIsMounted } from "@/hooks/use-mounted";
import { useAuthUser } from "@/hooks/use-auth-user";
import { Button, Card, CardContent } from "@repo/ui";
import { RouteEnums } from "@/constants/router/route-constants";
import { PermissionRestrictor } from "../permission-restrictor";
import { useGetTenantQuery } from "@/apis/core-tenant-api/tenant";
import { onboardingStatusEnums } from "@/constants/enums/tenant-enums";
import { PERMISSIONS } from "@/constants/permissions/permission-constants";

type Props = {};

export function CallToActionPrompt({}: Props) {
  const isMounted = useIsMounted();
  const { authUserIds } = useAuthUser();

  // Fetch tenant data
  const tenantQueryResult = useGetTenantQuery({ params: { tenantId: authUserIds?.tenantId } });
  const tenant = tenantQueryResult?.data?.data;

  const status = tenant?.onboardingStatus;
  const statusKey = String(status);
  const completedSteps = statusKey in onboardingStatusEnums ? onboardingStatusEnums[statusKey as keyof typeof onboardingStatusEnums] : 0;

  // Handle loading state for tenant query
  if (tenantQueryResult?.isLoading || !tenant) {
    return null;
  }

  // Ensure all conditions are met before rendering
  if (completedSteps !== 3 && isMounted) {
    return null; // Don't render anything if conditions aren't met
  }

  return (
    <PermissionRestrictor requiredPermissions={[PERMISSIONS.SCHOOL.UPDATE]}>
      <Card className="bg-blue-500/10 border border-blue-300">
        <CardContent className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex space-x-2 items-center">
            <CircleAlert size={16} strokeWidth={1} />
            <div>
              Complete your school's registration <br />
            </div>
            <div>{completedSteps} / 3</div>
          </div>
          <Link href={RouteEnums.SCHOOL_PROFILE}>
            <Button className="w-full md:w-auto" variant={"outline"}>
              Complete Registration
            </Button>
          </Link>
        </CardContent>
      </Card>
    </PermissionRestrictor>
  );
}
