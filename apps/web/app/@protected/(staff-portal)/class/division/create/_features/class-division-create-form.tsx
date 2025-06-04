"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import useDataRef from "@/hooks/use-data-ref";
import { useAuthUser } from "@/hooks/use-auth-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingContent } from "@/components/loading-content";
import { RouteEnums } from "@/constants/router/route-constants";
import { useGetStaffListQuery } from "@/apis/core-staff-api/staff";
import { useGetClassListQuery } from "@/apis/core-class-api/class";
import { useGetClassDivisionQuery } from "@/apis/core-class-api/class-division";
import { ClassDivisionCreateFormSchemaType } from "../_types/class-division-create-types";
import { ClassDivisionCreateFormSchema } from "../_schema/class-division-create-form-schema";
import { useCreateClassDivisionMutation, useUpdateClassDivisionMutation } from "@/apis/core-class-api/class-division";
import { Form, FormField, FormItem, FormControl, Input, toast, Button, Select, SelectValue, SelectTrigger, SelectContent, SelectItem, FormMessage } from "@repo/ui";

type Props = {
  classDivisionId?: number;
};

export function ClassDivisionCreateForm({ classDivisionId }: Props) {
  const router = useRouter();
  const { authUserIds } = useAuthUser();

  const isEdit = !!classDivisionId;

  const { createClassDivision, createClassDivisionPending, createClassDivisionError } = useCreateClassDivisionMutation({ params: { tenantId: authUserIds?.tenantId } });
  const { updateClassDivision, updateClassDivisionPending, updateClassDivisionError } = useUpdateClassDivisionMutation({ path: { classDivisionId }, params: { tenantId: authUserIds?.tenantId } });

  // TODO: collapse into a single call template from the backend
  const classListQueryResult = useGetClassListQuery({ params: { tenantId: authUserIds?.tenantId } });
  const classList = classListQueryResult?.data?.data;

  const staffListQueryResult = useGetStaffListQuery({ params: { tenantId: authUserIds?.tenantId } });
  const staffList = staffListQueryResult?.data?.data;

  const classDivisionQueryResult = useGetClassDivisionQuery({ path: { classDivisionId }, params: { tenantId: authUserIds?.tenantId } });
  const classDivision = classDivisionQueryResult?.data?.data;

  const handleSubmit = (values: ClassDivisionCreateFormSchemaType) => {
    const mutate = isEdit ? updateClassDivision : createClassDivision;

    mutate(
      {
        payload: { ...values, classId: Number(values.classId), classDivisionTeacherId: Number(values.classDivisionTeacherId) },
      },
      {
        onSuccess: (result) => {
          toast.success(result.message);
          router.push(RouteEnums.CLASS_DIVISION_LIST);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  const defaultValues = {
    tenantId: authUserIds?.tenantId,
    classId: "",
    classDivisionTeacherId: "",
    name: "",
  };

  const form = useForm<ClassDivisionCreateFormSchemaType>({
    resolver: zodResolver(ClassDivisionCreateFormSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const dataRef = useDataRef({ form });

  // Reset form values if editing an existing class division
  React.useEffect(() => {
    if (classList || classDivision) {
      dataRef.current.form.reset((values: ClassDivisionCreateFormSchemaType) => ({
        ...values,
        name: classDivision?.name || values.name,
        classId: String(classDivision?.classId) || values.classId,
        classDivisionTeacherId: String(classDivision?.classDivisionTeacherId) || values.classDivisionTeacherId,
      }));
    }
  }, [classList, classDivision]);

  return (
    <LoadingContent loading={classListQueryResult?.isLoading} error={classListQueryResult?.error} retry={classListQueryResult?.refetch} data={classListQueryResult?.data} shouldLoad={isEdit}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="mb-8 grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="classId"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={String(field.value)}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Class" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {classList?.map((classItem: Record<string, any>, idx: number) => (
                        <SelectItem key={idx} value={String(classItem?.id)}>
                          {classItem?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField control={form.control} disabled={!form.watch("classId")} name="name" render={({ field }) => <Input {...field} placeholder="Division Name" />} />
            <FormField
              control={form.control}
              name="classDivisionTeacherId"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={String(field.value)}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Class Teacher" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {staffList?.map((staff, idx: number) => (
                        <SelectItem key={idx} value={String(staff?.id)}>
                          {staff?.user?.lastName} {staff?.user?.firstName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid md:grid-cols-2 md:max-w-lg gap-4 mx-auto my-12">
            <Button variant={"outline"} type="button" onClick={() => router.push(RouteEnums.CLASS_DIVISION_LIST)} disabled={createClassDivisionPending || updateClassDivisionPending}>
              Cancel
            </Button>
            <Button type="button" onClick={() => handleSubmit(form.getValues())} loading={classListQueryResult?.isLoading || createClassDivisionPending || classDivisionQueryResult?.isLoading || updateClassDivisionPending}>
              {isEdit ? "Update Class Division" : "Create Class Division"}
            </Button>
          </div>
        </form>
      </Form>
    </LoadingContent>
  );
}
