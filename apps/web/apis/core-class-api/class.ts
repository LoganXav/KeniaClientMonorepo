import { getRequest, postRequest } from "@/config/base-query";
import { QueryTagEnums } from "@/constants/query-store/query-constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const BASE_URL = "class";

export const useGetClassListQuery = (params?: Record<string, any>) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.CLASS],
    queryFn: async () => {
      return await getRequest<Record<string, any>>({
        endpoint: `${BASE_URL}/list`,
        config: { params },
      });
    },
  });

  return { data, isLoading, error, refetch };
};

// export const useStaffCreateMutation = () => {
//   const queryClient = useQueryClient();
//   const {
//     mutate: staffCreate,
//     isPending: staffCreatePending,
//     error: staffCreateError,
//   } = useMutation({
//     mutationFn: async ({ payload, params }: { payload: StaffCreateFormSchemaType; params?: { tenantId?: number } }) => {
//       const data = await postRequest<StaffType>({
//         endpoint: `${BASE_URL}/create`,
//         payload,
//         config: { params },
//       });

//       return data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: [QueryTagEnums.STAFF] });
//       queryClient.invalidateQueries({ queryKey: [QueryTagEnums.USER] });
//     },
//   });

//   return { staffCreate, staffCreatePending, staffCreateError };
// };

// export const useGetStaffTemplateQuery = (params: { codeValue?: number }) => {
//   const { data, isLoading, error, refetch } = useQuery({
//     queryKey: [QueryTagEnums.USER, params?.codeValue],
//     queryFn: async () => {
//       return await getRequest<StaffTemplateOptions>({
//         endpoint: `${BASE_URL}/template`,
//         config: { params },
//       });
//     },
//   });

//   return { data, isLoading, error, refetch };
// };

export const useGetSingleClassQuery = (path?: { classId: number }, params?: Record<string, any>) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.CLASS, path?.classId],
    queryFn: async () => {
      return await getRequest<Record<string, any>>({
        endpoint: `${BASE_URL}/info/${path?.classId}`,
        config: { params },
      });
    },
    enabled: !!path?.classId,
  });

  return { data, isLoading, error, refetch };
};

// export const useStaffUpdateMutation = (path?: { staffId?: number }) => {
//   const queryClient = useQueryClient();
//   const {
//     mutate: staffUpdate,
//     isPending: staffUpdatePending,
//     error: staffUpdateError,
//   } = useMutation({
//     mutationFn: async ({ payload, params }: { payload: StaffCreateFormSchemaType; params?: { tenantId?: number } }) => {
//       const data = await postRequest<StaffType>({
//         endpoint: `${BASE_URL}/update/${path?.staffId}`,
//         payload,
//         config: { params },
//       });

//       return data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: [QueryTagEnums.STAFF] });
//       queryClient.invalidateQueries({ queryKey: [QueryTagEnums.USER] });
//     },
//   });

//   return { staffUpdate, staffUpdatePending, staffUpdateError };
// };
