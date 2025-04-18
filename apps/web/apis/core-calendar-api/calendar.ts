import { getRequest, postRequest } from "@/config/base-query";
import { QueryTagEnums } from "@/constants/query-store/query-constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CalendarType } from "@/types";

const BASE_URL = "calendar";

export const useGetCalendarQuery = (params?: Record<string, any>) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.CALENDAR],
    queryFn: async () => {
      return await getRequest<CalendarType[]>({
        endpoint: `${BASE_URL}/list`,
        config: { params },
      });
    },
  });

  return { data, isLoading, error, refetch };
};

export const useCalendarMutation = () => {
  const queryClient = useQueryClient();
  const {
    mutate: calendarMutate,
    isPending: calendarMutatePending,
    error: calendarMutateError,
  } = useMutation({
    mutationFn: async ({ payload, params }: { payload: Record<string, any>; params?: Record<string, any> }) => {
      return await postRequest<CalendarType>({
        endpoint: `${BASE_URL}/create`,
        payload,
        config: { params },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.CALENDAR] });
    },
  });

  return { calendarMutate, calendarMutatePending, calendarMutateError };
};
