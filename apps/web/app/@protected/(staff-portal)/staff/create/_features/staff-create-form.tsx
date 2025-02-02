"use client";

import React from "react";
import Link from "next/link";
import { RouteEnums } from "@/constants/router/route-constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardDescription, CardTitle, Form, toast } from "@repo/ui";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useGetStaffTemplateQuery, useStaffCreeateMutation } from "@/apis/core-staff-api/staff";
import { StaffCreateFormFieldName, StaffCreateFormSchemaType, StaffTemplateOptions } from "../_types/staff-create-form-types";
import { useAuthUser } from "@/hooks/use-auth-user";
import { StaffCreateFormSchema } from "../_schema/staff-create-form-schema";
import useStepper from "@/hooks/use-stepper";
import { StaffCreateFormPersonalStep } from "./staff-create-form-personal-step";
import StepperButton from "@/components/stepper-button";
import StaffCreateFormSuccessStep from "./staff-create-form-success-step";
import { StaffCreateFormResidentialStep } from "./staff-create-form-residential-step";
import { StaffCreateFormEmploymentStep } from "./staff-create-form-employment-step";

type Props = {};

export function StaffCreateForm({}: Props) {
  const router = useRouter();
  const stepper = useStepper();
  const { authUserIds } = useAuthUser();
  const [completedSteps, setCompletedSteps] = React.useState(0);

  const { staffCreate, staffCreatePending, staffCreateError } = useStaffCreeateMutation();

  const handleCreateStaff = (values: StaffCreateFormSchemaType) => {
    staffCreate(
      { payload: { ...values, tenantId: authUserIds?.tenantId } },
      {
        onSuccess: (result) => {
          toast.success(result.message);
          router.push("/");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  const defaultValues = {
    tenantId: 0,
    roleId: 0,

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
    jobTitle: "",
    employmentType: "",
    startDate: "",
    highestLevelEdu: "",
  };

  const form = useForm<StaffCreateFormSchemaType>({
    resolver: zodResolver(StaffCreateFormSchema),
    defaultValues,
    mode: "onSubmit",
  });

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
      description: "Your staff profile has been successfully created.",
      content: <StaffCreateFormSuccessStep />,
      fields: [""],
    },
  ];

  const isFirstStep = stepper.step === 0;
  const isLastStep = stepper.step === steps.length - 1;
  const isSecondToLastStep = stepper.step === steps.length - 1;

  // Form Step Control Buttons
  const next = async () => {
    const fields = steps?.[stepper.step]?.fields;

    const output = await form.trigger(fields as StaffCreateFormFieldName[], {
      shouldFocus: true,
    });
    if (!output) return;

    setCompletedSteps((prev) => prev + 1);

    stepper.next(undefined);
    // handleCreateStaff(form.getValues());
  };

  const previous = () => {
    if (!isFirstStep) {
      setCompletedSteps((prev) => prev - 1);
      stepper.previous(undefined);
    }
  };

  return (
    <>
      <Card className="flex items-center md:justify-center p-4 gap-4 w-full md:max-w-min mx-auto overflow-x-scroll my-8">
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

      <div className="grid md:grid-cols-2 md:max-w-lg gap-4 mx-auto mt-12">
        <Button variant={"outline"} type="button" onClick={previous} disabled={isFirstStep || isLastStep || staffCreatePending}>
          Previous
        </Button>
        <Button type="button" onClick={next} loading={staffCreatePending}>
          {isSecondToLastStep ? "Complete" : isLastStep ? "Go To Dashboard" : "Next"}
        </Button>
      </div>
    </>
  );
}

{
  /* <div className="flex items-center justify-center gap-4">
          <Link href={RouteEnums.STAFF_LIST}>
            <Button variant={"outline"} className="py-6 rounded-lg">
              Cancel
            </Button>
          </Link>

          <Button className="py-6 rounded-lg">Submit</Button>
        </div> */
}
