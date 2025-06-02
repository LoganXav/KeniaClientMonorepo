"use client";

import React from "react";
import { Card } from "@repo/ui";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { LoadingContent } from "@/components/loading-content";

export function SubjectDetailsStudentsTab({ subjectId }: { subjectId: number }) {
  const columns = React.useMemo<ColumnDef<any, unknown>[]>(
    () => [
      {
        header: "Student Name",
        accessorKey: "name",
      },

      {
        header: "Age",
        accessorKey: "age",
      },
    ],
    []
  );

  return (
    <>
      <Card className="overflow-hidden mt-8">
        <LoadingContent>
          <DataTable data={[]} columns={columns} />
        </LoadingContent>
      </Card>
    </>
  );
}
