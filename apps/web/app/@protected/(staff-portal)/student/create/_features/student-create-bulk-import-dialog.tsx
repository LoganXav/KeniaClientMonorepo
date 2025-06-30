"use client";

import React, { useState } from "react";
import { DownloadIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { downloadCsvTemplate } from "@/lib/templates";
import { CsvDropzone } from "@/components/file-upload/csv-dropzone";
import { StudentBulkType } from "../_types/student-create-form-types";
import { useStudentBulkCreateMutation } from "@/apis/core-student-api/student";
import { Dialog, DialogContent, DialogTitle, Typography, Button, toast } from "@repo/ui";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  tenantId?: number;
}

export function StudentCreateBulkImportDialog({ open, onClose, tenantId }: DialogProps) {
  const [parsedData, setParsedData] = useState<StudentBulkType[]>([]);

  const { studentBulkCreate, studentBulkCreatePending, studentBulkCreateError } = useStudentBulkCreateMutation({ params: { tenantId } });
  const columns = React.useMemo<ColumnDef<any, unknown>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
        cell: ({ row }) => `${row.original.firstName} ${row.original.lastName}`,
      },
      {
        header: "Enrolled Class",
        accessorKey: "class",
        cell: ({ row }) => `${row.original.class} (${row.original.classDivision})`,
      },
    ],
    []
  );

  const handleClose = () => {
    onClose();
    setParsedData([]);
  };

  const handleParsed = (rows: StudentBulkType[]) => {
    setParsedData(rows);
  };

  const handleSubmit = () => {
    studentBulkCreate(
      {
        payload: {
          students: parsedData,
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
            Bulk Import Students
          </Typography>
        </DialogTitle>

        <div className="space-y-4">
          <CsvDropzone<StudentBulkType> onParsed={handleParsed} expectedHeaders={["firstName", "lastName", "gender", "class", "classDivision", "email"]} />

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

          <div className="flex flex-col md:flex-row justify-between gap-4 pt-4">
            <Button
              variant="outline"
              onClick={() =>
                downloadCsvTemplate(
                  ["firstName", "lastName", "gender", "class", "classDivision", "email"],
                  [
                    {
                      firstName: "John",
                      lastName: "Doe",
                      email: "johndoe@email.com",
                      gender: "Male",
                      class: "JSS2",
                      classDivision: "Red",
                    },
                  ],
                  "student-upload-template.csv"
                )
              }
            >
              Download Template <DownloadIcon size={16} strokeWidth={1} />
            </Button>
            <div className="flex flex-col md:flex-row gap-4">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={parsedData.length === 0}>
                Import Students
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
