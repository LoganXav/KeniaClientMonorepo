"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, Input, toast, Card, CardTitle, Button, Typography, DatePicker, Select, SelectValue, SelectTrigger, SelectContent, SelectItem, FormMessage } from "@repo/ui";
import { useForm } from "react-hook-form";
import { ClassDivisionCreateFormSchema } from "../_schema/class-division-create-form-schema";
import { ClassDivisionCreateFormSchemaType } from "../_types/class-division-create-types";
import { LoadingContent } from "@/components/loading-content";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/hooks/use-auth-user";
import { useGetClassListQuery } from "@/apis/core-class-api/class";
import { useGetClassDivisionQuery } from "@/apis/core-class-api/class-division";
import useDataRef from "@/hooks/use-data-ref";
import React from "react";
import { RouteEnums } from "@/constants/router/route-constants";
import { useCreateClassDivisionMutation, useUpdateClassDivisionMutation } from "@/apis/core-class-api/class-division";
type Props = {
  classDivisionId?: number;
};

export function ClassDivisionCreateForm({ classDivisionId }: Props) {
  const router = useRouter();
  const { authUserIds } = useAuthUser();

  const isEdit = !!classDivisionId;

  const { createClassDivision, createClassDivisionPending, createClassDivisionError } = useCreateClassDivisionMutation({ params: { tenantId: authUserIds?.tenantId } });
  const { updateClassDivision, updateClassDivisionPending, updateClassDivisionError } = useUpdateClassDivisionMutation({ path: { classDivisionId }, params: { tenantId: authUserIds?.tenantId } });

  const classListQueryResult = useGetClassListQuery({ params: { tenantId: authUserIds?.tenantId } });
  const classList = classListQueryResult?.data?.data;

  const classDivisionQueryResult = useGetClassDivisionQuery({ path: { classDivisionId }, params: { tenantId: authUserIds?.tenantId } });
  const classDivision = classDivisionQueryResult?.data?.data;

  const handleSubmit = (values: ClassDivisionCreateFormSchemaType) => {
    const mutate = isEdit ? updateClassDivision : createClassDivision;

    mutate(
      {
        payload: { ...values, classId: Number(values.classId) },
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
      }));
    }
  }, [classList, classDivision]);

  return (
    <LoadingContent loading={classListQueryResult?.isLoading} error={classListQueryResult?.error} retry={classListQueryResult?.refetch} data={classListQueryResult?.data} shouldLoad={isEdit}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="mb-8 grid md:grid-cols-2 gap-4">
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
        </form>
      </Form>

      <div className="grid md:grid-cols-2 md:max-w-lg gap-4 mx-auto my-12">
        <Button variant={"outline"} type="button" onClick={() => router.push(RouteEnums.CLASS_DIVISION_LIST)} disabled={createClassDivisionPending || updateClassDivisionPending}>
          Cancel
        </Button>
        <Button type="button" onClick={() => handleSubmit(form.getValues())} loading={classListQueryResult?.isLoading || createClassDivisionPending || classDivisionQueryResult?.isLoading || updateClassDivisionPending}>
          {isEdit ? "Update Class Division" : "Create Class Division"}
        </Button>
      </div>
    </LoadingContent>
  );
}
