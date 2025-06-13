import { SubjectGradingType } from "@/types";
import { getRequest, postRequest } from "@/config/base-query";
import { QueryTagEnums } from "@/constants/query-store/query-constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SubjectGradingTemplateOptions } from "@/app/@protected/(staff-portal)/student/grading/_types/subject-grading-types";
import { SubjectGradingCreateFormSchemaType } from "@/app/@protected/(staff-portal)/subject/[id]/_types/subject-grading-form-types";

const BASE_URL = "subject/grading";

export const useGetSubjectGradingTemplateQuery = ({ params }: { params: { calendarId?: number; classId?: number; tenantId?: number; subjectId?: number } }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.SUBJECT_GRADING_TEMPLATE, params?.tenantId, params?.calendarId, params?.classId, params?.subjectId],
    queryFn: async () => {
      return await getRequest<SubjectGradingTemplateOptions>({
        endpoint: `${BASE_URL}/template`,
        config: { params },
      });
    },

    staleTime: 0,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  return { data, isLoading, error, refetch };
};

export const useGetSubjectGradingListQuery = ({ path, params }: { path: {}; params: { tenantId?: number; subjectId?: number; calendarId?: number; termId?: number; classId?: number; classDivisionId?: number } }) => {
  const { data, isLoading, error, refetch, isFetched, isError } = useQuery({
    queryKey: [QueryTagEnums.SUBJECT_GRADING, params?.tenantId, params?.subjectId, params?.calendarId, params?.termId, params?.classId, params?.classDivisionId],
    queryFn: async () => {
      return await getRequest<SubjectGradingType[]>({
        endpoint: `${BASE_URL}/list`,
        config: { params },
      });
    },
    enabled: !!params?.classDivisionId || (!!params?.classId && !!params?.termId),
  });

  return { data, isLoading, error, refetch, isFetched, isError };
};

export const useSubjectGradingCreateMutation = ({ params }: { params?: { tenantId?: number } }) => {
  const queryClient = useQueryClient();
  const {
    mutate: subjectGradingCreate,
    isPending: subjectGradingCreatePending,
    error: subjectGradingCreateError,
  } = useMutation({
    mutationFn: async ({ payload }: { payload: SubjectGradingCreateFormSchemaType }) => {
      const data = await postRequest<SubjectGradingType>({
        endpoint: `${BASE_URL}/create`,
        payload,
        config: { params },
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.SUBJECT_GRADING, params?.tenantId] });
    },
  });

  return { subjectGradingCreate, subjectGradingCreatePending, subjectGradingCreateError };
};
