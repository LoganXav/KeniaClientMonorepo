import { AuthUserType } from "@/types";
import { cookies } from "next/headers";

export const getAuthUser = (): { data: AuthUserType; accessToken: string } | null => {
  const cookieStore = cookies();
  const authUser = cookieStore.get("authUser");

  if (!authUser || !authUser.value) {
    return null;
  }

  try {
    // TODO: Decrypt the authUser.value before parsing here
    return JSON.parse(authUser.value);
  } catch (error) {
    console.error("Error parsing authUser cookie:", error);
    return null;
  }
};
