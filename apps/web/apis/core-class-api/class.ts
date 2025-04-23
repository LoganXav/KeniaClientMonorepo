import { getRequest, postRequest } from "@/config/base-query";
import { QueryTagEnums } from "@/constants/query-store/query-constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const BASE_URL = "class";

export const useGetClassListQuery = ({ params }: { params: { tenantId?: number } }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.CLASS, params?.tenantId],
    queryFn: async () => {
      return await getRequest<Record<string, any>>({
        endpoint: `${BASE_URL}/list`,
        config: { params },
      });
    },
  });

  return { data, isLoading, error, refetch };
};

export const useGetSingleClassQuery = ({ path, params }: { path: { classId: number }; params: { tenantId?: number } }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.CLASS, params?.tenantId, path?.classId],
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
