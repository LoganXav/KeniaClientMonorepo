import { getRequest } from "@/config/base-query";
import { QueryTagEnums } from "@/constants/query-store/query-constants";
import { useQuery } from "@tanstack/react-query";

const BASE_URL = "guardian";

export const useGetGuardianListQuery = ({ params }: { params: Partial<Record<"firstName" | "lastName" | "email" | "phoneNumber", string>> & { tenantId?: number } }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.GUARDIAN, params?.tenantId],
    queryFn: async () => {
      return await getRequest<Record<string, any>>({
        endpoint: `${BASE_URL}/list`,
        config: { params },
      });
    },
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
//     mutationFn: async ({ payload, params }: { payload: StudentCreateFormSchemaType; params?: { tenantId?: number } }) => {
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
