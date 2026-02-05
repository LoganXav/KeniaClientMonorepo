"use server";

import { env } from "@/env.mjs";
import { AuthUserType } from "@/types";
import { cookies } from "next/headers";
import { isMockApisMode } from "@/lib/utils";
import { mockSignInResponseAdmin } from "@/apis/core-authentication-api/authentication.mocks";

const MOCK_LOGGED_OUT_COOKIE = "mock_logged_out";

export const getAuthUserAction = async (): Promise<{
  data: AuthUserType;
  accessToken: string;
} | null> => {
  try {
    const cookieStore = cookies();
    const authUser = cookieStore.get("authUser");

    if (!authUser || !authUser.value) {
      if (isMockApisMode()) {
        const mockLoggedOut = cookieStore.get(MOCK_LOGGED_OUT_COOKIE);
        if (mockLoggedOut?.value) return null;
        return {
          data: mockSignInResponseAdmin.data,
          accessToken: mockSignInResponseAdmin.accessToken,
        };
      }
      return null;
    }

    // TODO: Decrypt the authUser.value before parsing here
    return JSON.parse(authUser.value);
  } catch (error) {
    console.error("Error parsing authUser cookie:", error);
    if (isMockApisMode()) {
      return {
        data: mockSignInResponseAdmin.data,
        accessToken: mockSignInResponseAdmin.accessToken,
      };
    }
    return null;
  }
};

export const setAuthUserAction = async (user: { data: AuthUserType; accessToken: string }) => {
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

  // In mock mode, clear the "logged out" flag so auth helpers return the user
  if (isMockApisMode()) {
    cookieStore.delete(MOCK_LOGGED_OUT_COOKIE);
  }
};

export const clearAuthUserAction = async () => {
  const cookieStore = cookies();
  cookieStore.delete("authUser");
  // In mock mode, set flag so auth helpers return null (logout takes effect)
  if (isMockApisMode()) {
    cookieStore.set(MOCK_LOGGED_OUT_COOKIE, "1", {
      secure: false,
      httpOnly: false,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
  }
};
