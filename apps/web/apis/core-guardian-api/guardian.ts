import { getRequest } from "@/config/base-query";
import { useQuery } from "@tanstack/react-query";
import { QueryTagEnums } from "@/constants/query-store/query-constants";
import { isMockApisMode } from "@/lib/utils";
import { mockGetGuardianListResponse } from "./guardian.mocks";

const BASE_URL = "guardian";

export const useGetGuardianListQuery = ({ params, enabled }: { params: Partial<Record<"firstName" | "lastName" | "email" | "phoneNumber", string>> & { tenantId?: number }; enabled?: boolean }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.GUARDIAN, params?.tenantId],
    queryFn: async () => {
      if (isMockApisMode()) {
        return mockGetGuardianListResponse;
      }
      return await getRequest<Record<string, any>>({
        endpoint: `${BASE_URL}/list`,
        config: { params },
      });
    },
    enabled,
  });

  return { data, isLoading, error, refetch };
};

// export const useGuardianCreateMutation = () => {
//   const queryClient = useQueryClient();
//   const {
//     mutate: guardianCreate,
//     isPending: guardianCreatePending,
//     error: guardianCreateError,
//   } = useMutation({
//     mutationFn: async ({ payload }: { payload: StudentCreateFormSchemaType }) => {
//       const data = await postRequest<StudentType>({
//         endpoint: `${BASE_URL}/create`,
//         payload,
//         config: { params },
//       });

//       return data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: [QueryTagEnums.STUDENT] });
//       queryClient.invalidateQueries({ queryKey: [QueryTagEnums.USER] });
//     },
//   });

//   return { guardianCreate, guardianCreatePending, guardianCreateError };
// };
