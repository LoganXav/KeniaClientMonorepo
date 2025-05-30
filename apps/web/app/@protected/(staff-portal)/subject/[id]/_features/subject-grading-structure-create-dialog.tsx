import React from "react";
import { useForm } from "react-hook-form";
import useDataRef from "@/hooks/use-data-ref";
import { useAuthUser } from "@/hooks/use-auth-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleMinus, CirclePlus } from "lucide-react";
import { LoadingContent } from "@/components/loading-content";
import { SchoolGradingStructureType, SubjectType } from "@/types";
import { SubjectGradingStructureCreateFormSchema } from "../_schema/subject-grading-structure-schema";
import { SubjectGradingStructureCreateFormSchemaType } from "../_types/subject-grading-structure-form-types";
import { useCreateSubjectGradingStructureMutation, useGetSubjectGradingStructureQuery } from "@/apis/core-subject-api/subject-grading-structure";
import { Button, Dialog, DialogContent, DialogTitle, Form, FormControl, FormField, FormItem, FormMessage, Input, toast, Typography } from "@repo/ui";

interface DialogProps {
  open: boolean;
  isView?: boolean;
  onClose: () => void;
  subject?: SubjectType;
  schoolGradingStructure?: SchoolGradingStructureType;
}

export function SubjectGradingStructureCreateDialog({ open, onClose, subject, isView = false, schoolGradingStructure }: DialogProps) {
  const { authUserIds } = useAuthUser();
  const isEdit = !!subject?.gradingStructure;

  const subjectGradingStructureQueryResult = useGetSubjectGradingStructureQuery({ path: {}, params: { tenantId: authUserIds?.tenantId, subjectId: subject?.id } });
  const subjectGradingStructure = subjectGradingStructureQueryResult?.data?.data;

  const { createGradingStructure, createGradingStructurePending, createGradingStructureError } = useCreateSubjectGradingStructureMutation({ params: { tenantId: authUserIds?.tenantId } });

  const defaultValues = {
    id: 0,
    subjectId: subject?.id,
    staffId: authUserIds?.id,
    classId: subject?.classId,
    tenantGradingStructureId: schoolGradingStructure?.id,
    continuousAssessmentBreakdownItems: [
      {
        name: "",
        weight: "",
      },
    ],
  };

  const form = useForm<SubjectGradingStructureCreateFormSchemaType>({
    resolver: zodResolver(SubjectGradingStructureCreateFormSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const dataRef = useDataRef({ form });

  React.useEffect(() => {
    if (subjectGradingStructure) {
      dataRef.current.form.reset((values: SubjectGradingStructureCreateFormSchemaType) => ({
        ...values,
        id: subjectGradingStructure?.id,
        tenantGradingStructureId: schoolGradingStructure?.id,
        subjectId: subject?.id,
        staffId: authUserIds?.id,
        classId: subject?.classId,
        continuousAssessmentBreakdownItems:
          (subjectGradingStructure?.continuousAssessmentBreakdownItems &&
            subjectGradingStructure?.continuousAssessmentBreakdownItems.map((item) => ({
              ...item,
              weight: Number(item?.weight),
            }))) ||
          values.continuousAssessmentBreakdownItems,
      }));
    }
  }, [isEdit, schoolGradingStructure, dataRef, subjectGradingStructure, authUserIds, subject]);

  const handleSubmit = (values: SubjectGradingStructureCreateFormSchemaType) => {
    const filteredValues = {
      ...values,
      id: subjectGradingStructure?.id || 0,
      subjectId: Number(subject?.id),
      classId: Number(subject?.classId),
      tenantGradingStructureId: Number(schoolGradingStructure?.id),
      continuousAssessmentBreakdownItems: values.continuousAssessmentBreakdownItems.map((item) => ({
        ...item,
        weight: Number(item.weight),
      })),
    };

    createGradingStructure(
      {
        payload: { ...filteredValues },
      },
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
    // form.reset(defaultValues);
    onClose();
  };

  return (
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
            {isEdit ? "Update Subject Grading Structure" : "Create Subject Grading Structure"}
          </Typography>
        </DialogTitle>

        <LoadingContent loading={subjectGradingStructureQueryResult?.isLoading} error={subjectGradingStructureQueryResult?.error} data={subjectGradingStructureQueryResult?.data} shouldLoad={isView} retry={subjectGradingStructureQueryResult?.refetch}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="mb-8 grid md:grid-cols-1 gap-4">
                {form.watch("continuousAssessmentBreakdownItems")?.length > 0 &&
                  form.watch("continuousAssessmentBreakdownItems").map((item: Record<string, any>, idx: number) => (
                    <div key={idx} className="w-full grid md:grid-cols-4 gap-4">
                      <div className="md:col-span-2">
                        <FormField
                          control={form.control}
                          name={`continuousAssessmentBreakdownItems.${idx}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input {...field} placeholder="Name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="">
                        <FormField
                          control={form.control}
                          name={`continuousAssessmentBreakdownItems.${idx}.weight`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input {...field} placeholder="Weight" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex items-center space-x-4">
                        <Button
                          variant="outline"
                          type="button"
                          className=""
                          onClick={() =>
                            form.watch("continuousAssessmentBreakdownItems").length > 1 &&
                            form.setValue(
                              "continuousAssessmentBreakdownItems",
                              form.watch("continuousAssessmentBreakdownItems").filter((_: any, i: number) => i !== idx)
                            )
                          }
                        >
                          <CircleMinus color="red" size={18} strokeWidth={1} />
                        </Button>
                        {idx === form.watch("continuousAssessmentBreakdownItems").length - 1 ? (
                          <Button
                            variant="outline"
                            type="button"
                            className=""
                            onClick={() =>
                              form.setValue("continuousAssessmentBreakdownItems", [
                                ...form.watch("continuousAssessmentBreakdownItems"),
                                {
                                  name: "",
                                  weight: "",
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

              <div className="w-full grid md:grid-cols-2 md:max-w-lg gap-4 mx-auto">
                <Button className="w-full md:w-auto" variant={"outline"} type="button" onClick={handleClose} disabled={createGradingStructurePending}>
                  Cancel
                </Button>
                <Button className="w-full md:w-auto" loading={createGradingStructurePending}>
                  {isEdit ? "Update Grading Structure" : "Create Grading Structure"}
                </Button>
              </div>
            </form>
          </Form>
        </LoadingContent>
      </DialogContent>
    </Dialog>
  );
}
