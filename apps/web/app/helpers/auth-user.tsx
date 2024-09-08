import { AuthUserType } from "@/types";
import { cookies } from "next/headers";

export const getAuthUser = (): AuthUserType | null => {
  const cookieStore = cookies();
  const authUser = cookieStore.get("authUser");

  if (!authUser || !authUser.value) {
    return null;
  }

  try {
    return JSON.parse(authUser.value);
  } catch (error) {
    console.error("Error parsing authUser cookie:", error);
    return null;
  }
};
