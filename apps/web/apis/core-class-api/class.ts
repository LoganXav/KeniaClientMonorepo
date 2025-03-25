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
