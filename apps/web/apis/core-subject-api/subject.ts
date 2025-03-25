import { SubjectCreateFormSchemaType, SubjectTemplateOptions } from "@/app/@protected/(staff-portal)/school/subject/list/_types/school-subject-create-types";
import { getRequest, postRequest } from "@/config/base-query";
import { QueryTagEnums } from "@/constants/query-store/query-constants";
import { SubjectType } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const BASE_URL = "subject";

export const useGetSubjectListQuery = (params?: Record<string, any>) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.SUBJECT],
    queryFn: async () => {
      return await getRequest<Record<string, any>>({
        endpoint: `${BASE_URL}/list`,
        config: { params },
      });
    },
  });

  return { data, isLoading, error, refetch };
};

export const useSubjectCreateMutation = () => {
  const queryClient = useQueryClient();
  const {
    mutate: subjectCreate,
    isPending: subjectCreatePending,
    error: subjectCreateError,
  } = useMutation({
    mutationFn: async ({ payload, params }: { payload: SubjectCreateFormSchemaType; params?: { tenantId?: number } }) => {
      const data = await postRequest<SubjectType>({
        endpoint: `${BASE_URL}/create`,
        payload,
        config: { params },
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.SUBJECT] });
    },
  });

  return { subjectCreate, subjectCreatePending, subjectCreateError };
};

export const useSubjectUpdateMutation = (path?: { subjectId?: number }) => {
  const queryClient = useQueryClient();
  const {
    mutate: subjectUpdate,
    isPending: subjectUpdatePending,
    error: subjectUpdateError,
  } = useMutation({
    mutationFn: async ({ payload, params }: { payload: SubjectCreateFormSchemaType; params?: { tenantId?: number } }) => {
      const data = await postRequest<SubjectType>({
        endpoint: `${BASE_URL}/update/${path?.subjectId}`,
        payload,
        config: { params },
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.SUBJECT] });
    },
  });

  return { subjectUpdate, subjectUpdatePending, subjectUpdateError };
};

export const useGetSubjectTemplateQuery = (params: { tenantId?: number }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.SUBJECT, QueryTagEnums.USER, QueryTagEnums.CLASS, QueryTagEnums.STAFF],
    queryFn: async () => {
      return await getRequest<SubjectTemplateOptions>({
        endpoint: `${BASE_URL}/template`,
        config: { params },
      });
    },
  });

  return { data, isLoading, error, refetch };
};
