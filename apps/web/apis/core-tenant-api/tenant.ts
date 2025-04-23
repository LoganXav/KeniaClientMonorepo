import { getRequest } from "@/config/base-query";
import { QueryTagEnums } from "@/constants/query-store/query-constants";
import { SchoolType } from "@/types";
import { useQuery } from "@tanstack/react-query";

const BASE_URL = "tenant";

export const useGetTenantQuery = ({ params }: { params: { tenantId?: number } }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.TENANT, params?.tenantId],
    queryFn: async () => {
      return await getRequest<SchoolType>({
        endpoint: `${BASE_URL}`,
        config: { params },
      });
    },
  });

  return { data, isLoading, error, refetch };
};
