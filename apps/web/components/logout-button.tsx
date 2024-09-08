"use client";

import { clearAuthUser } from "@/app/helpers/auth-user-action";
import { RouteEnums } from "@/constants/router/route-constants";
import { Button } from "@repo/ui";
import { useRouter } from "next/navigation";
import React from "react";

export default function LogoutButton() {
  const router = useRouter();

  function handleSignOut() {
    clearAuthUser();
    router.push(RouteEnums.HOME);
  }

  return <Button onClick={handleSignOut}>Logout</Button>;
}
