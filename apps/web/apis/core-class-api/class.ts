import { getRequest } from "@/config/base-query";
import { useQuery } from "@tanstack/react-query";
import { QueryTagEnums } from "@/constants/query-store/query-constants";
import { isMockApisMode } from "@/lib/utils";
import { mockGetClassListResponse, mockGetSingleClassResponse } from "./class.mocks";

const BASE_URL = "class";

export const useGetClassListQuery = ({ params }: { params: { tenantId?: number } }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.CLASS, params?.tenantId],
    queryFn: async () => {
      if (isMockApisMode()) {
        return mockGetClassListResponse;
      }
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
      if (isMockApisMode()) {
        return mockGetSingleClassResponse;
      }
      return await getRequest<Record<string, any>>({
        endpoint: `${BASE_URL}/info/${path?.classId}`,
        config: { params },
      });
    },
    enabled: !!path?.classId,
  });

  return { data, isLoading, error, refetch };
};
