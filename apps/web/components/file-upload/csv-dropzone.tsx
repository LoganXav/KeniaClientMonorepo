"use client";

import Papa from "papaparse";
import { FileDown, X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import React, { useCallback, useState } from "react";
import { toast, Typography, Button } from "@repo/ui";

interface CsvDropzoneProps<T extends object> {
  onParsed: (data: T[]) => void;
  expectedHeaders?: string[];
  disabled?: boolean;
}

export const CsvDropzone = <T extends object>({ onParsed, expectedHeaders, disabled = false }: CsvDropzoneProps<T>) => {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const dropped = acceptedFiles[0];
      if (!dropped) return;
      setFile(dropped);

      Papa.parse<T>(dropped, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const rows = results.data;

          if (expectedHeaders && expectedHeaders.length > 0) {
            const headersInFile = results.meta.fields ?? [];
            const missing = expectedHeaders.filter((h) => !headersInFile.includes(h));
            if (missing.length > 0) {
              toast.error(`Missing headers: ${missing.join(", ")}`);
              setFile(null);
              return;
            }
          }

          onParsed(rows);
        },
        error: (err) => {
          toast.error(`Error parsing CSV: ${err.message}`);
          setFile(null);
        },
      });
    },
    [onParsed, expectedHeaders]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] },
    multiple: false,
    disabled: !!file || disabled,
  });

  const handleRemove = () => {
    setFile(null);
    onParsed([]);
  };

  return (
    <div className="w-full">
      {!file ? (
        <div {...getRootProps()} className={`w-full p-4 h-40 border border-border border-dashed rounded-md flex flex-col items-center justify-center transition ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-accent"}`}>
          <input {...getInputProps()} />
          <div className="flex flex-col items-center space-y-2 text-center">
            <FileDown size={40} />
            <Typography>{isDragActive ? "Drop your CSV here..." : disabled ? "Please select the options first" : "Drag & drop a CSV file here, or click to select one"}</Typography>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 border rounded-md bg-accent/20">
          <div className="flex items-center space-x-2">
            <FileDown size={24} />
            <Typography>{file.name}</Typography>
          </div>
          <Button variant="ghost" size="sm" onClick={handleRemove} className="p-1">
            <X size={16} strokeWidth={1} />
          </Button>
        </div>
      )}
    </div>
  );
};
