"use client";
import { useGetTenantQuery } from "@/apis/core-tenant-api/tenant";
import { useGetAuthUserQuery } from "@/apis/core-user-api/user";
import { onboardingStatusEnums } from "@/constants/enums/tenant-enums";
import { RouteEnums } from "@/constants/router/route-constants";
import { useAuthUser } from "@/hooks/use-auth-user";
import { useIsMounted } from "@/hooks/use-mounted";
import { Button, Card, CardContent } from "@repo/ui";
import { CircleAlert } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

export function CallToActionPrompt({}: Props) {
  const isMounted = useIsMounted();

  const { authUserIds } = useAuthUser();
  const authUserQueryResult = useGetAuthUserQuery(React.useMemo(() => ({ userId: authUserIds?.id }), [authUserIds?.id]));
  const authUser = authUserQueryResult?.data?.data;

  const tenantId = authUser?.tenantId;

  const { data } = useGetTenantQuery(React.useMemo(() => ({ tenantId: tenantId }), [tenantId]));
  const status = data?.data?.onboardingStatus;

  const statusKey = String(status);
  const completedSteps = statusKey in onboardingStatusEnums ? onboardingStatusEnums[statusKey as keyof typeof onboardingStatusEnums] : 0;

  if (!isMounted || authUser?.staff?.role?.rank != 1 || completedSteps == 3) {
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
        <Link href={RouteEnums.SCHOOL_PROFILE}>
          <Button className="w-full md:w-auto" variant={"outline"}>
            Complete Registration
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
