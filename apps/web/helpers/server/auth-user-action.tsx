"use server";

import { env } from "@/env.mjs";
import { AuthUserType } from "@/types";
import { cookies } from "next/headers";

export const getAuthUserServer = async (): Promise<{
  data: AuthUserType;
  accessToken: string;
} | null> => {
  try {
    const cookieStore = cookies();
    const authUser = cookieStore.get("authUser");

    if (!authUser || !authUser.value) {
      return null;
    }

    // TODO: Decrypt the authUser.value before parsing here
    return JSON.parse(authUser.value);
  } catch (error) {
    console.error("Error parsing authUser cookie:", error);
    return null;
  }
};

export const setAuthUser = async (user: {
  data: AuthUserType;
  accessToken: string;
}) => {
  const cookieStore = cookies();
  const userData = JSON.stringify(user);

  // TODO: Encrypt the userData before setting here

  cookieStore.set("authUser", userData, {
    secure: env.NODE_ENV === "production",
    httpOnly: false,
    sameSite: "strict",
    path: "/",
    // maxAge: 60 * 60 * 24 * 7,
  });
};

export const clearAuthUser = async () => {
  const cookieStore = cookies();
  cookieStore.delete("authUser");
};
