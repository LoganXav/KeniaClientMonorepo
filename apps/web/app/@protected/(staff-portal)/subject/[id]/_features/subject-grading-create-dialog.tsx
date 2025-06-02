"use client";

import { z } from "zod";
import React from "react";
import { useForm } from "react-hook-form";
import useDataRef from "@/hooks/use-data-ref";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingContent } from "@/components/loading-content";
import { SubjectGradingCreateFormSchema } from "../_schema/subject-grading-schema";
import { SubjectGradingCreateFormSchemaType } from "../_types/subject-grading-form-types";
import { useSubjectGradingCreateMutation } from "@/apis/core-subject-api/subject-grading";
import { SubjectGradingTemplateOptions } from "../../../student/grading/_types/subject-grading-types";
import { SubjectGradingStructureQueryResultType } from "../_types/subject-grading-structure-form-types";
import { Button, Dialog, DialogContent, DialogTitle, Form, FormControl, FormField, FormItem, FormMessage, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, toast, Typography } from "@repo/ui";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  subjectId: number;
  tenantId?: number;
  gradingTemplateQueryResult: SubjectGradingTemplateOptions;
  subjectGradingStructureQueryResult: SubjectGradingStructureQueryResultType;
}

export function SubjectGradingCreateDialog({ open, onClose, subjectId, subjectGradingStructureQueryResult, tenantId, gradingTemplateQueryResult }: DialogProps) {
  const subjectGradingStructure = subjectGradingStructureQueryResult?.data?.data;
  const gradingTemplate = gradingTemplateQueryResult?.data?.data;

  const { subjectGradingCreate, subjectGradingCreatePending, subjectGradingCreateError } = useSubjectGradingCreateMutation({ params: { tenantId } });

  const defaultValues = {
    subjectId,
    studentId: 0,
    classId: "",
    calendarId: "",
    classDivisionId: "",
    termId: "",
    examScore: 0,
    continuousAssessmentScores: [],
  };

  const form = useForm<SubjectGradingCreateFormSchemaType>({
    resolver: zodResolver(SubjectGradingCreateFormSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const dataRef = useDataRef({ form });

  // Populate assessment scores based on grading structure
  React.useEffect(() => {
    if (subjectGradingStructure) {
      const breakdownItems = subjectGradingStructure?.continuousAssessmentBreakdownItems ?? [];

      dataRef.current.form.reset((values: SubjectGradingCreateFormSchemaType) => ({
        ...values,
        continuousAssessmentScores: breakdownItems.map((item) => ({
          name: item.name,
          score: 0,
        })),
      }));
    }
  }, [subjectGradingStructure, dataRef, open]);

  const handleSubmit = (values: SubjectGradingCreateFormSchemaType) => {
    const filteredValues = {
      ...values,
      subjectId: Number(subjectId),
      termId: Number(values.termId),
      studentId: Number(values.studentId),
      examScore: Number(values.examScore),
      calendarId: Number(values.calendarId),
      continuousAssessmentScores: values.continuousAssessmentScores.map((item) => ({
        ...item,
        score: Number(item.score),
      })),
    };

    subjectGradingCreate(
      { payload: { ...filteredValues } },
      {
        onSuccess: (result) => {
          toast.success(result.message);
          handleClose();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  const handleClose = () => {
    form.reset(defaultValues);
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            handleClose();
          }
        }}
      >
        <DialogContent
          className="max-w-2xl"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogTitle>
            <Typography size="h4" className="font-heading">
              Submit Grades
            </Typography>
          </DialogTitle>

          <LoadingContent loading={subjectGradingStructureQueryResult?.isLoading} error={subjectGradingStructureQueryResult?.error} data={subjectGradingStructureQueryResult?.data} retry={subjectGradingStructureQueryResult?.refetch}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="mb-8 grid gap-4">
                  <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <FormField
                      control={form.control}
                      name="calendarId"
                      render={({ field }) => (
                        <FormItem>
                          <Select onValueChange={field.onChange} value={String(field.value)}>
                            <FormControl>
                              <SelectTrigger className="h-10">
                                <SelectValue placeholder="Select year" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {gradingTemplate?.calendarOptions?.map((item: Record<string, any>, idx: number) => (
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
                      name="termId"
                      render={({ field }) => (
                        <FormItem>
                          <Select onValueChange={field.onChange} value={String(field.value)}>
                            <FormControl>
                              <SelectTrigger className="h-10">
                                <SelectValue placeholder="Term" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {gradingTemplate?.termOptions?.map((termOption, idx) => (
                                <SelectItem key={idx} value={String(termOption?.id)}>
                                  {termOption?.name}
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
                              {gradingTemplate?.classOptions?.map((classOption, idx) => (
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
                          <Select onValueChange={field.onChange} value={String(field.value)}>
                            <FormControl>
                              <SelectTrigger className="h-10">
                                <SelectValue placeholder="Class Division" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {gradingTemplate?.classDivisionOptions?.map((classDivisionOption, idx) => (
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
                  <FormField
                    control={form.control}
                    name={"studentId"}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} placeholder="Student" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {form.watch("continuousAssessmentScores")?.map((item: any, idx: number) => (
                    <div key={idx} className="w-full grid md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <FormField
                          control={form.control}
                          name={`continuousAssessmentScores.${idx}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input {...field} disabled />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name={`continuousAssessmentScores.${idx}.score`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} type="number" placeholder="Score" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                  <div className="w-full grid md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <Input value={"Exam"} disabled />
                    </div>

                    <FormField
                      control={form.control}
                      name={"examScore"}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} type="number" placeholder="Score" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className={"w-full grid md:max-w-lg gap-4 mx-auto md:grid-cols-2"}>
                  <Button className="w-full md:w-auto" variant={"outline"} type="button" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button className="w-full md:w-auto" loading={subjectGradingCreatePending}>
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </LoadingContent>
        </DialogContent>
      </Dialog>
    </>
  );
}
