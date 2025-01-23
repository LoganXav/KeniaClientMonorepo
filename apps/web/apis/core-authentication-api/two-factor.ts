import { AuthVerifySchemaType } from "@/app/@public/(auth)/verify/_validators/auth-verify-schema";
import { postRequest } from "@/config/base-query";
import { setAuthUser } from "@/helpers/server/auth-user-action";
import { AuthUserType } from "@/types";
import { useMutation } from "@tanstack/react-query";

const BASE_URL = "auth";

export const useVerifyOtpMutation = () => {
  const {
    mutate: verify,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (payload: AuthVerifySchemaType) => {
      const { data } = await postRequest<AuthUserType>({
        endpoint: `${BASE_URL}/otp/verify`,
        payload,
      });

      setAuthUser({
        accessToken: data.result.accessToken!,
        data: data.result.data,
      });

      return data.result;
    },
  });

  return { verify, isPending, error };
};

export const useResendOtpMutation = () => {
  const {
    mutate: resend,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (payload: { email: string }) => {
      const { data } = await postRequest<unknown>({
        endpoint: `${BASE_URL}/otp/refresh`,
        payload,
      });

      return data.result;
    },
  });

  return { resend, isPending, error };
};
