import { getRequest, postRequest } from "@/config/base-query";
import { QueryTagEnums } from "@/constants/query-store/query-constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TimetablePeriodType, TimetableType } from "@/types";
import { SchoolTimetableTemplateOptions } from "@/app/@protected/(staff-portal)/school/timetable/create/_types/school-timetable-form-types";

const BASE_URL = "timetable";

export const useGetTimetableQuery = (params?: { classDivisionId?: number; termId?: number }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.TIMETABLE],
    queryFn: async () => {
      return await getRequest<TimetablePeriodType[]>({
        endpoint: `${BASE_URL}/list`,
        config: { params },
      });
    },
    enabled: !!params?.classDivisionId && !!params?.termId,
  });

  return { data, isLoading, error, refetch };
};

export const useTimetableMutation = () => {
  const queryClient = useQueryClient();
  const {
    mutate: timetableMutate,
    isPending: timetableMutatePending,
    error: timetableMutateError,
  } = useMutation({
    mutationFn: async ({ payload, params }: { payload: Record<string, any>; params?: Record<string, any> }) => {
      return await postRequest<TimetableType>({
        endpoint: `${BASE_URL}/create`,
        payload,
        config: { params },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.TIMETABLE] });
    },
  });

  return { timetableMutate, timetableMutatePending, timetableMutateError };
};

export const useGetTimetableTemplateQuery = (params: { classId?: number }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.USER, params],
    queryFn: async () => {
      return await getRequest<SchoolTimetableTemplateOptions>({
        endpoint: `${BASE_URL}/template`,
        config: { params },
      });
    },
  });

  return { data, isLoading, error, refetch };
};

export const useGetSingleTimetableQuery = (params: { tenantId?: number; id?: number; classDivisionId?: number; day?: string; termId?: number }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.USER, params],
    queryFn: async () => {
      return await getRequest<TimetableType>({
        endpoint: `${BASE_URL}/info`,
        config: { params },
      });
    },
    enabled: !!params?.id || (!!params?.classDivisionId && !!params?.day && !!params?.termId),
  });

  return { data, isLoading, error, refetch };
};
