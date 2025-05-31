import { SubjectGradingType } from "@/types";
import { getRequest } from "@/config/base-query";
import { useQuery } from "@tanstack/react-query";
import { QueryTagEnums } from "@/constants/query-store/query-constants";
import { SubjectGradingTemplateOptions } from "@/app/@protected/(staff-portal)/student/grading/_types/subject-grading-types";

const BASE_URL = "subject/grading";

export const useGetSubjectGradingTemplateQuery = ({ params }: { params: { calendarId?: number; classId?: number; tenantId?: number } }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.SUBJECT_GRADING_TEMPLATE, params?.tenantId, params?.calendarId, params?.classId],
    queryFn: async () => {
      return await getRequest<SubjectGradingTemplateOptions>({
        endpoint: `${BASE_URL}/template`,
        config: { params },
      });
    },
  });

  return { data, isLoading, error, refetch };
};

export const useGetSubjectGradingListQuery = ({ path, params }: { path: {}; params: { tenantId?: number; calendarId?: number; termId?: number; classId?: number; classDivisionId?: number } }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.SUBJECT_GRADING, params?.tenantId],
    queryFn: async () => {
      return await getRequest<SubjectGradingType[]>({
        endpoint: `${BASE_URL}/list`,
        config: { params },
      });
    },
    enabled: !!params?.classDivisionId || !!params?.classId,
  });

  return { data, isLoading, error, refetch };
};
