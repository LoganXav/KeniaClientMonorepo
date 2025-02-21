import { StudentCreateFormSchemaType, StudentTemplateOptions } from "@/app/@protected/(staff-portal)/student/create/_types/student-create-form-types";
import { getRequest, postRequest } from "@/config/base-query";
import { QueryTagEnums } from "@/constants/query-store/query-constants";
import { StudentType } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const BASE_URL = "guardian";

export const useGetGuardianListQuery = (params?: Partial<Record<"firstName" | "lastName" | "email" | "phoneNumber", string>>) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.GUARDIAN, params],
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
