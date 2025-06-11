import { StaffPeriodType } from "@/types";
import { getRequest } from "@/config/base-query";
import { useQuery } from "@tanstack/react-query";
import { QueryTagEnums } from "@/constants/query-store/query-constants";

const BASE_URL = "period";

export const useGetPeriodQuery = ({ params }: { params?: { tenantId?: number; today?: Date } }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.PERIOD, params?.tenantId, params?.today?.toISOString],
    queryFn: async () => {
      return await getRequest<StaffPeriodType[]>({
        endpoint: `${BASE_URL}/list`,
        config: { params },
      });
    },
  });

  return { data, isLoading, error, refetch };
};
