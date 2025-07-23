import React from "react";
import Link from "next/link";
import { Earth } from "lucide-react";
import { Typography } from "@repo/ui";
import AuthLobbyTabs from "./_features/auth-lobby-tabs";
import { RouteEnums } from "@/constants/router/route-constants";

function AuthLobby() {
  return (
    <div className="w-full grid lg:grid-cols-4 xl:grid-cols-5 p-4 gap-4">
      <div className="hidden lg:flex xl:col-span-1" />
      <div className="grid space-y-8 lg:col-span-2 xl:col-span-2 mt-20 max-w-xl">
        <div className="w-full space-y-2">
          <Typography size={"h2"} className="font-heading">
            How will you use Kenia?
          </Typography>
          <Typography color={"muted"}>Please select an option below.</Typography>
        </div>
        <AuthLobbyTabs />
      </div>
      <div className="flex xl:col-span-2 xl:justify-end h-min items-center gap-4">
        <Earth strokeWidth={"1"} size={18} />
        <Typography className="border-l border-foreground pl-4">
          Want to register a new school?{" "}
          <Link href={RouteEnums.SIGNUP} className="font-semibold text-muted-foreground transition-colors hover:text-link underline pl-1">
            Sign up.
          </Link>
        </Typography>
      </div>
    </div>
  );
}

export default AuthLobby;
