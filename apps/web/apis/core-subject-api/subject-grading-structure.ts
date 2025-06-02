import { SubjectGradingStructureType } from "@/types";
import { getRequest, postRequest } from "@/config/base-query";
import { QueryTagEnums } from "@/constants/query-store/query-constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SubjectGradingStructureCreateFormSchemaType } from "@/app/@protected/(staff-portal)/subject/[id]/_types/subject-grading-structure-form-types";

const BASE_URL = "subject/gradingstructure";

export const useGetSubjectGradingStructureQuery = ({ path, params }: { path: { gradeStructureId?: number }; params: { tenantId?: number; subjectId?: number } }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.SUBJECT_GRADING_STRUCTURE, params?.tenantId, params?.subjectId, path?.gradeStructureId],

    queryFn: async () => {
      return await getRequest<SubjectGradingStructureType>({
        endpoint: `${BASE_URL}/info/${path?.gradeStructureId}`,
        config: { params },
      });
    },
    enabled: !!params?.subjectId,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  return { data, isLoading, error, refetch };
};

export const useCreateSubjectGradingStructureMutation = ({ params }: { params: { tenantId?: number } }) => {
  const queryClient = useQueryClient();
  const {
    mutate: createGradingStructure,
    isPending: createGradingStructurePending,
    error: createGradingStructureError,
  } = useMutation({
    mutationFn: async ({ payload }: { payload: SubjectGradingStructureCreateFormSchemaType }) => {
      const data = await postRequest<SubjectGradingStructureType>({
        endpoint: `${BASE_URL}/create`,
        payload,
        config: { params },
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.SUBJECT, params?.tenantId] });
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.SUBJECT_GRADING_STRUCTURE, params?.tenantId] });
    },
  });

  return { createGradingStructure, createGradingStructurePending, createGradingStructureError };
};
