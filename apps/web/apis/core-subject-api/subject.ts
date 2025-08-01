import { SubjectType } from "@/types";
import { getRequest, postRequest } from "@/config/base-query";
import { QueryTagEnums } from "@/constants/query-store/query-constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SubjectCreateFormSchemaType, SubjectTemplateOptions } from "@/app/@protected/(staff-portal)/school/subject/list/_types/school-subject-create-types";

const BASE_URL = "subject";

export const useGetSingleSubjectQuery = ({ params }: { params?: { tenantId?: number; subjectId?: number } }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.SUBJECT, params?.tenantId, params?.subjectId],
    queryFn: async () => {
      return await getRequest<SubjectType>({
        endpoint: `${BASE_URL}/info/${params?.subjectId}`,
        config: { params },
      });
    },
  });

  return { data, isLoading, error, refetch };
};

export const useGetSubjectListQuery = ({ params }: { params?: { tenantId?: number; staffIds?: string } }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.SUBJECT, params?.tenantId, params?.staffIds],
    queryFn: async () => {
      return await getRequest<SubjectType[]>({
        endpoint: `${BASE_URL}/list`,
        config: { params },
      });
    },
  });

  return { data, isLoading, error, refetch };
};

export const useSubjectCreateMutation = ({ params }: { params?: { tenantId?: number } }) => {
  const queryClient = useQueryClient();
  const {
    mutate: subjectCreate,
    isPending: subjectCreatePending,
    error: subjectCreateError,
  } = useMutation({
    mutationFn: async ({ payload }: { payload: SubjectCreateFormSchemaType }) => {
      const data = await postRequest<SubjectType>({
        endpoint: `${BASE_URL}/create`,
        payload,
        config: { params },
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.SUBJECT, params?.tenantId] });
    },
  });

  return { subjectCreate, subjectCreatePending, subjectCreateError };
};

export const useSubjectUpdateMutation = ({ path, params }: { path?: { subjectId?: number }; params?: { tenantId?: number } }) => {
  const queryClient = useQueryClient();
  const {
    mutate: subjectUpdate,
    isPending: subjectUpdatePending,
    error: subjectUpdateError,
  } = useMutation({
    mutationFn: async ({ payload }: { payload: SubjectCreateFormSchemaType }) => {
      const data = await postRequest<SubjectType>({
        endpoint: `${BASE_URL}/update/${path?.subjectId}`,
        payload,
        config: { params },
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.SUBJECT, params?.tenantId] });
    },
  });

  return { subjectUpdate, subjectUpdatePending, subjectUpdateError };
};

export const useGetSubjectTemplateQuery = ({ params }: { params: { tenantId?: number } }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [],
    queryFn: async () => {
      return await getRequest<SubjectTemplateOptions>({
        endpoint: `${BASE_URL}/template`,
        config: { params },
      });
    },
  });

  return { data, isLoading, error, refetch };
};
