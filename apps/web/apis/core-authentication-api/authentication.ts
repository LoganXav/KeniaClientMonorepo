import { setAuthUserAction } from "@/helpers/server/auth-user-action";
import { postRequest } from "@/config/base-query";
import { AuthUserType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AuthSignUpSchemaType } from "@/app/@public/(auth)/signup/_validators/auth-signup-schema";
import { AuthSignInSchemaType } from "@/app/@public/(auth)/signin/_validators/auth-signin-schema";
import { useAuthUser } from "@/hooks/use-auth-user";
import { isMockApisMode } from "@/lib/utils";
import {
  mockSignUpResponse,
  mockSignInResponseAdmin,
} from "./authentication.mocks";

const BASE_URL = "auth";

export const useSignUpMutation = () => {
  const {
    mutate: signUp,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (payload: Omit<AuthSignUpSchemaType, "confirmPassword">) => {
      if (isMockApisMode()) {
        return mockSignUpResponse;
      }
      const data = await postRequest<{ id: number; tenantId: number }>({
        endpoint: `${BASE_URL}/signup`,
        payload,
      });
      return data;
    },
  });

  return { signUp, isPending, error };
};

export const useSignInMutation = () => {
  const { setAuthUserIds } = useAuthUser();

  const {
    mutate: signIn,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (payload: AuthSignInSchemaType) => {
      let data: { data: AuthUserType; accessToken?: string };
      if (isMockApisMode()) {
        data = mockSignInResponseAdmin;
      } else {
        data = await postRequest<AuthUserType>({
          endpoint: `${BASE_URL}/signin`,
          payload,
        });
      }

      await setAuthUserAction({
        accessToken: data?.accessToken!,
        data: data?.data,
      });

      setAuthUserIds({ id: data?.data?.id, tenantId: data?.data?.tenantId });

      const response = {
        ...data,
        accessToken: undefined,
      };

      return response;
    },
  });

  return { signIn, isPending, error };
};
