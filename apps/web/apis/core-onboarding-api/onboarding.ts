import { getRequest, postRequest } from "@/config/base-query";
import { AuthUserType } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SchoolProfileFormPersonalSchemaType, SchoolProfileFormResidentialSchemaType, SchoolProfileFormSchoolSchemaType, SchoolProfileFormTemplateType } from "@/app/@protected/(staff-portal)/school/profile/_types/school-profile-form-types";
import { QueryTagEnums } from "@/constants/query-store/query-constants";

const BASE_URL = "onboarding";

export const useOnboardingPersonalStepMutation = ({ params }: { params: { tenantId?: number } }) => {
  const queryClient = useQueryClient();
  const {
    mutate: onboardingPersonalStep,
    isPending: onboardingPersonalStepPending,
    error: onboardingPersonalStepError,
  } = useMutation({
    mutationFn: async ({ payload }: { payload: SchoolProfileFormPersonalSchemaType }) => {
      const data = await postRequest<AuthUserType>({
        endpoint: `${BASE_URL}/personal`,
        payload,
        config: { params },
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.USER, params?.tenantId] });
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.STAFF, params?.tenantId] });
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.TENANT, params?.tenantId] });
    },
  });

  return { onboardingPersonalStep, onboardingPersonalStepPending, onboardingPersonalStepError };
};

export const useOnboardingResidentialStepMutation = ({ params }: { params: { tenantId?: number } }) => {
  const queryClient = useQueryClient();
  const {
    mutate: onboardingResidentialStep,
    isPending: onboardingResidentialStepPending,
    error: onboardingResidentialStepError,
  } = useMutation({
    mutationFn: async ({ payload }: { payload: SchoolProfileFormResidentialSchemaType }) => {
      const data = await postRequest<AuthUserType>({
        endpoint: `${BASE_URL}/residential`,
        payload,
        config: { params },
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.USER, params?.tenantId] });
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.STAFF, params?.tenantId] });
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.TENANT, params?.tenantId] });
    },
  });

  return { onboardingResidentialStep, onboardingResidentialStepPending, onboardingResidentialStepError };
};

export const useOnboardingSchoolStepMutation = ({ params }: { params: { tenantId?: number } }) => {
  const queryClient = useQueryClient();
  const {
    mutate: onboardingSchoolStep,
    isPending: onboardingSchoolStepPending,
    error: onboardingSchoolStepError,
  } = useMutation({
    mutationFn: async ({ payload }: { payload: SchoolProfileFormSchoolSchemaType }) => {
      const data = await postRequest<AuthUserType>({
        endpoint: `${BASE_URL}/school`,
        payload,
        config: { params },
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.USER, params?.tenantId] });
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.STAFF, params?.tenantId] });
      queryClient.invalidateQueries({ queryKey: [QueryTagEnums.TENANT, params?.tenantId] });
    },
  });

  return { onboardingSchoolStep, onboardingSchoolStepPending, onboardingSchoolStepError };
};

export const useGetOnboardingTemplateQuery = ({ params }: { params: { tenantId?: number; codeValue?: number } }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [QueryTagEnums.USER, params?.tenantId, params?.codeValue],
    queryFn: async () => {
      return await getRequest<SchoolProfileFormTemplateType>({
        endpoint: `${BASE_URL}/template`,
        config: { params },
      });
    },
  });

  return { data, isLoading, error, refetch };
};
