import { StudentGradingType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getRequest } from "@/config/base-query";
import { QueryTagEnums } from "@/constants/query-store/query-constants";

const BASE_URL = "student/grading";

export const useGetStudentGradingListQuery = ({ path, params }: { path: {}; params: { tenantId?: number; calendarId?: number; termId?: number; classId?: number; classDivisionId?: number } }) => {
  const { data, isLoading, error, refetch, isFetched, isError } = useQuery({
    queryKey: [QueryTagEnums.STUDENT_GRADING, params?.tenantId, params?.calendarId, params?.termId, params?.classId, params?.classDivisionId],
    queryFn: async () => {
      return await getRequest<StudentGradingType[]>({
        endpoint: `${BASE_URL}/list`,
        config: { params },
      });
    },
    enabled: !!params?.classDivisionId || !!params?.classId,
  });

  return { data, isLoading, error, refetch, isFetched, isError };
};
