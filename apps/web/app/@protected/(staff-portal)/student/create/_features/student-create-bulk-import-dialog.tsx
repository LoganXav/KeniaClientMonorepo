"use client";

import React, { useState } from "react";
import { DownloadIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { CsvDropzone } from "@/components/file-upload/csv-dropzone";
import { StudentCreateFormSchemaType } from "../_types/student-create-form-types";
import { Dialog, DialogContent, DialogTitle, Typography, Button } from "@repo/ui";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  tenantId?: number;
}

export function StudentCreateBulkImportDialog({ open, onClose, tenantId }: DialogProps) {
  const [parsedData, setParsedData] = useState<StudentCreateFormSchemaType[]>([]);

  const columns = React.useMemo<ColumnDef<any, unknown>[]>(
    () => [
      {
        header: "Industry",
        accessorKey: "Industry",
      },
    ],
    []
  );

  const handleClose = () => {
    onClose();
    setParsedData([]);
  };

  const handleParsed = (rows: StudentCreateFormSchemaType[]) => {
    setParsedData(rows);
  };

  const handleSubmit = () => {
    // You can now send parsedData to your backend
    handleClose();
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
          <CsvDropzone<StudentCreateFormSchemaType> onParsed={handleParsed} expectedHeaders={[]} />

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
            <Button variant="outline" onClick={() => null}>
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
