import { AuthUserType } from "@/types";
import { cookies } from "next/headers";
import { mockSignInResponseAdmin } from "@/apis/core-authentication-api/authentication.mocks";
import { isMockApisMode } from "@/lib/utils";

const MOCK_LOGGED_OUT_COOKIE = "mock_logged_out";

export const getAuthUserServer = (): { data: AuthUserType; accessToken: string } | null => {
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

  try {
    // TODO: Decrypt the authUser.value before parsing here
    return JSON.parse(authUser.value);
  } catch (error) {
    console.error("Error parsing authUser cookie:", error);
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
};
