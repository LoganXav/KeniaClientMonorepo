import { SchoolGradingStructureType } from "@/types";
import { getRequest, postRequest } from "@/config/base-query";
import { QueryTagEnums } from "@/constants/query-store/query-constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SchoolGradingStructureCreateFormSchemaType, SchoolGradingStructureTemplateOptions } from "@/app/@protected/(staff-portal)/school/grading/create/_types/school-grading-structure-form-types";

const BASE_URL = "tenant/gradingstructure";

export const useGetSchoolGradingStructureQuery = ({ path, params }: { path: { gradeStructureId?: number }; params: { tenantId?: number } }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.GRADING_STRUCTURE, params?.tenantId, path?.gradeStructureId],
    queryFn: async () => {
      return await getRequest<SchoolGradingStructureType>({
        endpoint: `${BASE_URL}/info/${path?.gradeStructureId}`,
        config: { params },
      });
    },
    enabled: !!path?.gradeStructureId,
  });

  return { data, isLoading, error, refetch };
};

export const useGetSchoolGradingStructureListQuery = ({ path, params }: { path: {}; params: { tenantId?: number } }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.GRADING_STRUCTURE, params?.tenantId],
    queryFn: async () => {
      return await getRequest<SchoolGradingStructureType[]>({
        endpoint: `${BASE_URL}/list`,
        config: { params },
      });
    },
  });

  return { data, isLoading, error, refetch };
};

export const useGetSchoolGradingStructureTemplateQuery = ({ path, params }: { path?: {}; params: { tenantId?: number; classIds?: string } }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.GRADING_STRUCTURE_TEMPLATE, params.tenantId, params.classIds],
    queryFn: async () => {
      return await getRequest<SchoolGradingStructureTemplateOptions>({
        endpoint: `${BASE_URL}/template`,
        config: { params },
      });
    },

    enabled: !!params?.classIds,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  return { data, isLoading, error, refetch };
};

export const useCreateSchoolGradingStructureMutation = ({ params }: { params: { tenantId?: number } }) => {
  const queryClient = useQueryClient();
  const {
    mutate: createGradingStructure,
    isPending: createGradingStructurePending,
    error: createGradingStructureError,
  } = useMutation({
    mutationFn: async ({ payload }: { payload: SchoolGradingStructureCreateFormSchemaType }) => {
      const data = await postRequest<SchoolGradingStructureType>({
        endpoint: `${BASE_URL}/create`,
        payload,
        config: { params },
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.GRADING_STRUCTURE, params?.tenantId] });
    },
  });

  return { createGradingStructure, createGradingStructurePending, createGradingStructureError };
};
