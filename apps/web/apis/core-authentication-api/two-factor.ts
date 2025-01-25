import { AuthVerifySchemaType } from "@/app/@public/(auth)/verify/_validators/auth-verify-schema";
import { postRequest } from "@/config/base-query";
import { setAuthUserAction } from "@/helpers/server/auth-user-action";
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
      const data = await postRequest<AuthUserType>({
        endpoint: `${BASE_URL}/otp/verify`,
        payload,
      });

      setAuthUserAction({
        accessToken: data?.accessToken!,
        data: data?.data,
      });

      return data;
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
      const data = await postRequest<unknown>({
        endpoint: `${BASE_URL}/otp/refresh`,
        payload,
      });

      return data;
    },
  });

  return { resend, isPending, error };
};
