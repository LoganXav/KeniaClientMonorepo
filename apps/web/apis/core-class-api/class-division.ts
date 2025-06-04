import { ClassDivisionType } from "@/types";
import { getRequest, postRequest } from "@/config/base-query";
import { QueryTagEnums } from "@/constants/query-store/query-constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ClassDivisionCreateFormSchemaType } from "@/app/@protected/(staff-portal)/class/division/create/_types/class-division-create-types";

const BASE_URL = "classdivision";

export const useGetClassDivisionListQuery = ({ params }: { params: { tenantId?: number } }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.CLASS_DIVISION, params?.tenantId],
    queryFn: async () => {
      return await getRequest<ClassDivisionType[]>({
        endpoint: `${BASE_URL}/list`,
        config: { params },
      });
    },
  });

  return { data, isLoading, error, refetch };
};

export const useGetClassDivisionQuery = ({ path, params }: { path: { classDivisionId?: number }; params: { tenantId?: number } }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.CLASS_DIVISION, params?.tenantId, path?.classDivisionId],
    queryFn: async () => {
      return await getRequest<ClassDivisionType>({
        endpoint: `${BASE_URL}/info/${path?.classDivisionId}`,
        config: { params },
      });
    },
    enabled: !!path?.classDivisionId,
  });

  return { data, isLoading, error, refetch };
};

export const useCreateClassDivisionMutation = ({ params }: { params: { tenantId?: number } }) => {
  const queryClient = useQueryClient();
  const {
    mutate: createClassDivision,
    isPending: createClassDivisionPending,
    error: createClassDivisionError,
  } = useMutation({
    mutationFn: async ({ payload }: { payload: ClassDivisionCreateFormSchemaType }) => {
      const data = await postRequest<ClassDivisionType>({
        endpoint: `${BASE_URL}/create`,
        payload,
        config: { params },
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.CLASS_DIVISION, params?.tenantId] });
    },
  });

  return { createClassDivision, createClassDivisionPending, createClassDivisionError };
};

export const useUpdateClassDivisionMutation = ({ path, params }: { path: { classDivisionId?: number }; params: { tenantId?: number } }) => {
  const queryClient = useQueryClient();
  const {
    mutate: updateClassDivision,
    isPending: updateClassDivisionPending,
    error: updateClassDivisionError,
  } = useMutation({
    mutationFn: async ({ payload }: { payload: ClassDivisionCreateFormSchemaType }) => {
      const data = await postRequest<ClassDivisionType>({
        endpoint: `${BASE_URL}/update/${path?.classDivisionId}`,
        payload,
        config: { params },
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.CLASS_DIVISION, params?.tenantId] });
    },
  });

  return { updateClassDivision, updateClassDivisionPending, updateClassDivisionError };
};
