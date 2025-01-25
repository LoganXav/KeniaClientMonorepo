import { getRequest } from "@/config/base-query";
import { QueryTagEnums } from "@/constants/query-store/query-constants";
import { useQuery } from "@tanstack/react-query";

const BASE_URL = "tenant";

export const useGetTenantQuery = (params?: { tenantId?: number }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.TENANT, params?.tenantId],
    queryFn: async () => {
      return await getRequest<Record<string, any>>({
        endpoint: `${BASE_URL}`,
        config: { params },
      });
    },
    enabled: !!params?.tenantId,
  });

  return { data, isLoading, error, refetch };
};
