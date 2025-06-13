import { RoleType } from "@/types";
import { getRequest, postRequest } from "@/config/base-query";
import { QueryTagEnums } from "@/constants/query-store/query-constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RoleAndPermissionsCreateFormSchemaType, RolesAndPermissionsTemplateOptions } from "@/app/@protected/(staff-portal)/roles-and-permissions/_types/roles-and-permissions-form-types";

const BASE_URL = "role";

export const useGetRoleTemplateQuery = ({ params }: { params?: { tenantId?: number } }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.ROLE_TEMPLATE, params?.tenantId],
    queryFn: async () => {
      return await getRequest<RolesAndPermissionsTemplateOptions>({
        endpoint: `${BASE_URL}/template`,
        config: { params },
      });
    },
  });

  return { data, isLoading, error, refetch };
};

export const useGetRoleListQuery = ({ params }: { params?: { tenantId?: number } }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.ROLE, params?.tenantId],
    queryFn: async () => {
      return await getRequest<RoleType[]>({
        endpoint: `${BASE_URL}/list`,
        config: { params },
      });
    },
  });

  return { data, isLoading, error, refetch };
};

export const useRoleCreateMutation = ({ params }: { params?: { tenantId?: number } }) => {
  const queryClient = useQueryClient();
  const {
    mutate: roleCreate,
    isPending: roleCreatePending,
    error: roleCreateError,
  } = useMutation({
    mutationFn: async ({ payload }: { payload: RoleAndPermissionsCreateFormSchemaType }) => {
      const data = await postRequest<RoleType>({
        endpoint: `${BASE_URL}/create`,
        payload,
        config: { params },
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.ROLE, params?.tenantId] });
    },
  });

  return { roleCreate, roleCreatePending, roleCreateError };
};

export const useRoleUpdateMutation = ({ path, params }: { path: { id?: number }; params?: { tenantId?: number } }) => {
  const queryClient = useQueryClient();
  const {
    mutate: roleUpdate,
    isPending: roleUpdatePending,
    error: roleUpdateError,
  } = useMutation({
    mutationFn: async ({ payload }: { payload: RoleAndPermissionsCreateFormSchemaType }) => {
      const data = await postRequest<RoleType>({
        endpoint: `${BASE_URL}/update/${path?.id}`,
        payload,
        config: { params },
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.ROLE, params?.tenantId] });
    },
  });

  return { roleUpdate, roleUpdatePending, roleUpdateError };
};
