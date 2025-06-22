import { ClassPromotionType } from "@/types";
import { getRequest, postRequest } from "@/config/base-query";
import { QueryTagEnums } from "@/constants/query-store/query-constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ClassPromotionTemplateOptions } from "@/app/@protected/(staff-portal)/class/promotion/_types/class-promotion-types";

const BASE_URL = "class/promotion";

export const useGetClassPromotionListQuery = ({ params }: { params: { tenantId?: number; calendarId?: number; classId?: number; classDivisionId?: number } }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.CLASS_PROMOTION, params?.tenantId, params?.calendarId, params?.classId, params?.classDivisionId],
    queryFn: async () => {
      return await getRequest<ClassPromotionType[]>({
        endpoint: `${BASE_URL}/list`,
        config: { params },
      });
    },
    enabled: !!params.calendarId,
  });

  return { data, isLoading, error, refetch };
};

export const useGetClassPromotionTemplateQuery = ({ params }: { params: { tenantId?: number; classId?: number; classDivisionId?: number } }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.CLASS_PROMOTION_TEMPLATE, params?.tenantId, params?.classId, params?.classDivisionId],
    queryFn: async () => {
      return await getRequest<ClassPromotionTemplateOptions>({
        endpoint: `${BASE_URL}/template`,
        config: { params },
      });
    },
  });

  return { data, isLoading, error, refetch };
};

export const useCreateClassPromotionMutation = ({ params }: { params: { tenantId?: number } }) => {
  const queryClient = useQueryClient();
  const {
    mutate: createClassPromotion,
    isPending: createClassPromotionPending,
    error: createClassPromotionError,
  } = useMutation({
    mutationFn: async ({ payload }: { payload: any }) => {
      const data = await postRequest<ClassPromotionType>({
        endpoint: `${BASE_URL}/create`,
        payload,
        config: { params },
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.CLASS_PROMOTION, params?.tenantId] });
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.STUDENT, params?.tenantId] });
    },
  });

  return { createClassPromotion, createClassPromotionPending, createClassPromotionError };
};
