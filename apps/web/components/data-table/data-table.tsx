"use client";
import * as React from "react";
import { TableRoot, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/ui";
import { flexRender, useReactTable, type ColumnDef, getCoreRowModel, getPaginationRowModel, getSortedRowModel, SortingState } from "@tanstack/react-table";
import { DataTablePagination } from "./data-table-pagination";

interface TableProps<TData, TValue> {
  data: any;
  showPagination?: boolean;
  columns: ColumnDef<TData, TValue>[];
  props?: any;
}

export function DataTable<TData, TValue>({ data, columns, showPagination = true, props }: TableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data: data || [], // Ensure data is not undefined or null
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    ...props,
  });

  return (
    <>
      <TableRoot>
        <TableHeader>
          {table?.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table?.getRowModel()?.rows?.length > 0 ? ( // Updated check here
            table?.getRowModel()?.rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No data.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </TableRoot>
      {showPagination && <DataTablePagination table={table} />}
    </>
  );
}
