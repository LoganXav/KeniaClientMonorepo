import { getRequest } from "@/config/base-query";
import { QueryTagEnums } from "@/constants/query-store/query-constants";
import { isMockApisMode } from "@/lib/utils";
import { StaffPeriodType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { mockGetPeriodResponse } from "./period.mocks";

const BASE_URL = "period";

export const useGetPeriodQuery = ({ params }: { params?: { tenantId?: number; today?: Date } }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.PERIOD, params?.tenantId, params?.today?.toISOString],
    queryFn: async () => {
      if (isMockApisMode()) {
        return mockGetPeriodResponse;
      }
      return await getRequest<StaffPeriodType[]>({
        endpoint: `${BASE_URL}/list`,
        config: { params },
      });
    },
  });

  return { data, isLoading, error, refetch };
};
