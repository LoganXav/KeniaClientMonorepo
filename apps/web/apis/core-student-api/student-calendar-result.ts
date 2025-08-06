import { StudentCalendarResultType } from "@/types";
import { getRequest, postRequest } from "@/config/base-query";
import { QueryTagEnums } from "@/constants/query-store/query-constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { StudentCalendarResultUpdatePayload } from "@/app/@protected/(staff-portal)/class/calendar-result/_types/class-calendar-result-collation-form-types";

const BASE_URL = "student/calendarresult";

export const useGetStudentCalendarResultListQuery = ({
  params,
  enabled = true,
}: {
  params: {
    tenantId?: number;
    classId?: number;
    classDivisionId?: number;
    calendarId?: number;
  };
  enabled?: boolean;
}) => {
  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: [
      QueryTagEnums.STUDENT_CALENDAR_RESULT,
      params?.tenantId,
      params?.calendarId,
      params?.classId,
      params?.classDivisionId,
    ],
    queryFn: async () => {
      return await getRequest<StudentCalendarResultType[]>({
        endpoint: `${BASE_URL}/list`,
        config: { params },
      });
    },
    enabled: !!params.classId,
  });

  return { data, isLoading, error, refetch, isFetching };
};

export const useStudentCalendarResultUpdateMutation = ({
  params,
}: {
  params: { tenantId?: number };
}) => {
  const queryClient = useQueryClient();
  const {
    mutate: studentCalendarResultUpdate,
    isPending: studentCalendarResultUpdatePending,
    error: studentCalendarResultUpdateError,
  } = useMutation({
    mutationFn: async ({
      payload,
      path,
    }: {
      payload: StudentCalendarResultUpdatePayload;
      path: { studentId: number };
    }) => {
      const data = await postRequest<StudentCalendarResultType>({
        endpoint: `${BASE_URL}/${path.studentId}`,
        payload,
        config: { params },
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryTagEnums.STUDENT_CALENDAR_RESULT, params.tenantId],
      });
    },
  });

  return {
    studentCalendarResultUpdate,
    studentCalendarResultUpdatePending,
    studentCalendarResultUpdateError,
  };
};
