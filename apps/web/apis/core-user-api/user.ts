import { SchoolProfileFormSchemaType } from "@/app/@protected/(staff-portal)/school/profile/_types/school-profile-form-types";
import { getRequest } from "@/config/base-query";
import { QueryTagEnums } from "@/constants/query-store/query-constants";
import { useQuery } from "@tanstack/react-query";

const BASE_URL = "user";

export const useGetAuthUserQuery = (params: { userId?: number }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.USER, params?.userId],
    queryFn: async () => {
      return await getRequest<SchoolProfileFormSchemaType & { tenantId: number }>({
        endpoint: `${BASE_URL}/me`,
        config: { params },
      });
    },
    enabled: !!params?.userId,
  });

  return { data, isLoading, error, refetch };
};
