import { SignUpSchemaType } from "@/app/@public/(auth)/signup/_validators/signup-schema";
import { postRequest } from "@/config/base-query";
import { useMutation } from "@tanstack/react-query";

const BASE_URL = "auth";

export const useCoreSignupMutation = () => {
  const {
    mutate: signUp,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (payload: Omit<SignUpSchemaType, "confirmPassword">) => {
      const { data } = await postRequest<{ number: number; tenantId: number }>({
        endpoint: `${BASE_URL}/signup`,
        payload,
      });

      return data.data;
    },
  });

  return { signUp, isPending, error };
};
