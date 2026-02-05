import { postRequest } from "@/config/base-query";
import { isMockApisMode } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import {
  mockResetPasswordRequestResponse,
  mockChangePasswordResponse,
} from "./authentication.mocks";

const BASE_URL = "auth/password-reset";

export const useResetPasswordRequestMutation = () => {
  const {
    mutate: resetPasswordRequest,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (payload: { email: string }) => {
      if (isMockApisMode()) {
        return mockResetPasswordRequestResponse;
      }
      return await postRequest<unknown>({
        endpoint: `${BASE_URL}/request`,
        payload,
      });
    },
  });

  return { resetPasswordRequest, isPending, error };
};

export const useChangePasswordMutation = () => {
  const {
    mutate: changePassword,
    isPending,
    error,
  } = useMutation({
    mutationFn: async ({ payload, path }: { payload: { password: string }; path: { token: string } }) => {
      if (isMockApisMode()) {
        return mockChangePasswordResponse;
      }
      return await postRequest<unknown>({
        endpoint: `${BASE_URL}/${path?.token}`,
        payload,
      });
    },
  });

  return { changePassword, isPending, error };
};
