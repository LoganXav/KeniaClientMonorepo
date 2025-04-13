"use client";

import { Button, Card, CardDescription, CardTitle, cn, toast } from "@repo/ui";
import { Image, X } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";

export function FileUpload({ field, placeholder = "Upload file", className }: { field: any; placeholder?: string; className?: string }) {
  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.size > 10 * 1024 * 1024) {
      // larger than 10mb!
      toast.error("File size must be less than 10MB");
      return;
    }
    field.onChange(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop,
  });

  return (
    <div className="">
      {field.value ? (
        <Card className="relative p-2 border-border focus:border-foreground">
          <Button className="absolute top-2 right-3.5 p-1 h-5 w-5 rounded-full" size="icon" onClick={() => field.onChange(null)}>
            <X className="size-4" aria-hidden="true" />
          </Button>
          <div className="flex items-center space-x-2">
            <div className="shrink-0">
              <Image strokeWidth={1} className="h-8 w-8 text-foreground" aria-hidden="true" />
            </div>
            <div>
              <CardTitle className="text-base font-normal">{field.value.name}</CardTitle>
              <CardDescription className="text-sm text-foreground">{(field.value.size / 1024 / 1024).toFixed(2)} MB</CardDescription>
            </div>
          </div>
        </Card>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            "group relative bg-card grid h-full w-full cursor-pointer place-items-center rounded-lg border border-border px-2 py-2.5 text-center transition hover:bg-muted/25",
            "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            isDragActive && "border-muted-foreground/50"
          )}
        >
          <input {...getInputProps()} />
          <Card className={cn("flex w-full space-x-2 bg-transparent border-none items-center", className)}>
            <Image strokeWidth={1} className="size-8 text-muted-foreground" aria-hidden="true" />
            <div className="flex flex-col items-start text-start">
              <CardTitle className="text-muted-foreground font-normal text-base">{placeholder}</CardTitle>
              <CardDescription className="text-sm">Click or drag and drop to upload a file (max 10MB)</CardDescription>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
