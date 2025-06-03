"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import useDataRef from "@/hooks/use-data-ref";
import { useAuthUser } from "@/hooks/use-auth-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleMinus, CirclePlus } from "lucide-react";
import { LoadingContent } from "@/components/loading-content";
import { RouteEnums } from "@/constants/router/route-constants";
import { SchoolGradingStructureCreateFormSchema } from "../_schema/school-grading-structure-schema";
import { SchoolGradingStructureCreateFormSchemaType } from "../_types/school-grading-structure-form-types";
import { useCreateSchoolGradingStructureMutation, useGetSchoolGradingStructureQuery, useGetSchoolGradingStructureTemplateQuery } from "@/apis/core-tenant-api/tenant-grading-structure";
import { Button, Form, FormControl, FormField, FormItem, FormMessage, Input, Label, MultiSelect, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, toast } from "@repo/ui";
import { z } from "zod";

type Props = {
  gradeStructureId?: number;
};

export function SchoolGradingStructureForm({ gradeStructureId }: Props) {
  const router = useRouter();
  const { authUserIds } = useAuthUser();
  const isEdit = !!gradeStructureId;

  const schoolGradingStructureQueryResult = useGetSchoolGradingStructureQuery({ path: { gradeStructureId }, params: { tenantId: authUserIds?.tenantId } });
  const schoolGradingStructure = schoolGradingStructureQueryResult?.data?.data;

  const classIds = isEdit ? schoolGradingStructure?.classes?.map((cls) => cls?.id).join(",") : "100";

  const schoolGradingStructureTemplateQueryResult = useGetSchoolGradingStructureTemplateQuery({
    params: {
      tenantId: authUserIds?.tenantId,
      classIds,
    },
  });
  const schoolGradingStructureTemplate = schoolGradingStructureTemplateQueryResult?.data?.data;

  const { createGradingStructure, createGradingStructurePending, createGradingStructureError } = useCreateSchoolGradingStructureMutation({ params: { tenantId: authUserIds?.tenantId } });

  const handleSubmit = (values: SchoolGradingStructureCreateFormSchemaType) => {
    const filteredValues = {
      ...values,
      continuousAssessmentWeight: Number(values.continuousAssessmentWeight),
      examWeight: Number(values.examWeight),
      gradeBoundaries: values.gradeBoundaries.map((boundary) => ({
        ...boundary,
        minimumScore: Number(boundary.minimumScore),
        maximumScore: Number(boundary.maximumScore),
      })),
    };

    createGradingStructure(
      {
        payload: { ...filteredValues },
      },
      {
        onSuccess: (result) => {
          toast.success(result.message);
          router.push(RouteEnums.SCHOOL_GRADING_LIST);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  const defaultValues = {
    tenantId: authUserIds?.tenantId,
    id: 0,
    name: "",
    classIds: [],
    examWeight: undefined,
    continuousAssessmentWeight: undefined,
    gradeBoundaries: [
      {
        minimumScore: 0,
        maximumScore: 0,
        grade: "",
        remark: "",
      },
    ],
  };

  const form = useForm<SchoolGradingStructureCreateFormSchemaType>({
    resolver: zodResolver(z.any()),
    defaultValues,
    mode: "onSubmit",
  });

  const dataRef = useDataRef({ form });

  React.useEffect(() => {
    if (schoolGradingStructure) {
      dataRef.current.form.reset((values: SchoolGradingStructureCreateFormSchemaType) => ({
        ...values,
        id: schoolGradingStructure?.id,
        name: schoolGradingStructure?.name || values.name,
        examWeight: schoolGradingStructure?.examWeight || values.examWeight,
        continuousAssessmentWeight: schoolGradingStructure?.continuousAssessmentWeight || values.continuousAssessmentWeight,
        classIds: schoolGradingStructure?.classes?.map((classItem) => classItem?.id) || values.classIds,
        gradeBoundaries:
          (schoolGradingStructure?.gradeBoundaries &&
            schoolGradingStructure?.gradeBoundaries.map((gradeBoundaries) => ({
              ...gradeBoundaries,
              minimumScore: Number(gradeBoundaries?.minimumScore),
              maximumScore: Number(gradeBoundaries?.maximumScore),
              grade: gradeBoundaries?.grade,
              remark: gradeBoundaries?.remark,
            }))) ||
          [],
      }));
    }
  }, [isEdit, schoolGradingStructure, dataRef, schoolGradingStructureTemplate]);

  return (
    <>
      <LoadingContent loading={schoolGradingStructureQueryResult?.isLoading} error={schoolGradingStructureQueryResult?.error} retry={schoolGradingStructureQueryResult?.refetch} data={schoolGradingStructureQueryResult?.data} shouldLoad={isEdit}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="mb-8 grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name={"classIds"}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <MultiSelect
                          selected={Array.isArray(field.value) ? field.value : []}
                          onChange={field.onChange}
                          options={schoolGradingStructureTemplateQueryResult?.data?.data?.classOptions || []}
                          placeholder="Select Classes"
                          searchPlaceholder="Search classes"
                          emptyMessage="No classes found"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Label className="text-sm text-muted-foreground">Choose what classes this structure applies to.</Label>
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="examWeight"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} type="number" placeholder="Exam Percentage" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Label className="text-sm text-muted-foreground">This defines what percentage of the overall scores goes to the exam.</Label>
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="continuousAssessmentWeight"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} type="number" placeholder="Continuous Assessment Percentage" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Label className="text-sm text-muted-foreground">This defines what percentage of the overall scores goes to the continuous assessment.</Label>
              </div>

              {form.watch("gradeBoundaries")?.length > 0 &&
                form.watch("gradeBoundaries").map((gradeBoundaries: Record<string, any>, idx: number) => (
                  <div className="w-full grid md:grid-cols-4 gap-4 md:col-span-2 lg:w-5/6 mx-auto" key={idx}>
                    <div className="w-full flex items-center space-x-4">
                      <FormField
                        control={form.control}
                        name={`gradeBoundaries.${idx}.minimumScore`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} type="number" placeholder="From" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex items-center justify-center">-</div>
                      <FormField
                        control={form.control}
                        name={`gradeBoundaries.${idx}.maximumScore`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} type="number" placeholder="To" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-full">
                      <FormField
                        control={form.control}
                        name={`gradeBoundaries.${idx}.grade`}
                        render={({ field }) => (
                          <FormItem>
                            <Select onValueChange={field.onChange} value={String(field.value)}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Grade" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {schoolGradingStructureTemplateQueryResult?.data?.data?.gradeOptions?.map((grade, idx) => (
                                  <SelectItem key={idx} value={String(grade)}>
                                    {grade}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name={`gradeBoundaries.${idx}.remark`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} placeholder="Remark" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="outline"
                        type="button"
                        className=""
                        onClick={() =>
                          form.setValue(
                            "gradeBoundaries",
                            form.watch("gradeBoundaries").filter((_: any, i: number) => i !== idx)
                          )
                        }
                      >
                        <CircleMinus color="red" size={18} strokeWidth={1} />
                      </Button>
                      {idx === form.watch("gradeBoundaries").length - 1 ? (
                        <Button
                          variant="outline"
                          type="button"
                          className=""
                          onClick={() =>
                            form.setValue("gradeBoundaries", [
                              ...form.watch("gradeBoundaries"),
                              {
                                minimumScore: 0,
                                maximumScore: 0,
                                grade: "",
                                remark: "",
                              },
                            ])
                          }
                        >
                          <CirclePlus size={18} strokeWidth={1} />
                        </Button>
                      ) : (
                        <div />
                      )}
                    </div>
                  </div>
                ))}
            </div>
            <div className="grid md:grid-cols-2 md:max-w-lg gap-4 mx-auto my-12">
              <Button variant={"outline"} type="button" onClick={() => router.push(RouteEnums.SCHOOL_GRADING_LIST)} disabled={createGradingStructurePending}>
                Cancel
              </Button>
              <Button loading={schoolGradingStructureQueryResult?.isLoading || createGradingStructurePending || schoolGradingStructureQueryResult?.isLoading}>Create Grading Structure</Button>
            </div>
          </form>
        </Form>
      </LoadingContent>
    </>
  );
}
