import { CalendarType } from "@/types";
import { getRequest, postRequest } from "@/config/base-query";
import { QueryTagEnums } from "@/constants/query-store/query-constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SchoolCalendarTemplateOptions } from "@/app/@protected/(staff-portal)/school/calendar/create/_types/school-calendar-form-types";

const BASE_URL = "calendar";

export const useGetCalendarQuery = ({ params }: { params?: { tenantId?: number } }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.CALENDAR, params?.tenantId],
    queryFn: async () => {
      return await getRequest<CalendarType[]>({
        endpoint: `${BASE_URL}/list`,
        config: { params },
      });
    },
  });

  return { data, isLoading, error, refetch };
};

export const useGetSingleCalendarQuery = ({ params }: { params?: { tenantId?: number; year?: number } }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.CALENDAR, params?.tenantId, params?.year],
    queryFn: async () => {
      return await getRequest<CalendarType>({
        endpoint: `${BASE_URL}/info`,
        config: { params },
      });
    },
    // enabled: !!params?.year,
  });

  return { data, isLoading, error, refetch };
};

export const useCalendarMutation = ({ params }: { params?: { tenantId?: number } }) => {
  const queryClient = useQueryClient();
  const {
    mutate: calendarMutate,
    isPending: calendarMutatePending,
    error: calendarMutateError,
  } = useMutation({
    mutationFn: async ({ payload }: { payload: Record<string, any> }) => {
      return await postRequest<CalendarType>({
        endpoint: `${BASE_URL}/create`,
        payload,
        config: { params },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.CALENDAR, params?.tenantId] });
    },
  });

  return { calendarMutate, calendarMutatePending, calendarMutateError };
};

export const useGetCalendarTemplateQuery = ({ params }: { params: { tenantId?: number } }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.CALENDAR_TEMPLATE, params?.tenantId],
    queryFn: async () => {
      return await getRequest<SchoolCalendarTemplateOptions>({
        endpoint: `${BASE_URL}/template`,
        config: { params },
      });
    },
  });

  return { data, isLoading, error, refetch };
};
