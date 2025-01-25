"use client";

import { RouteEnums } from "@/constants/router/route-constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Form, toast } from "@repo/ui";

import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import SchoolProfileOnboardingPersonalStep from "./school-profile-onboarding-personal-step";
import useStepper from "@/hooks/use-stepper";
import { SchoolProfileOnboardingResidentialStep } from "./school-profile-onboarding-residential-step";
import { SchoolProfileOnboardingSchoolStep } from "./school-profile-onboarding-school-step";
import { SchoolProfileFormFieldName, SchoolProfileFormSchemaType } from "../_types/school-profile-form-types";
import { SchoolProfileFormSchema } from "../_schema/school-profile-form-schema";
import StepperButton from "@/components/stepper-button";
import { useAuthUser } from "@/hooks/use-auth-user";
import { useGetTenantQuery } from "@/apis/core-tenant-api/tenant";
import { onboardingStatusEnums } from "@/constants/enums/tenant-enums";
import { useOnboardingPersonalStepMutation, useOnboardingResidentialStepMutation, useOnboardingSchoolStepMutation } from "@/apis/core-onboarding-api/onboarding";
import { useGetAuthUserQuery } from "@/apis/core-user-api/user";
import useDataRef from "@/hooks/use-data-ref";

type Props = {};

function SchoolProfileOnboardingForm({}: Props) {
  const router = useRouter();
  const stepper = useStepper();

  const { authUserIds } = useAuthUser();
  const { onboardingPersonalStep, onboardingPersonalStepPending } = useOnboardingPersonalStepMutation();
  const { onboardingResidentialStep, onboardingResidentialStepPending } = useOnboardingResidentialStepMutation();
  const { onboardingSchoolStep, onboardingSchoolStepPending } = useOnboardingSchoolStepMutation();

  const authUserQueryResult = useGetAuthUserQuery(React.useMemo(() => ({ userId: authUserIds?.id }), [authUserIds?.id]));
  const authUser = authUserQueryResult?.data?.data;

  const tenantId = authUser?.tenantId;
  const tenantQueryResult = useGetTenantQuery(React.useMemo(() => ({ tenantId: tenantId }), [tenantId]));
  const status = tenantQueryResult?.data?.data?.onboardingStatus;

  const statusKey = String(status);
  const completedSteps = statusKey in onboardingStatusEnums ? onboardingStatusEnums[statusKey as keyof typeof onboardingStatusEnums] : 0;

  const defaultValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    gender: "",
    email: "",
    dateOfBirth: "",

    residentialAddress: "",
    residentialLgaId: 0,
    residentialStateId: 0,
    residentialCountryId: 0,
    residentialZipCode: "",

    name: "",
    registrationNo: "",
    contactEmail: "",
    contactPhone: "",
    establishedDate: "",
    logoUrl: "",
    address: "",
    stateId: 0,
    lgaId: 0,
    zipCode: "",
    countryId: 0,
    postalCode: "",
  };

  const form = useForm<SchoolProfileFormSchemaType>({
    resolver: zodResolver(SchoolProfileFormSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const stepProps = {
    form,
  };

  // Form Steps
  const steps = [
    {
      id: 0,
      label: "Personal Information",
      content: <SchoolProfileOnboardingPersonalStep {...stepProps} />,
      fields: [""],
    },
    {
      id: 1,
      label: "Residential Information",
      content: <SchoolProfileOnboardingResidentialStep {...stepProps} />,
      fields: [""],
    },
    {
      id: 2,
      label: "School Information",
      content: <SchoolProfileOnboardingSchoolStep {...stepProps} />,
      fields: [""],
    },
  ];

  const dataRef = useDataRef({ form });

  // Initial Values
  React.useEffect(() => {
    if (authUser) {
      dataRef.current.form.reset((values: SchoolProfileFormSchemaType) => ({
        ...values,

        firstName: authUser?.firstName || values.firstName,
        lastName: authUser?.lastName || values.lastName,
        phoneNumber: authUser?.phoneNumber || values.phoneNumber,
        gender: authUser?.gender || values.gender,
        email: authUser?.email || values.email,
        dateOfBirth: authUser?.dateOfBirth || values.dateOfBirth,

        residentialAddress: authUser?.residentialAddress || values.residentialAddress,
        residentialLgaId: authUser?.residentialLgaId || values.residentialLgaId,
        residentialStateId: authUser?.residentialStateId || values.residentialStateId,
        residentialCountryId: authUser?.residentialCountryId || values.residentialCountryId,
        residentialZipCode: authUser?.residentialZipCode || values.residentialZipCode,

        name: authUser?.name || values.name,
        registrationNo: authUser?.registrationNo || values.registrationNo,
        contactEmail: authUser?.contactEmail || values.contactEmail,
        contactPhone: authUser?.contactPhone || values.contactPhone,
        establishedDate: authUser?.establishedDate || values.establishedDate,
        logoUrl: authUser?.logoUrl || values.logoUrl,
        address: authUser?.address || values.address,
        stateId: authUser?.stateId || values.stateId,
        lgaId: authUser?.lgaId || values.lgaId,
        zipCode: authUser?.zipCode || values.zipCode,
        countryId: authUser?.countryId || values.countryId,
        postalCode: authUser?.postalCode || values.postalCode,
      }));
    }
  }, [authUser, dataRef]);

  // Stepper Buttons
  React.useEffect(() => {
    stepper.go(completedSteps);
  }, [completedSteps]);

  const isFirstStep = stepper.step === 0;
  const isLastStep = stepper.step === steps.length - 1;

  const handleOnboarding = (values: SchoolProfileFormSchemaType) => {
    switch (stepper.step) {
      case 0:
        onboardingPersonalStep(
          {
            payload: { ...values, userId: authUser?.id },
            params: { tenantId: authUser?.tenantId },
          },
          {
            onSuccess: (result) => {
              toast.success(result.message);
              stepper.next(undefined);
            },
            onError: (error) => {
              toast.error(error.message);
            },
          }
        );
        break;
      case 1:
        onboardingResidentialStep(
          {
            payload: { ...values, userId: authUser?.id, residentialCountryId: Number(values.residentialCountryId), residentialStateId: Number(values.residentialStateId), residentialLgaId: Number(values.residentialLgaId), residentialZipCode: Number(values.residentialZipCode) },
            params: { tenantId: authUser?.tenantId },
          },
          {
            onSuccess: (result) => {
              toast.success(result.message);
              stepper.next(undefined);
            },
            onError: (error) => {
              toast.error(error.message);
            },
          }
        );
        break;
      case 2:
        onboardingSchoolStep(
          {
            payload: { ...values, zipCode: Number(values.zipCode) },
            params: { tenantId: authUser?.tenantId },
          },
          {
            onSuccess: (result) => {
              toast.success(result.message);
              // router.push("/school/profile");
            },
            onError: (error) => {
              toast.error(error.message);
            },
          }
        );
        break;
      default:
        return null;
    }
  };

  // Form Step Control Buttons
  const next = async () => {
    const fields = steps?.[stepper.step]?.fields;

    const output = await form.trigger(fields as SchoolProfileFormFieldName[], {
      shouldFocus: true,
    });
    if (!output) return;

    handleOnboarding(form.getValues());
  };

  const previous = () => {
    if (!isFirstStep) {
      stepper.previous(undefined);
    }
  };

  return (
    <div className="grid gap-8 w-full">
      <Card className="flex items-center md:justify-center p-4 gap-4 w-full md:max-w-min mx-auto overflow-x-scroll">
        {steps.map((step, i) => (
          <div key={i}>
            <StepperButton stepper={stepper} completedSteps={completedSteps} selected={stepper.step === i} step={i + 1} i={i}>
              {step.label}
            </StepperButton>
          </div>
        ))}
      </Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleOnboarding)} className="space-y-4">
          <div className="max-w-4xl mx-auto pb-24"> {steps?.[stepper.step]?.content}</div>

          <div className="grid md:grid-cols-2 md:max-w-lg gap-4 mx-auto">
            <Button variant={"outline"} type="button" onClick={previous} disabled={isFirstStep || onboardingPersonalStepPending || onboardingResidentialStepPending || onboardingSchoolStepPending}>
              Previous
            </Button>
            <Button type="button" onClick={next} loading={onboardingPersonalStepPending || onboardingResidentialStepPending || onboardingSchoolStepPending}>
              {isLastStep ? "Complete" : "Next"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default SchoolProfileOnboardingForm;
