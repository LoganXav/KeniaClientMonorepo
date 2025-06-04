import { StaffCreateFormSchemaType, StaffTemplateOptions } from "@/app/@protected/(staff-portal)/staff/create/_types/staff-create-form-types";
import { getRequest, postRequest } from "@/config/base-query";
import { QueryTagEnums } from "@/constants/query-store/query-constants";
import { StaffType } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const BASE_URL = "staff";

export const useGetStaffListQuery = ({ params }: { params?: { tenantId?: number; jobTitle?: string } }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.STAFF, params?.tenantId],
    queryFn: async () => {
      return await getRequest<StaffType[]>({
        endpoint: `${BASE_URL}/list`,
        config: { params },
      });
    },
  });

  return { data, isLoading, error, refetch };
};

export const useStaffCreateMutation = ({ params }: { params?: { tenantId?: number } }) => {
  const queryClient = useQueryClient();
  const {
    mutate: staffCreate,
    isPending: staffCreatePending,
    error: staffCreateError,
  } = useMutation({
    mutationFn: async ({ payload }: { payload: StaffCreateFormSchemaType }) => {
      const data = await postRequest<StaffType>({
        endpoint: `${BASE_URL}/create`,
        payload,
        config: { params },
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.STAFF, params?.tenantId] });
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.USER, params?.tenantId] });
    },
  });

  return { staffCreate, staffCreatePending, staffCreateError };
};

export const useGetStaffTemplateQuery = ({ params }: { params: { tenantId?: number; codeValue?: number } }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.STAFF_TEMPLATE, params?.tenantId, params?.codeValue],
    queryFn: async () => {
      return await getRequest<StaffTemplateOptions>({
        endpoint: `${BASE_URL}/template`,
        config: { params },
      });
    },
  });

  return { data, isLoading, error, refetch };
};

export const useGetSingleStaffQuery = ({ path, params }: { path: { staffId?: number }; params: { tenantId?: number } }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.STAFF, params?.tenantId, path?.staffId],
    queryFn: async () => {
      return await getRequest<StaffType>({
        endpoint: `${BASE_URL}/info/${path?.staffId}`,
        config: { params },
      });
    },
    enabled: !!path?.staffId,
  });

  return { data, isLoading, error, refetch };
};

export const useStaffUpdateMutation = ({ path, params }: { path?: { staffId?: number }; params?: { tenantId?: number } }) => {
  const queryClient = useQueryClient();
  const {
    mutate: staffUpdate,
    isPending: staffUpdatePending,
    error: staffUpdateError,
  } = useMutation({
    mutationFn: async ({ payload }: { payload: StaffCreateFormSchemaType }) => {
      const data = await postRequest<StaffType>({
        endpoint: `${BASE_URL}/update/${path?.staffId}`,
        payload,
        config: { params },
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.STAFF, params?.tenantId] });
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.USER, params?.tenantId] });
    },
  });

  return { staffUpdate, staffUpdatePending, staffUpdateError };
};
