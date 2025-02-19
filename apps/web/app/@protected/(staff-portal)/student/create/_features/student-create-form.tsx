"use client";

import React from "react";
import { RouteEnums } from "@/constants/router/route-constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardDescription, CardTitle, Form, toast } from "@repo/ui";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useGetStudentTemplateQuery, useStudentCreateMutation, useStudentUpdateMutation, useGetSingleStudentQuery } from "@/apis/core-student-api/student";
import { StudentCreateFormFieldName, StudentCreateFormSchemaType, StudentTemplateOptions } from "../_types/student-create-form-types";
import { useAuthUser } from "@/hooks/use-auth-user";
import { StudentCreateFormSchema } from "../_schema/student-create-form-schema";
import useStepper from "@/hooks/use-stepper";
import useDataRef from "@/hooks/use-data-ref";
import { LoadingContent } from "@/components/loading-content";
import StepperButton from "@/components/stepper-button";
import { StudentCreateFormPersonalStep } from "./student-create-form-personal-step";
import StudentCreateFormSuccessStep from "./student-create-form-success-step";

type Props = {
  studentId?: number;
};

export function StudentCreateForm({ studentId }: Props) {
  const router = useRouter();
  const stepper = useStepper();
  const { authUserIds } = useAuthUser();
  const [completedSteps, setCompletedSteps] = React.useState(0);

  const { studentCreate, studentCreatePending, studentCreateError } = useStudentCreateMutation();
  const studentQueryResult = studentId ? useGetSingleStudentQuery({ studentId }) : null;
  const student = studentQueryResult?.data?.data;

  const isEdit = !!studentId;

  const { studentUpdate, studentUpdatePending, studentUpdateError } = useStudentUpdateMutation({ studentId });

  const handleCreateStudent = (values: StudentCreateFormSchemaType) => {
    const mutate = isEdit ? studentUpdate : studentCreate;
    mutate(
      {
        payload: {
          ...values,
          tenantId: authUserIds?.tenantId,
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
    tenantId: authUserIds?.tenantId,
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    dateOfBirth: "",
    phoneNumber: "",
    residentialAddress: "",
  };

  const form = useForm<StudentCreateFormSchemaType>({
    resolver: zodResolver(StudentCreateFormSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const dataRef = useDataRef({ form });

  // Reset form values if editing an existing student
  React.useEffect(() => {
    if (student) {
      dataRef.current.form.reset((values: StudentCreateFormSchemaType) => ({
        ...values,
        firstName: student?.user?.firstName || values.firstName,
        lastName: student?.user?.lastName || values.lastName,
        gender: student?.user?.gender || values.gender,
        email: student?.user?.email || values.email,
        dateOfBirth: student?.user?.dateOfBirth || values.dateOfBirth,
        phoneNumber: student?.user?.phoneNumber || values.phoneNumber,
        residentialAddress: student?.user?.residentialAddress || values.residentialAddress,
      }));
    }
  }, [student, dataRef]);

  const residentialStateId = form.watch("residentialStateId");
  const studentTemplateQuery = useGetStudentTemplateQuery(
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
    studentTemplateQuery: studentTemplateQuery as StudentTemplateOptions,
  };

  const steps = [
    {
      id: 0,
      label: "Personal Information",
      description: "Enter your personal details such as name, gender, date of birth, and email address.",
      content: <StudentCreateFormPersonalStep {...stepProps} />,
      fields: [""],
    },
    {
      id: 1,
      label: "Submission Successful!",
      description: isEdit ? "Your student profile has been successfully edited." : "The student has been successfully registered.",
      content: <StudentCreateFormSuccessStep />,
      fields: [""],
    },
  ];

  const isFirstStep = stepper.step === 0;
  const isLastStep = stepper.step === steps.length - 1;
  const isSecondToLastStep = stepper.step === steps.length - 2;

  // Form Step Control Buttons
  const next = async () => {
    const fields = steps?.[stepper.step]?.fields;

    const output = await form.trigger(fields as StudentCreateFormFieldName[], {
      shouldFocus: true,
    });
    if (!output) return;

    if (isSecondToLastStep) {
      handleCreateStudent(form.getValues());
    } else if (isLastStep) {
      router.push(RouteEnums.STUDENT_LIST);
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
    <LoadingContent loading={studentQueryResult?.isLoading} error={studentQueryResult?.error} retry={studentQueryResult?.refetch} data={studentQueryResult?.data} shouldLoad={!!studentId}>
      <Card className="flex items-center xl:justify-center p-4 gap-4 w-full md:max-w-min mx-auto overflow-x-scroll my-8">
        {steps.slice(0, steps.length - 1).map((step, i) => (
          <div key={i}>
            <StepperButton stepper={stepper} completedSteps={completedSteps} complete={steps.length - 1 === completedSteps} selected={stepper.step === i} step={i + 1} i={i}>
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
          <form onSubmit={form.handleSubmit(handleCreateStudent)} className="space-y-4">
            {steps?.[stepper.step]?.content}
          </form>
        </Form>
      </div>
      <div className="grid md:grid-cols-2 md:max-w-lg gap-4 mx-auto my-12">
        <Button variant={"outline"} type="button" onClick={previous} disabled={isFirstStep || isLastStep || studentCreatePending || studentUpdatePending}>
          Previous
        </Button>
        <Button type="button" onClick={next} loading={studentCreatePending || studentUpdatePending}>
          {isSecondToLastStep ? "Complete" : isLastStep ? "Go To Student List" : "Next"}
        </Button>
      </div>
    </LoadingContent>
  );
}
