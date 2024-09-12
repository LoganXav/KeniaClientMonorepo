import { SignInSchemaType } from "@/app/@public/(auth)/signin/_validators/signin-schema";
import { SignUpSchemaType } from "@/app/@public/(auth)/signup/_validators/signup-schema";
import { setAuthUser } from "@/helpers/auth-user-action";
import { postRequest } from "@/config/base-query";
import { AuthUserType } from "@/types";
import { useMutation } from "@tanstack/react-query";

const BASE_URL = "auth";

export const useSignUpMutation = () => {
  const {
    mutate: signUp,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (payload: Omit<SignUpSchemaType, "confirmPassword">) => {
      const { data } = await postRequest<{ id: number; tenantId: number }>({
        endpoint: `${BASE_URL}/signup`,
        payload,
      });

      return data.data;
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
    mutationFn: async (payload: SignInSchemaType) => {
      const { data } = await postRequest<AuthUserType>({
        endpoint: `${BASE_URL}/signin`,
        payload,
      });

      setAuthUser({
        accessToken: data.data.accessToken!,
        data: data.data.data,
      });

      return data.data;
    },
  });

  return { signIn, isPending, error };
};
