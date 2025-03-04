"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import useStepper from "@/hooks/use-stepper";
import useDataRef from "@/hooks/use-data-ref";
import { useAuthUser } from "@/hooks/use-auth-user";
import { zodResolver } from "@hookform/resolvers/zod";
import StepperButton from "@/components/stepper-button";
import { LoadingContent } from "@/components/loading-content";
import { RouteEnums } from "@/constants/router/route-constants";
import StaffCreateFormSuccessStep from "./staff-create-form-success-step";
import { StaffCreateFormSchema } from "../_schema/staff-create-form-schema";
import { StaffCreateFormPersonalStep } from "./staff-create-form-personal-step";
import { Button, Card, CardDescription, CardTitle, Form, toast } from "@repo/ui";
import { StaffCreateFormEmploymentStep } from "./staff-create-form-employment-step";
import { StaffCreateFormResidentialStep } from "./staff-create-form-residential-step";
import { useGetSingleStaffQuery, useStaffUpdateMutation } from "@/apis/core-staff-api/staff";
import { useGetStaffTemplateQuery, useStaffCreateMutation } from "@/apis/core-staff-api/staff";
import { StaffCreateFormFieldName, StaffCreateFormSchemaType, StaffTemplateOptions } from "../_types/staff-create-form-types";

type Props = {
  staffId?: number;
};

export function StaffCreateForm({ staffId }: Props) {
  const router = useRouter();
  const stepper = useStepper();
  const { authUserIds } = useAuthUser();
  const [completedSteps, setCompletedSteps] = React.useState(0);

  const { staffCreate, staffCreatePending, staffCreateError } = useStaffCreateMutation();
  const staffQueryResult = staffId ? useGetSingleStaffQuery({ staffId }) : null;
  const staff = staffQueryResult?.data?.data;

  const isEdit = !!staffId;

  const { staffUpdate, staffUpdatePending, staffUpdateError } = useStaffUpdateMutation({ staffId });

  const handleCreateStaff = (values: StaffCreateFormSchemaType) => {
    const mutate = isEdit ? staffUpdate : staffCreate;
    mutate(
      {
        payload: {
          ...values,
          tenantId: authUserIds?.tenantId,
          residentialCountryId: Number(values.residentialCountryId),
          residentialStateId: Number(values.residentialStateId),
          residentialLgaId: Number(values.residentialLgaId),
          residentialZipCode: Number(values.residentialZipCode),
          cvUrl: "",
        },
      },
      {
        onSuccess: (result) => {
          toast.success(result.message);
          setCompletedSteps((prev) => prev + 1);
          stepper.next(undefined);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  const defaultValues = {
    id: "",
    roleId: 1,
    firstName: "",
    lastName: "",
    phoneNumber: "",
    gender: "",
    email: "",
    dateOfBirth: "",
    residentialAddress: "",
    residentialLgaId: "",
    residentialStateId: "",
    residentialCountryId: "",
    residentialZipCode: "",
    nin: "",
    tin: "",
    cvUrl: "",
    cvFile: undefined,
    jobTitle: "",
    employmentType: "",
    startDate: "",
    highestLevelEdu: "",
    subjectIds: [],
    classIds: [],
  };

  const form = useForm<StaffCreateFormSchemaType>({
    resolver: zodResolver(StaffCreateFormSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const dataRef = useDataRef({ form });

  // Initial Values
  React.useEffect(() => {
    if (staff) {
      dataRef.current.form.reset((values: StaffCreateFormSchemaType) => ({
        ...values,
        id: staff?.user?.id,
        firstName: staff?.user?.firstName || values.firstName,
        lastName: staff?.user?.lastName || values.lastName,
        phoneNumber: staff?.user?.phoneNumber || values.phoneNumber,
        gender: staff?.user?.gender || values.gender,
        email: staff?.user?.email || values.email,
        dateOfBirth: staff?.user?.dateOfBirth || values.dateOfBirth,
        nin: staff?.nin || values.nin,

        residentialAddress: staff?.user?.residentialAddress || values.residentialAddress,
        residentialLgaId: Number(staff?.user?.residentialLgaId) || values.residentialLgaId,
        residentialStateId: Number(staff?.user?.residentialStateId) || values.residentialStateId,
        residentialCountryId: Number(staff?.user?.residentialCountryId) || values.residentialCountryId,
        residentialZipCode: Number(staff?.user?.residentialZipCode) || values.residentialZipCode,

        tin: staff?.tin || values.tin,
        cvUrl: staff?.cvUrl || values.cvUrl,
        jobTitle: staff?.jobTitle || values.jobTitle,
        employmentType: staff?.employmentType || values.employmentType,
        startDate: staff?.startDate || values.startDate,
        highestLevelEdu: staff?.highestLevelEdu || values.highestLevelEdu,
        subjectIds: staff?.subjects?.map((subject) => subject.id) || values.subjectIds,
        classIds: staff?.classes?.map((classItem) => classItem?.id) || values.classIds,
      }));
    }
  }, [isEdit, staff, dataRef]);

  const residentialStateId = form.watch("residentialStateId");
  const staffTemplateQuery = useGetStaffTemplateQuery(
    React.useMemo(
      () => ({
        codeValue: Number(residentialStateId),
      }),
      [residentialStateId]
    )
  );

  const stepProps = {
    form,
    isEdit,
    staffTemplateQuery: staffTemplateQuery as StaffTemplateOptions,
  };

  const steps = [
    {
      id: 0,
      label: "Personal Information",
      description: "Provide basic personal details such as name, phone number, and date of birth.",
      content: <StaffCreateFormPersonalStep {...stepProps} />,
      fields: [""],
    },
    {
      id: 1,
      label: "Residential Information",
      description: "Enter your current residential address, including state, LGA, and country.",
      content: <StaffCreateFormResidentialStep {...stepProps} />,
      fields: [""],
    },
    {
      id: 2,
      label: "Employment Information",
      description: "Fill in employment-related details such as job title, start date, and employment type.",
      content: <StaffCreateFormEmploymentStep {...stepProps} />,
      fields: [""],
    },
    {
      id: 4,
      label: "Submission Successful !",
      description: isEdit ? "Your staff profile has been successfully edited." : "Your staff profile has been successfully created.",
      content: <StaffCreateFormSuccessStep />,
      fields: [""],
    },
  ];

  const isFirstStep = stepper.step === 0;
  const isLastStep = stepper.step === steps.length - 1;
  const isSecondToLastStep = stepper.step === steps.length - 2;

  // Form Step Control Buttons
  const next = async () => {
    const fields = steps?.[stepper.step]?.fields;

    const output = await form.trigger(fields as StaffCreateFormFieldName[], {
      shouldFocus: true,
    });
    if (!output) return;

    if (isSecondToLastStep) {
      handleCreateStaff(form.getValues());
    } else if (isLastStep) {
      router.push(RouteEnums.STAFF_LIST);
    } else {
      setCompletedSteps((prev) => prev + 1);
      stepper.next(undefined);
    }
  };

  const previous = () => {
    if (!isFirstStep) {
      setCompletedSteps((prev) => prev - 1);
      stepper.previous(undefined);
    }
  };

  return (
    <LoadingContent loading={staffQueryResult?.isLoading} error={staffQueryResult?.error} retry={staffQueryResult?.refetch} data={staffQueryResult?.data} shouldLoad={isEdit}>
      <Card className="flex items-center xl:justify-center p-4 gap-4 w-full md:max-w-min mx-auto overflow-x-scroll my-8">
        {steps.slice(0, steps.length - 1).map((step, i) => (
          <div key={i}>
            <StepperButton stepper={stepper} completedSteps={completedSteps} complete={steps.length - 1 == completedSteps} selected={stepper.step === i} step={i + 1} i={i}>
              {step.label}
            </StepperButton>
          </div>
        ))}
      </Card>

      {steps?.[stepper.step]?.label && (
        <Card className="border shadow-none grid gap-2 p-4 my-8 md:p-8">
          <CardTitle className="font-heading">{steps?.[stepper.step]?.label}</CardTitle>
          <CardDescription className="max-w-xl">{steps?.[stepper.step]?.description}</CardDescription>
        </Card>
      )}

      <div className="col-span-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreateStaff)} className="space-y-4">
            {steps?.[stepper.step]?.content}
          </form>
        </Form>
      </div>

      <div className="grid md:grid-cols-2 md:max-w-lg gap-4 mx-auto my-12">
        <Button variant={"outline"} type="button" onClick={previous} disabled={isFirstStep || isLastStep || staffCreatePending || staffUpdatePending}>
          Previous
        </Button>
        <Button type="button" onClick={next} loading={staffCreatePending || staffUpdatePending}>
          {isSecondToLastStep ? "Complete" : isLastStep ? "Go To Staff List" : "Next"}
        </Button>
      </div>
    </LoadingContent>
  );
}
