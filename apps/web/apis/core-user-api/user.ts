import { getRequest } from "@/config/base-query";
import { QueryTagEnums } from "@/constants/query-store/query-constants";
import { UserWithRelationsType } from "@/types";
import { useQuery } from "@tanstack/react-query";

const BASE_URL = "user";

export const useGetAuthUserQuery = (params: { userId?: number }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.USER, params?.userId],
    queryFn: async () => {
      return await getRequest<UserWithRelationsType>({
        endpoint: `${BASE_URL}/me`,
        config: { params },
      });
    },
    enabled: !!params?.userId,
  });

  return { data, isLoading, error, refetch };
};
