"use client";

import React, { useState } from "react";
import { DownloadIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { downloadCsvTemplate } from "@/lib/templates";
import { StaffBulkType } from "../_types/staff-create-form-types";
import { CsvDropzone } from "@/components/file-upload/csv-dropzone";
import { useStaffBulkCreateMutation } from "@/apis/core-staff-api/staff";
import { Dialog, DialogContent, DialogTitle, Typography, Button, toast } from "@repo/ui";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  tenantId?: number;
}

export function StaffCreateBulkImportDialog({ open, onClose, tenantId }: DialogProps) {
  const [parsedData, setParsedData] = useState<StaffBulkType[]>([]);

  const { staffBulkCreate, staffBulkCreatePending, staffBulkCreateError } = useStaffBulkCreateMutation({ params: { tenantId } });
  const columns = React.useMemo<ColumnDef<any, unknown>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
        cell: ({ row }) => `${row.original.firstName} ${row.original.lastName}`,
      },
      {
        header: "Email",
        accessorKey: "email",
      },
    ],
    []
  );

  const handleClose = () => {
    onClose();
    setParsedData([]);
  };

  const handleParsed = (rows: StaffBulkType[]) => {
    setParsedData(rows);
  };

  const handleSubmit = () => {
    staffBulkCreate(
      {
        payload: {
          staffs: parsedData,
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
            Bulk Import Staff
          </Typography>
        </DialogTitle>

        <div className="space-y-4">
          <CsvDropzone<StaffBulkType> onParsed={handleParsed} expectedHeaders={["firstName", "lastName", "email", "phoneNumber", "gender", "nin", "jobTitle"]} />

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
              <Button variant="outline" onClick={handleClose} disabled={staffBulkCreatePending}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={parsedData.length === 0} loading={staffBulkCreatePending}>
                Import Staff
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
