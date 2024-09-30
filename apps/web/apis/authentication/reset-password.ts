import { postRequest } from "@/config/base-query";
import { useMutation } from "@tanstack/react-query";

const BASE_URL = "auth/password-reset";

export const useResetPasswordRequestMutation = () => {
  const {
    mutate: resetPasswordRequest,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (payload: { email: string }) => {
      const { data } = await postRequest<unknown>({
        endpoint: `${BASE_URL}/request`,
        payload,
      });

      return data.result;
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
    mutationFn: async ({
      payload,
      path,
    }: {
      payload: { password: string };
      path: { token: string };
    }) => {
      const { data } = await postRequest<unknown>({
        endpoint: `${BASE_URL}/${path?.token}`,
        payload,
      });

      return data.result;
    },
  });

  return { changePassword, isPending, error };
};
