import { StudentCreateFormSchemaType, StudentTemplateOptions } from "@/app/@protected/(staff-portal)/student/create/_types/student-create-form-types";
import { getRequest, postRequest } from "@/config/base-query";
import { QueryTagEnums } from "@/constants/query-store/query-constants";
import { StudentType } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const BASE_URL = "student";

export const useGetStudentListQuery = (params?: { tenantId?: number; jobTitle?: string }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.STUDENT],
    queryFn: async () => {
      return await getRequest<Record<string, any>>({
        endpoint: `${BASE_URL}/list`,
        config: { params },
      });
    },
  });

  return { data, isLoading, error, refetch };
};

export const useStudentCreateMutation = () => {
  const queryClient = useQueryClient();
  const {
    mutate: studentCreate,
    isPending: studentCreatePending,
    error: studentCreateError,
  } = useMutation({
    mutationFn: async ({ payload, params }: { payload: StudentCreateFormSchemaType; params?: { tenantId?: number } }) => {
      const data = await postRequest<StudentType>({
        endpoint: `${BASE_URL}/create`,
        payload,
        config: { params },
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.STUDENT] });
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.USER] });
    },
  });

  return { studentCreate, studentCreatePending, studentCreateError };
};

export const useGetStudentTemplateQuery = (params: { codeValue?: number }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.USER, params],
    queryFn: async () => {
      return await getRequest<StudentTemplateOptions>({
        endpoint: `${BASE_URL}/template`,
        config: { params },
      });
    },
  });

  return { data, isLoading, error, refetch };
};

export const useGetSingleStudentQuery = (path?: { studentId?: number }, params?: Record<string, any>) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.STUDENT, path?.studentId],
    queryFn: async () => {
      return await getRequest<StudentType>({
        endpoint: `${BASE_URL}/info/${path?.studentId}`,
        config: { params },
      });
    },
    enabled: !!path?.studentId,
  });

  return { data, isLoading, error, refetch };
};

export const useStudentUpdateMutation = (path?: { studentId?: number }) => {
  const queryClient = useQueryClient();
  const {
    mutate: studentUpdate,
    isPending: studentUpdatePending,
    error: studentUpdateError,
  } = useMutation({
    mutationFn: async ({ payload, params }: { payload: StudentCreateFormSchemaType; params?: { tenantId?: number } }) => {
      const data = await postRequest<StudentType>({
        endpoint: `${BASE_URL}/update/${path?.studentId}`,
        payload,
        config: { params },
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.STUDENT] });
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.USER] });
    },
  });

  return { studentUpdate, studentUpdatePending, studentUpdateError };
};
