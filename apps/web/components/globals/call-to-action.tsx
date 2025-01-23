"use client";
import { useGetTenantQuery } from "@/apis/core-tenant-api/tenant";
import { useAuthUserClient } from "@/hooks/use-auth-user";
import { Button, Card, CardContent } from "@repo/ui";
import { CircleAlert } from "lucide-react";
import React from "react";

type Props = {};

export function CallToActionPrompt({}: Props) {
  const { authUserClient } = useAuthUserClient();
  const tenantId = authUserClient?.tenantId;

  const { data } = useGetTenantQuery(React.useMemo(() => ({ tenantId: tenantId }), [tenantId]));
  const status = data?.data?.onboardingStatus;

  const statusKey = String(status);
  const completedSteps = statusKey in onboardingStatusEnums ? onboardingStatusEnums[statusKey as keyof typeof onboardingStatusEnums] : 0;

  if (authUserClient?.staff?.role?.rank != 1 || completedSteps == 3) {
    return null;
  }
  return (
    <Card className="bg-blue-500/10 border border-blue-300">
      <CardContent className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex space-x-2 items-center">
          <CircleAlert size={16} strokeWidth={1} />
          <div>
            Complete your school's registration <br />
          </div>
          <div>{completedSteps} / 3</div>
        </div>
        <Button className="w-full md:w-auto" variant={"outline"}>
          Complete Registration
        </Button>
      </CardContent>
    </Card>
  );
}

const onboardingStatusEnums = {
  PERSONAL: 0,
  RESIDENTIAL: 1,
  SCHOOL: 2,
  COMPLETE: 3,
};
