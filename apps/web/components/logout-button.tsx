"use client";

import { clearAuthUserAction } from "@/helpers/server/auth-user-action";
import { RouteEnums } from "@/constants/router/route-constants";
import { Button } from "@repo/ui";
import { useRouter } from "next/navigation";
import React from "react";

export default function LogoutButton() {
  const router = useRouter();

  async function handleSignOut() {
    clearAuthUserAction();
    router.push(RouteEnums.HOME);
  }

  return <Button onClick={handleSignOut}>Logout</Button>;
}
