import { ClassDivisionCreateFormSchemaType } from "@/app/@protected/(staff-portal)/class/division/create/_types/class-division-create-types";
import { getRequest, postRequest } from "@/config/base-query";
import { QueryTagEnums } from "@/constants/query-store/query-constants";
import { ClassDivisionType } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { log } from "console";

const BASE_URL = "classdivision";

export const useGetClassDivisionListQuery = (params?: Record<string, any>) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.CLASS_DIVISION],
    queryFn: async () => {
      return await getRequest<Record<string, any>>({
        endpoint: `${BASE_URL}/list`,
        config: { params },
      });
    },
  });

  return { data, isLoading, error, refetch };
};

export const useGetClassDivisionQuery = (path?: { classDivisionId?: number }, params?: Record<string, any>) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.CLASS_DIVISION, path?.classDivisionId],
    queryFn: async () => {
      return await getRequest<Record<string, any>>({
        endpoint: `${BASE_URL}/info/${path?.classDivisionId}`,
        config: { params },
      });
    },
    enabled: !!path?.classDivisionId,
  });

  return { data, isLoading, error, refetch };
};

export const useCreateClassDivisionMutation = () => {
  const queryClient = useQueryClient();
  const {
    mutate: createClassDivision,
    isPending: createClassDivisionPending,
    error: createClassDivisionError,
  } = useMutation({
    mutationFn: async ({ payload, params }: { payload: ClassDivisionCreateFormSchemaType; params?: { tenantId?: number } }) => {
      const data = await postRequest<ClassDivisionType>({
        endpoint: `${BASE_URL}/create`,
        payload,
        config: { params },
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.CLASS_DIVISION] });
    },
  });

  return { createClassDivision, createClassDivisionPending, createClassDivisionError };
};

export const useUpdateClassDivisionMutation = (path?: { classDivisionId?: number }) => {
  const queryClient = useQueryClient();
  const {
    mutate: updateClassDivision,
    isPending: updateClassDivisionPending,
    error: updateClassDivisionError,
  } = useMutation({
    mutationFn: async ({ payload, params }: { payload: ClassDivisionCreateFormSchemaType; params?: { tenantId?: number } }) => {
      const data = await postRequest<ClassDivisionType>({
        endpoint: `${BASE_URL}/update/${path?.classDivisionId}`,
        payload,
        config: { params },
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.CLASS_DIVISION] });
    },
  });

  return { updateClassDivision, updateClassDivisionPending, updateClassDivisionError };
};
