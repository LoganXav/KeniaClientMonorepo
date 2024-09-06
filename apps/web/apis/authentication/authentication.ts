import { SignInSchemaType } from "@/app/@public/(auth)/signin/_validators/signin-schema";
import { SignUpSchemaType } from "@/app/@public/(auth)/signup/_validators/signup-schema";
import { postRequest } from "@/config/base-query";
import { useMutation } from "@tanstack/react-query";

const BASE_URL = "auth";

export const useSignUpMutation = () => {
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

export const useSignInMutation = () => {
  const {
    mutate: signIn,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (payload: SignInSchemaType) => {
      const { data } = await postRequest<unknown>({
        endpoint: `${BASE_URL}/signin`,
        payload,
      });

      return data.data;
    },
  });

  return { signIn, isPending, error };
};

// export const useResendOtpQuery = (payload: { email: string }) => {
//   return useQuery({
//     queryKey: ["resendOtp", payload.email],
//     queryFn: async () => {
//       const { data } = await getRequest<unknown>({
//         endpoint: `${BASE_URL}/otp/refresh`,
//         payload,
//       });

//       return data;
//     },
//     enabled: false,
//   });
// };
