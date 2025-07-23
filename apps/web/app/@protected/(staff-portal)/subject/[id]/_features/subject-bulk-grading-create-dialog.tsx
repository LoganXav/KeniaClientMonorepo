"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { DownloadIcon } from "lucide-react";
import useDataRef from "@/hooks/use-data-ref";
import { useAuthUser } from "@/hooks/use-auth-user";
import { downloadCsvTemplate } from "@/lib/templates";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingContent } from "@/components/loading-content";
import { CsvDropzone } from "@/components/file-upload/csv-dropzone";
import { SubjectGradingCreateFormSchema } from "../_schema/subject-grading-schema";
import { SubjectGradingCreateFormSchemaType } from "../_types/subject-grading-form-types";
import { SubjectGradingTemplateOptions } from "../../../student/grading/_types/subject-grading-types";
import { SubjectGradingStructureQueryResultType } from "../_types/subject-grading-structure-form-types";
import { useGetSubjectGradingTemplateQuery, useSubjectGradingCreateMutation } from "@/apis/core-subject-api/subject-grading";
import { Button, Dialog, DialogContent, DialogTitle, Form, FormControl, FormField, FormItem, FormMessage, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, toast, Typography } from "@repo/ui";

interface DialogProps {
  open: boolean;
  classId?: number;
  onClose: () => void;
  subjectId: number;
  tenantId?: number;
  subjectGradingStructureQueryResult: SubjectGradingStructureQueryResultType;
}

export function SubjectBulkGradingCreateDialog({ open, onClose, subjectId, classId, subjectGradingStructureQueryResult, tenantId }: DialogProps) {
  const { authUserIds } = useAuthUser();
  const [parsedData, setParsedData] = React.useState<any[]>([]);

  const subjectGradingStructure = subjectGradingStructureQueryResult?.data?.data;

  //   const { subjectGradingCreate, subjectGradingCreatePending, subjectGradingCreateError } = useSubjectGradingCreateMutation({ params: { tenantId } });

  const defaultValues = {
    subjectId,
    studentId: "",
    calendarId: "",
    termId: "",
    students: [
      {
        admissionNo: "",
        grades: {
          examScore: 0,
          continuousAssessmentScores: [],
        },
      },
    ],
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

  const handleSubmit = (values: any) => {
    // const filteredValues = {
    //   ...values,
    //   subjectId: Number(subjectId),
    //   termId: Number(values.termId),
    //   studentId: Number(values.studentId),
    //   examScore: Number(values.examScore),
    //   calendarId: Number(values.calendarId),
    //   continuousAssessmentScores: values.continuousAssessmentScores.map((item: any) => ({
    //     ...item,
    //     score: Number(item.score),
    //   })),
    // };
    // subjectGradingCreate(
    //   { payload: {} },
    //   {
    //     onSuccess: (result) => {
    //       toast.success(result.message);
    //       handleClose();
    //     },
    //     onError: (error) => {
    //       toast.error(error.message);
    //     },
    //   }
    // );
  };

  const handleClose = () => {
    form.reset(defaultValues);
    onClose();
    setParsedData([]);
  };

  const handleParsed = (rows: any[]) => {
    setParsedData(rows);
  };

  const calendarId = Number(form.watch("calendarId"));
  const termId = Number(form.watch("termId"));

  const gradingTemplateQueryResult = useGetSubjectGradingTemplateQuery(React.useMemo(() => ({ params: { calendarId, tenantId: authUserIds?.tenantId, subjectId } }), [calendarId, authUserIds?.tenantId, subjectId])) as SubjectGradingTemplateOptions;
  const gradingTemplate = gradingTemplateQueryResult?.data?.data;

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
              Bulk Submit Grades
            </Typography>
          </DialogTitle>

          <LoadingContent loading={subjectGradingStructureQueryResult?.isLoading} error={subjectGradingStructureQueryResult?.error} data={subjectGradingStructureQueryResult?.data} retry={subjectGradingStructureQueryResult?.refetch}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="mb-8 grid gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
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
                              {gradingTemplate?.calendarOptions?.map((item, idx: number) => (
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
                          <Select onValueChange={field.onChange} value={String(field.value)} disabled={!calendarId}>
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
                  </div>
                </div>

                <div className="space-y-4">
                  <CsvDropzone<any> onParsed={handleParsed} disabled={!termId} expectedHeaders={["firstName", "lastName", "email", "phoneNumber", "gender", "nin", "jobTitle"]} />

                  {parsedData.length > 0 && (
                    <>
                      <Typography size="small" className="uppercase font-heading">
                        Upload Preview :
                      </Typography>
                      <div className="relative overflow-x-auto rounded-md border text-sm max-w-2xl">{/* <DataTable data={parsedData.slice(0, 5)} columns={columns} showPagination={false} /> */}</div>
                      <Typography color={"muted"} size={"small"} className="mt-2 italic">
                        Showing first 5 rows. Total rows ({parsedData.length})
                      </Typography>
                    </>
                  )}

                  <div className="flex flex-col md:flex-row justify-between gap-4 pt-4">
                    <Button
                      variant="outline"
                      onClick={() =>
                        downloadCsvTemplate(
                          ["firstName", "lastName", "email", "phoneNumber", "gender", "nin", "jobTitle"],
                          [
                            {
                              firstName: "Jane",
                              lastName: "Doe",
                              email: "jane@example.com",
                              phoneNumber: "08012345678",
                              nin: "1234567890",
                              gender: "Female",
                              jobTitle: "Teacher",
                            },
                          ],
                          "staff-upload-template.csv"
                        )
                      }
                    >
                      Download Template <DownloadIcon size={16} strokeWidth={1} />
                    </Button>
                    <div className="flex flex-col md:flex-row gap-4">
                      <Button variant="outline" onClick={handleClose} disabled={false}>
                        Cancel
                      </Button>
                      <Button onClick={handleSubmit} disabled={parsedData.length === 0} loading={false}>
                        Submit Grades
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </Form>
          </LoadingContent>
        </DialogContent>
      </Dialog>
    </>
  );
}
