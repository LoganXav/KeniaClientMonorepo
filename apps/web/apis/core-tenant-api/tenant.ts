import { getRequest } from "@/config/base-query";
import { QueryTagEnums } from "@/constants/query-store/query-constants";
import { useQuery } from "@tanstack/react-query";

const BASE_URL = "tenant";

export const useGetTenantQuery = (params?: Record<string, any>) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.STAFF, params],
    queryFn: async () => {
      return await getRequest<Record<string, any>>({
        endpoint: `${BASE_URL}`,
        config: { params },
      });
    },
  });

  return { data: data?.data?.result, isLoading, error, refetch };
};
