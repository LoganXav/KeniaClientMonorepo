"use client";

import React from "react";
import Link from "next/link";
import { CircleAlert } from "lucide-react";
import { useIsMounted } from "@/hooks/use-mounted";
import { useAuthUser } from "@/hooks/use-auth-user";
import { Button, Card, CardContent } from "@repo/ui";
import { RouteEnums } from "@/constants/router/route-constants";
import { PermissionRestrictor } from "../permission-restrictor";
import { PERMISSIONS } from "@/constants/permissions/permission-constants";

type Props = {};

export function CallToActionPrompt({}: Props) {
  const isMounted = useIsMounted();
  const { authUserIds } = useAuthUser();

  return (
    <PermissionRestrictor requiredPermissions={[PERMISSIONS.SCHOOL.UPDATE]}>
      <Card className="bg-blue-500/10 border border-blue-300">
        <CardContent className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex space-x-2 items-center">
            <CircleAlert size={16} strokeWidth={1} />
            <div>
              Complete your school's registration <br />
            </div>
            <div />
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
