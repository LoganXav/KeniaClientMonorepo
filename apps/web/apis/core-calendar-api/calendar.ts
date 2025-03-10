import { getRequest, postRequest } from "@/config/base-query";
import { QueryTagEnums } from "@/constants/query-store/query-constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const BASE_URL = "calendar";

export const useGetCalendarQuery = (params?: Record<string, any>) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.CALENDAR],
    queryFn: async () => {
      return await getRequest<Record<string, any>>({
        endpoint: `${BASE_URL}/info`,
        config: { params },
      });
    },
  });

  return { data, isLoading, error, refetch };
};

export const useCalendarEditMutation = () => {
  const queryClient = useQueryClient();
  const {
    mutate: calendarEdit,
    isPending: calendarEditPending,
    error: calendarEditError,
  } = useMutation({
    mutationFn: async (payload: Record<string, any>) => {
      return await postRequest<Record<string, any>>({
        endpoint: `${BASE_URL}`,
        payload,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.CALENDAR] });
    },
  });

  return { calendarEdit, calendarEditPending, calendarEditError };
};
