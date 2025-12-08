import { SchoolProfileFormSchemaType, SchoolProfileFormTemplateType } from "@/app/@protected/(staff-portal)/school/profile/_types/school-profile-form-types";
import { getRequest, postRequest } from "@/config/base-query";
import { QueryTagEnums } from "@/constants/query-store/query-constants";
import { SchoolType } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export const useUpdateTenantProfileMutation = ({ params }: { params: { tenantId?: number } }) => {
  const queryClient = useQueryClient();
  const {
    mutate: updateTenantProfile,
    isPending: updateTenantProfilePending,
    error: updateTenantProfileError,
  } = useMutation({
    mutationFn: async ({ payload }: { payload: SchoolProfileFormSchemaType }) => {
      const data = await postRequest<null>({
        endpoint: `${BASE_URL}/update`,
        payload,
        config: { params },
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.TENANT, params?.tenantId] });
    },
  });

  return { updateTenantProfile, updateTenantProfilePending, updateTenantProfileError };
};

export const useGetSchoolProfileTemplateQuery = ({ params }: { params: { tenantId?: number; codeValue?: number } }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.USER, params?.tenantId, params?.codeValue],
    queryFn: async () => {
      return await getRequest<SchoolProfileFormTemplateType>({
        endpoint: `${BASE_URL}/template`,
        config: { params },
      });
    },
  });

  return { data, isLoading, error, refetch };
};
