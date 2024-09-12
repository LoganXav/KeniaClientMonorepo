"use client";

import { clearAuthUser } from "@/helpers/auth-user-action";
import { RouteEnums } from "@/constants/router/route-constants";
import { Button } from "@repo/ui";
import { useRouter } from "next/navigation";
import React from "react";
import { postRequest } from "@/config/base-query";

export default function LogoutButton() {
  const router = useRouter();

  async function handleSignOut() {
    clearAuthUser();
    router.push(RouteEnums.HOME);
  }

  return <Button onClick={handleSignOut}>Logout</Button>;
}
