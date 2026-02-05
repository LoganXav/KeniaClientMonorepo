import { AuthVerifySchemaType } from "@/app/@public/(auth)/verify/_validators/auth-verify-schema";
import { postRequest } from "@/config/base-query";
import { setAuthUserAction } from "@/helpers/server/auth-user-action";
import { useAuthUser } from "@/hooks/use-auth-user";
import { isMockApisMode } from "@/lib/utils";
import { AuthUserType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import {
  mockVerifyOtpResponse,
  mockResendOtpResponse,
} from "./authentication.mocks";

const BASE_URL = "auth";

export const useVerifyOtpMutation = () => {
  const { setAuthUserIds } = useAuthUser();

  const {
    mutate: verify,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (payload: AuthVerifySchemaType) => {
      let data;
      if (isMockApisMode()) {
        data = mockVerifyOtpResponse;
      } else {
        data = await postRequest<AuthUserType>({
          endpoint: `${BASE_URL}/otp/verify`,
          payload,
        });
      }

      await setAuthUserAction({
        accessToken: data?.accessToken!,
        data: data?.data,
      });
      setAuthUserIds({ id: data?.data?.id, tenantId: data?.data?.tenantId });

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
      if (isMockApisMode()) {
        return mockResendOtpResponse;
      }
      return await postRequest<unknown>({
        endpoint: `${BASE_URL}/otp/refresh`,
        payload,
      });
    },
  });

  return { resend, isPending, error };
};
