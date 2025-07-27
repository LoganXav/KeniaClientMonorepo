import { StudentTermResultType } from "@/types";
import { getRequest, postRequest } from "@/config/base-query";
import { QueryTagEnums } from "@/constants/query-store/query-constants";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const BASE_URL = "student/termresult";

export const useGetStudentTermResultListQuery = ({ params, enabled = true }: { params: { tenantId?: number; classId?: number; classDivisionId?: number; termId?: number }; enabled?: boolean }) => {
  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: [QueryTagEnums.STUDENT_TERM_RESULT, params?.tenantId, params?.termId, params?.classId, params?.classDivisionId],
    queryFn: async () => {
      return await getRequest<StudentTermResultType[]>({
        endpoint: `${BASE_URL}/list`,
        config: { params },
      });
    },
    enabled: !!params.classId,
  });

  return { data, isLoading, error, refetch, isFetching };
};

export const useStudentTermResultCreateMutation = ({ path, params }: { path: { studentId: number }; params: { tenantId?: number } }) => {
  const queryClient = useQueryClient();
  const {
    mutate: studentTermResultCreate,
    isPending: studentTermResultCreatePending,
    error: studentTermResultCreateError,
  } = useMutation({
    mutationFn: async ({ payload }: { payload: any }) => {
      const data = await postRequest<StudentTermResultType>({
        endpoint: `${BASE_URL}/${path.studentId}`,
        payload,
        config: { params },
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.STUDENT_TERM_RESULT, params.tenantId] });
    },
  });

  return { studentTermResultCreate, studentTermResultCreatePending, studentTermResultCreateError };
};
