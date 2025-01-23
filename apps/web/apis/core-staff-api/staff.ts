import { getRequest, postRequest } from "@/config/base-query";
import { QueryTagEnums } from "@/constants/query-store/query-constants";
import { useMutation, useQuery } from "@tanstack/react-query";

const BASE_URL = "staff";

export const useGetStaffListQuery = (params?: any) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.STAFF],
    queryFn: async () => {
      return await getRequest<Record<string, any>>({
        endpoint: `${BASE_URL}/list`,
        config: { params },
      });
    },
  });

  return { data: data?.data?.result, isLoading, error, refetch };
};

// export const useVerifyOtpMutation = () => {
//   const {
//     mutate: verify,
//     isPending,
//     error,
//   } = useMutation({
//     mutationFn: async (payload: VerifySchemaType) => {
//       const { data } = await postRequest<AuthUserType>({
//         endpoint: `${BASE_URL}/otp/verify`,
//         payload,
//       });
//
//       setAuthUser({
//         accessToken: data.result.accessToken!,
//         data: data.result.data,
//       });
//
//       return data.result;
//     },
//   });
//
//   return { verify, isPending, error };
// };
