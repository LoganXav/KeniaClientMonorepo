"use server";

import { env } from "@/env.mjs";
import { AuthUserType } from "@/types";
import { cookies } from "next/headers";

export const setAuthUser = (user: { data: AuthUserType; accessToken: string }) => {
  const cookieStore = cookies();
  const userData = JSON.stringify(user);

  cookieStore.set("authUser", userData, {
    secure: env.NODE_ENV === "production",
    httpOnly: false,
    sameSite: "strict",
    path: "/",
    // maxAge: 60 * 60 * 24 * 7,
  });
};

export const clearAuthUser = () => {
  const cookieStore = cookies();
  cookieStore.delete("authUser");
};
