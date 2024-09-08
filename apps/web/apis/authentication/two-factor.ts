import { VerifySchemaType } from "@/app/@public/(auth)/verify/_validators/verify-schema";
import { postRequest } from "@/config/base-query";
import { AuthUserType } from "@/types";
import { useMutation } from "@tanstack/react-query";

const BASE_URL = "auth";

export const useVerifyOtpMutation = () => {
  const {
    mutate: verify,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (payload: VerifySchemaType) => {
      const { data } = await postRequest<AuthUserType>({
        endpoint: `${BASE_URL}/otp/verify`,
        payload,
      });

      // console.log(data.data.accessToken); Provide to my root layout to provide auth state and http interceptor headers
      return data.data;
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

      return data.data;
    },
  });

  return { resend, isPending, error };
};
