import { setAuthUser } from "@/helpers/auth-user-action";
import { postRequest } from "@/config/base-query";
import { AuthUserType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AuthSignUpSchemaType } from "@/app/@public/(auth)/signup/_validators/auth-signup-schema";
import { AuthSignInSchemaType } from "@/app/@public/(auth)/signin/_validators/auth-signin-schema";

const BASE_URL = "auth";

export const useSignUpMutation = () => {
  const {
    mutate: signUp,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (payload: Omit<AuthSignUpSchemaType, "confirmPassword">) => {
      const { data } = await postRequest<{ id: number; tenantId: number }>({
        endpoint: `${BASE_URL}/signup`,
        payload,
      });

      return data.result;
    },
  });

  return { signUp, isPending, error };
};

export const useSignInMutation = () => {
  const {
    mutate: signIn,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (payload: AuthSignInSchemaType) => {
      const { data } = await postRequest<AuthUserType>({
        endpoint: `${BASE_URL}/signin`,
        payload,
      });

      setAuthUser({
        accessToken: data.result.accessToken!,
        data: data.result.data,
      });

      delete data.result.accessToken;
      return data.result;
    },
  });

  return { signIn, isPending, error };
};
