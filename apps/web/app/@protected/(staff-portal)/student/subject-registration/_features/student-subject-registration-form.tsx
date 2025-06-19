"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import useDataRef from "@/hooks/use-data-ref";
import { useAuthUser } from "@/hooks/use-auth-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { RouteEnums } from "@/constants/router/route-constants";
import { StudentSubjectRegistrationCreateFormSchema } from "../_schema/student-subject-registration-form-schema";
import { StudentSubjectRegistrationCreateFormSchemaType } from "../_types/student-subject-registration-form-types";
import { useGetStudentTemplateQuery, useStudentSubjectRegistrationCreateMutation } from "@/apis/core-student-api/student";
import { FormControl, FormField, FormItem, FormMessage, SelectValue, Select, SelectTrigger, SelectContent, SelectItem, Button, Form, Card, MultiSelect, Label, toast, CardTitle, CardDescription } from "@repo/ui";

type Props = {
  studentId?: number;
};

export function StudentSubjectRegistrationForm({ studentId }: Props) {
  const router = useRouter();
  const { authUserIds } = useAuthUser();

  const defaultValues = {
    calendarId: "",
    studentId: "",
    subjectIds: [],
    classId: "",
    classDivisionId: "",
  };

  const form = useForm<StudentSubjectRegistrationCreateFormSchemaType>({
    resolver: zodResolver(StudentSubjectRegistrationCreateFormSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const classId = Number(form.watch("classId"));
  const calendarId = Number(form.watch("calendarId"));
  const selectedStudentId = Number(form.watch("studentId"));
  const classDivisionId = Number(form.watch("classDivisionId"));

  const studentTemplateQuery = useGetStudentTemplateQuery(
    React.useMemo(
      () => ({
        params: {
          tenantId: authUserIds?.tenantId,
          classId: Number(classId),
          classDivisionId: Number(classDivisionId),
          calendarId: Number(calendarId),
        },
      }),
      [classId, classDivisionId, calendarId, authUserIds?.tenantId]
    )
  );

  const studentTemplate = studentTemplateQuery?.data?.data;
  const foundStudent = studentTemplate?.studentOptions?.find((student) => student.id === selectedStudentId);

  const { studentSubjectRegistrationCreate, studentSubjectRegistrationCreatePending, studentSubjectRegistrationCreateError } = useStudentSubjectRegistrationCreateMutation({ params: { tenantId: authUserIds?.tenantId } });

  const handleRegister = (values: StudentSubjectRegistrationCreateFormSchemaType) => {
    studentSubjectRegistrationCreate(
      {
        payload: {
          ...values,
          studentId: Number(values.studentId),
          calendarId: Number(values.calendarId),
          classId: Number(values.classId),
          classDivisionId: Number(values.classDivisionId),
        },
      },
      {
        onSuccess: (result) => {
          toast.success(result.message);
          router.push(RouteEnums.STUDENT_LIST);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  //   Form Updates
  const dataRef = useDataRef({ form });

  React.useEffect(() => {
    dataRef.current.form.reset((values: any) => ({
      ...values,
      id: foundStudent?.id || "",
      subjectIds: foundStudent?.subjectsRegistered?.map((subject) => subject.subjectId) || values.subjectIds,
      classDivisionId: foundStudent?.classDivisionId || values.classDivisionId,
    }));
  }, [foundStudent, dataRef]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleRegister)}>
          <div className="space-y-4">
            <Card className="border shadow-none grid gap-2 p-4 my-8 md:p-8">
              <CardTitle className="font-heading">Student Subject Registration</CardTitle>
              <CardDescription className="max-w-xl"> Search for a student and assign their subjects for the current academic session based on their class placement.</CardDescription>
            </Card>
            <div className="grid md:grid-cols-2">
              <div className="grid md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="calendarId"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} value={String(field.value)}>
                        <FormControl>
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder="Select Year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {studentTemplate?.calendarOptions?.map((item, idx: number) => (
                            <SelectItem key={idx} value={String(item.id)}>
                              {item.year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="classId"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} value={String(field.value)}>
                        <FormControl>
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder="Class" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {studentTemplate?.classOptions?.map((classOption, idx) => (
                            <SelectItem key={idx} value={String(classOption?.id)}>
                              {classOption?.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="classDivisionId"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} value={String(field.value)} disabled={!classId}>
                        <FormControl>
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder="Class Division" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {studentTemplate?.classDivisionOptions?.map((classDivisionOption, idx) => (
                            <SelectItem key={idx} value={String(classDivisionOption?.id)}>
                              {classDivisionOption?.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* <div className="flex-1" /> */}
            </div>

            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={String(field.value)} disabled={!classId}>
                    <FormControl>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select Student" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {studentTemplate?.studentOptions?.map((student, idx: number) => (
                        <SelectItem key={idx} value={String(student.id)}>
                          {student?.user?.lastName} {student?.user?.firstName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormField
                control={form.control}
                name={"subjectIds"}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <MultiSelect selected={Array.isArray(field.value) ? field.value : []} onChange={field.onChange} options={studentTemplate?.subjectOptions || []} placeholder="Select Subjects" searchPlaceholder="Search Subjects" emptyMessage="No subjects found" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Label className="text-sm text-muted-foreground">Choose subjects available to the class for this student.</Label>
            </div>
          </div>

          <div className="grid md:grid-cols-2 md:max-w-lg gap-4 mx-auto my-12">
            <Button variant={"outline"} type="button" onClick={() => router.push(RouteEnums.STAFF)}>
              Cancel
            </Button>
            <Button disabled={!foundStudent?.id} loading={studentSubjectRegistrationCreatePending}>
              Save
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
