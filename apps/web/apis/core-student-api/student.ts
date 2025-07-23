import { StudentType, SubjectsRegisteredType } from "@/types";
import { getRequest, postRequest } from "@/config/base-query";
import { QueryTagEnums } from "@/constants/query-store/query-constants";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { StudentBulkCreateType, StudentCreateFormSchemaType, StudentTemplateOptions } from "@/app/@protected/(staff-portal)/student/create/_types/student-create-form-types";
import { StudentSubjectRegistrationCreateFormSchemaType } from "@/app/@protected/(staff-portal)/student/subject-registration/_types/student-subject-registration-form-types";

const BASE_URL = "student";

export const useGetStudentListQuery = ({ params, enabled = true }: { params: { tenantId?: number; classId?: number; classDivisionId?: number; excludePromotedInCalendarId?: number }; enabled?: boolean }) => {
  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: [QueryTagEnums.STUDENT, params?.tenantId, params?.excludePromotedInCalendarId, params?.classId, params?.classDivisionId],
    queryFn: async () => {
      return await getRequest<StudentType[]>({
        endpoint: `${BASE_URL}/list`,
        config: { params },
      });
    },
    enabled,
  });

  return { data, isLoading, error, refetch, isFetching };
};

export const useStudentCreateMutation = ({ params }: { params: { tenantId?: number } }) => {
  const queryClient = useQueryClient();
  const {
    mutate: studentCreate,
    isPending: studentCreatePending,
    error: studentCreateError,
  } = useMutation({
    mutationFn: async ({ payload }: { payload: StudentCreateFormSchemaType }) => {
      const data = await postRequest<StudentType>({
        endpoint: `${BASE_URL}/create`,
        payload,
        config: { params },
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.STUDENT, params.tenantId] });
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.USER, params.tenantId] });
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.GUARDIAN, params.tenantId] });
    },
  });

  return { studentCreate, studentCreatePending, studentCreateError };
};

export const useStudentBulkCreateMutation = ({ params }: { params?: { tenantId?: number } }) => {
  const queryClient = useQueryClient();
  const {
    mutate: studentBulkCreate,
    isPending: studentBulkCreatePending,
    error: studentBulkCreateError,
  } = useMutation({
    mutationFn: async ({ payload }: { payload: StudentBulkCreateType }) => {
      const data = await postRequest<null>({
        endpoint: `${BASE_URL}/bulk/create`,
        payload,
        config: { params },
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.STUDENT, params?.tenantId] });
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.USER, params?.tenantId] });
    },
  });

  return { studentBulkCreate, studentBulkCreatePending, studentBulkCreateError };
};

export const useGetStudentTemplateQuery = ({ params }: { params: { tenantId?: number; codeValue?: number; classId?: number; classDivisionId?: number; calendarId?: number; studentId?: number } }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.USER, params?.tenantId, params?.codeValue, params?.classId, params?.classDivisionId, params?.calendarId, params?.studentId],
    queryFn: async () => {
      return await getRequest<StudentTemplateOptions>({
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

export const useGetSingleStudentQuery = ({ path, params }: { path: { studentId?: number }; params: { tenantId?: number } }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.STUDENT, params?.tenantId, path?.studentId],
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

export const useStudentUpdateMutation = ({ path, params }: { path: { studentId?: number }; params: { tenantId?: number } }) => {
  const queryClient = useQueryClient();
  const {
    mutate: studentUpdate,
    isPending: studentUpdatePending,
    error: studentUpdateError,
  } = useMutation({
    mutationFn: async ({ payload }: { payload: StudentCreateFormSchemaType }) => {
      const data = await postRequest<StudentType>({
        endpoint: `${BASE_URL}/update/${path?.studentId}`,
        payload,
        config: { params },
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.STUDENT, params.tenantId] });
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.USER, params.tenantId] });
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.GUARDIAN, params.tenantId] });
    },
  });

  return { studentUpdate, studentUpdatePending, studentUpdateError };
};

export const useStudentSubjectRegistrationCreateMutation = ({ params }: { params: { tenantId?: number } }) => {
  const queryClient = useQueryClient();
  const {
    mutate: studentSubjectRegistrationCreate,
    isPending: studentSubjectRegistrationCreatePending,
    error: studentSubjectRegistrationCreateError,
  } = useMutation({
    mutationFn: async ({ payload }: { payload: StudentSubjectRegistrationCreateFormSchemaType }) => {
      const data = await postRequest<StudentType>({
        endpoint: `${BASE_URL}/subjectregistration/create`,
        payload,
        config: { params },
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.STUDENT, params.tenantId] });
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.USER, params.tenantId] });
    },
  });

  return { studentSubjectRegistrationCreate, studentSubjectRegistrationCreatePending, studentSubjectRegistrationCreateError };
};

export const useGetStudentSubjectRegistrationListQuery = ({ params }: { params: { tenantId?: number; classId?: number; subjectId?: number; calendarId?: number } }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.STUDENT, params?.tenantId, params?.subjectId, params?.classId, params?.calendarId],
    queryFn: async () => {
      return await getRequest<SubjectsRegisteredType[]>({
        endpoint: `${BASE_URL}/subjectregistration/list`,
        config: { params },
      });
    },
  });

  return { data, isLoading, error, refetch };
};
