"use client";

import React from "react";
import { StudentType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { Button, Dialog, DialogContent, DialogTitle, Typography } from "@repo/ui";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  student?: StudentType;
}

export default function ClassTermResultCollationGradesDialog({ onClose, open, student }: DialogProps) {
  const handleClose = () => {
    onClose();
  };

  // Prepare one row of data mapping each subject to its grade
  const rowData = React.useMemo(() => {
    if (!student?.subjectGrades) return [];

    const data: Record<string, any> = {};

    for (const grade of student.subjectGrades) {
      data[`grade_${grade?.subject?.name}`] = {
        grade: grade?.grade,
        totalScore: grade?.totalScore,
      };
    }

    return [data]; // One row object
  }, [student?.subjectGrades]);

  // Generate dynamic columns based on the subject names
  const dynamicColumns = React.useMemo<ColumnDef<any, unknown>[]>(() => {
    if (!student?.subjectGrades?.length) return [];

    const subjectNames = Array.from(new Set(student.subjectGrades.map((g) => g?.subject?.name)));

    return subjectNames.map((subjectName) => ({
      header: subjectName,
      accessorKey: `grade_${subjectName}`,
      cell: ({ getValue }) => {
        const value = getValue() as { grade: string; totalScore: number } | undefined;
        return value ? (
          <div className="flex space-x-2">
            <span>{value.grade}</span>
            <span>({value.totalScore})</span>
          </div>
        ) : (
          <span>–</span>
        );
      },
    }));
  }, [student?.subjectGrades]);

  const columns = React.useMemo<ColumnDef<any, unknown>[]>(() => [...dynamicColumns], [dynamicColumns]);

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
            {student?.user?.lastName} {student?.user?.firstName} - Term Result Grades
          </Typography>
        </DialogTitle>

        <div className="relative overflow-x-auto rounded-md border text-sm max-w-2xl">
          <DataTable data={rowData} columns={columns} showPagination={false} />
        </div>

        <Button variant="outline" onClick={handleClose}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}
