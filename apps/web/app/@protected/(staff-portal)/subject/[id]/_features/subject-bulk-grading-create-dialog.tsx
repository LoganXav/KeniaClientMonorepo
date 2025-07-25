"use client";

import React from "react";
import { DownloadIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { downloadCsvTemplate } from "@/lib/templates";
import { CsvDropzone } from "@/components/file-upload/csv-dropzone";
import { StudentBulkRow } from "../_types/subject-grading-form-types";
import { SubjectGradingStructureQueryResultType } from "../_types/subject-grading-structure-form-types";
import { useGetSubjectGradingTemplateQuery, useSubjectGradingBulkCreateMutation } from "@/apis/core-subject-api/subject-grading";
import { Dialog, DialogContent, DialogTitle, Button, Typography, toast, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@repo/ui";

interface DialogProps {
  open: boolean;
  classId?: number;
  subjectId: number;
  tenantId?: number;
  onClose: () => void;
  subjectGradingStructureQueryResult: SubjectGradingStructureQueryResultType;
}

export function SubjectBulkGradingCreateDialog({ open, onClose, subjectId, classId, tenantId, subjectGradingStructureQueryResult }: DialogProps) {
  const [termId, setTermId] = React.useState(0);
  const [calendarId, setCalendarId] = React.useState(0);
  const [parsedData, setParsedData] = React.useState<StudentBulkRow[]>([]);
  const structureQuery = subjectGradingStructureQueryResult?.data?.data;

  // Template for generating CSV headers
  const gradingTemplateQueryResult = useGetSubjectGradingTemplateQuery(
    React.useMemo(
      () => ({
        params: {
          calendarId,
          classId,
          tenantId,
          subjectId,
        },
      }),
      [calendarId, classId, tenantId, subjectId]
    )
  );
  const gradingTemplate = gradingTemplateQueryResult.data?.data;

  // Compute dynamic columns from existing grades
  const dynamicColumns = React.useMemo<ColumnDef<any>[]>(() => {
    if (!parsedData || parsedData.length === 0) return [];

    const caNames = structureQuery?.continuousAssessmentBreakdownItems?.map((i) => i.name) ?? [];

    return caNames.map((name) => ({
      header: name,
      accessorKey: name,
      cell: ({ row }) => {
        return <p>{row.original[name] ?? "-"}</p>;
      },
    }));
  }, [parsedData, structureQuery]);

  // Base columns: student info + dynamic CA + exam and total
  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: "Admission Number",
        accessorKey: "admissionNo",
      },
      {
        header: "Exam Score",
        accessorKey: "examScore",
      },
      ...dynamicColumns,
    ],
    [dynamicColumns]
  );

  // Bulk create mutation
  const { subjectBulkGradingCreate, subjectBulkGradingCreatePending } = useSubjectGradingBulkCreateMutation({ params: { tenantId } });

  const handleParsed = (rows: StudentBulkRow[]) => setParsedData(rows);

  const handleClose = () => {
    setParsedData([]);
    onClose();
  };

  const handleSubmit = () => {
    parsedData.forEach((record) => {
      Object.keys(record).forEach((field: string) => {
        if (field !== "admissionNo") {
          record[field] = Number(record[field]);
        }
      });
    });

    const grades = parsedData.map((raw) => {
      return {
        admissionNo: raw.admissionNo as string,
        examScore: Number(raw.examScore),
        continuousAssessmentScores:
          structureQuery?.continuousAssessmentBreakdownItems?.map((ca) => ({
            name: ca.name,
            score: Number(raw[ca.name] ?? 0),
          })) ?? [],
      };
    });

    subjectBulkGradingCreate(
      {
        payload: {
          grades,
          termId,
          classId,
          subjectId,
          calendarId,
        },
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

  return (
    <Dialog open={open} onOpenChange={(isOpen) => isOpen || handleClose()}>
      <DialogContent className="max-w-2xl">
        <DialogTitle>
          <Typography size="h4" className="font-heading">
            Bulk Import Subject Grades
          </Typography>
        </DialogTitle>
        <div className="grid md:grid-cols-2 gap-4 w-full md:w-auto">
          <Select value={String(calendarId || "")} onValueChange={(value) => setCalendarId(Number(value))} disabled={gradingTemplateQueryResult?.isLoading}>
            <SelectTrigger className="">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              {gradingTemplate?.calendarOptions?.map((item, idx: number) => (
                <SelectItem key={idx} value={String(item.id)}>
                  {item.year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={String(termId || "")} onValueChange={(value) => setTermId(Number(value))} disabled={gradingTemplateQueryResult?.isLoading || !calendarId}>
            <SelectTrigger>
              <SelectValue placeholder="Term" />
            </SelectTrigger>
            <SelectContent>
              {gradingTemplate?.termOptions?.map((termOption, idx) => (
                <SelectItem key={idx} value={String(termOption?.id)}>
                  {termOption?.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <CsvDropzone<StudentBulkRow> onParsed={handleParsed} expectedHeaders={["admissionNo", "examScore", ...(structureQuery?.continuousAssessmentBreakdownItems?.map((i) => i.name) ?? [])]} disabled={!termId} />

          <div className="max-w-[20rem] sm:max-w-full space-y-4 mx-auto">
            {parsedData.length > 0 && (
              <>
                <Typography size="small" className="uppercase font-heading">
                  Upload Preview :
                </Typography>
                <div className="relative overflow-x-auto rounded-md border text-sm max-w-2xl">
                  <DataTable data={parsedData.slice(0, 5)} columns={columns} showPagination={false} />
                </div>
                <Typography color={"muted"} size={"small"} className="mt-2 italic">
                  Showing first 5 rows. Total rows ({parsedData.length})
                </Typography>
              </>
            )}
          </div>

          <div className="flex flex-col lg:flex-row justify-between pt-4 gap-4">
            <Button
              variant="outline"
              onClick={() => {
                const headers = ["admissionNo", "examScore", ...(structureQuery?.continuousAssessmentBreakdownItems?.map((i) => i.name) ?? [])];
                downloadCsvTemplate(headers, [], "subject-grading-upload-template.csv");
              }}
            >
              Download Template <DownloadIcon size={16} strokeWidth={1} />
            </Button>
            <div className="flex flex-col lg:flex-row gap-4">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={parsedData.length === 0} loading={subjectBulkGradingCreatePending}>
                Submit Grades
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
