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
import StudentCreateFormSuccessStep from "./student-create-form-success-step";
import { StudentCreateFormSchema } from "../_schema/student-create-form-schema";
import { Button, Card, CardDescription, CardTitle, Form, toast } from "@repo/ui";
import { StudentCreateFormPersonalStep } from "./student-create-form-personal-step";
import { StudentCreateFormGuardianStep } from "./student-create-form-guardian-step";
import { StudentCreateFormAdmissionStep } from "./student-create-form-admission.step";
import { StudentCreateFormResidentialStep } from "./student-create-form-residential-step";
import { StudentCreateFormFieldName, StudentCreateFormSchemaType, StudentTemplateOptions } from "../_types/student-create-form-types";
import { useGetStudentTemplateQuery, useStudentCreateMutation, useStudentUpdateMutation, useGetSingleStudentQuery } from "@/apis/core-student-api/student";

type Props = {
  studentId?: number;
};

export function StudentCreateForm({ studentId }: Props) {
  const router = useRouter();
  const stepper = useStepper();
  const { authUserIds } = useAuthUser();
  const [completedSteps, setCompletedSteps] = React.useState(0);

  const { studentCreate, studentCreatePending, studentCreateError } = useStudentCreateMutation({ params: { tenantId: authUserIds?.tenantId } });
  const studentQueryResult = useGetSingleStudentQuery({ path: { studentId }, params: { tenantId: authUserIds?.tenantId } });
  const student = studentQueryResult?.data?.data;

  const isEdit = !!studentId;

  const { studentUpdate, studentUpdatePending, studentUpdateError } = useStudentUpdateMutation({ path: { studentId }, params: { tenantId: authUserIds?.tenantId } });

  const handleCreateStudent = (values: StudentCreateFormSchemaType) => {
    const mutate = isEdit ? studentUpdate : studentCreate;
    mutate(
      {
        payload: {
          ...values,
          tenantId: authUserIds?.tenantId,
          residentialCountryId: Number(values.residentialCountryId),
          residentialStateId: Number(values.residentialStateId),
          residentialLgaId: Number(values.residentialLgaId),
          residentialZipCode: Number(values.residentialZipCode),
          classId: Number(values.classId),
          classDivisionId: Number(values.classDivisionId),
          guardians: values.guardians.map((guardian) => ({
            ...guardian,
            residentialCountryId: Number(guardian.residentialCountryId),
            residentialStateId: Number(guardian.residentialStateId),
            residentialLgaId: Number(guardian.residentialLgaId),
            residentialZipCode: Number(guardian.residentialZipCode),
          })),
          subjectIds: values.subjectIds.map((subjectId) => Number(subjectId)),
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
    id: "",
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    dateOfBirth: "",
    phoneNumber: "",
    bloodGroup: "",
    religion: "",

    residentialAddress: "",
    residentialLgaId: "",
    residentialStateId: "",
    residentialCountryId: "",
    residentialZipCode: "",

    guardians: [
      {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        residentialAddress: "",
        residentialLgaId: "",
        residentialStateId: "",
        residentialCountryId: "",
        residentialZipCode: "",
        gender: "",
        dateOfBirth: "",
        subjectIds: [],
      },
    ],

    classId: 0,
    classDivisionId: 0,
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
        id: student?.user?.id || null,
        firstName: student?.user?.firstName || values.firstName,
        lastName: student?.user?.lastName || values.lastName,
        gender: student?.user?.gender || values.gender,
        email: student?.user?.email || values.email,
        dateOfBirth: student?.user?.dateOfBirth || values.dateOfBirth,
        phoneNumber: student?.user?.phoneNumber || values.phoneNumber,
        religion: student?.user?.religion || values.religion,
        bloodGroup: student?.user?.bloodGroup || values.bloodGroup,

        residentialAddress: student?.user?.residentialAddress || values.residentialAddress,
        residentialLgaId: Number(student?.user?.residentialLgaId) || values.residentialLgaId,
        residentialStateId: Number(student?.user?.residentialStateId) || values.residentialStateId,
        residentialZipCode: Number(student?.user?.residentialZipCode) || values.residentialZipCode,
        residentialCountryId: Number(student?.user?.residentialCountryId) || values.residentialCountryId,

        guardians:
          student?.guardians?.map((guardian) => ({
            id: guardian.id,
            email: guardian.email,
            gender: guardian.gender,
            lastName: guardian.lastName,
            firstName: guardian.firstName,
            phoneNumber: guardian.phoneNumber,
            dateOfBirth: guardian.dateOfBirth,
            residentialAddress: guardian.residentialAddress,
            residentialLgaId: Number(guardian.residentialLgaId),
            residentialZipCode: Number(guardian.residentialZipCode),
            residentialStateId: Number(guardian.residentialStateId),
            residentialCountryId: Number(guardian.residentialCountryId),
          })) || values.guardians,

        classId: student?.class?.id || values.classId,
        classDivisionId: Number(student?.classDivisionId) || values.classDivisionId,
        subjectIds: student?.subjects?.map((subject) => subject.id) || values.subjectIds,
      }));
    }
  }, [student, dataRef, isEdit]);

  const residentialStateId = form.watch("residentialStateId");
  const classId = form.watch("classId");

  const studentTemplateQuery = useGetStudentTemplateQuery(
    React.useMemo(
      () => ({
        params: {
          tenantId: authUserIds?.tenantId,
          codeValue: Number(residentialStateId),
          classId: Number(classId),
        },
      }),
      [residentialStateId, classId, authUserIds?.tenantId]
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
      label: "Residential Information",
      description: "Enter your residential details such as state, lga, address, and postal code.",
      content: <StudentCreateFormResidentialStep {...stepProps} />,
      fields: [""],
    },
    {
      id: 2,
      label: "Guardian Information",
      description: "Enter your guardian details such as name, gender, date of birth, and email address.",
      content: <StudentCreateFormGuardianStep {...stepProps} />,
      fields: [""],
    },
    {
      id: 3,
      label: "Admission Information",
      description: "Enter your admission details such as class, admission number, and enrollment date.",
      content: <StudentCreateFormAdmissionStep {...stepProps} />,
      fields: [""],
    },
    {
      id: 4,
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
    <LoadingContent loading={studentQueryResult?.isLoading} error={studentQueryResult?.error} retry={studentQueryResult?.refetch} data={studentQueryResult?.data} shouldLoad={isEdit}>
      <Card className="flex items-center 2xl:justify-center p-4 gap-4 w-full md:max-w-2xl xl:max-w-4xl 2xl:max-w-min mx-auto overflow-x-scroll my-8">
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
