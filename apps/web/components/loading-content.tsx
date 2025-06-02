"use client";

import React from "react";
import { Loader } from "./loader";
import { Button, toast, Typography } from "@repo/ui";
import { CircleX } from "lucide-react";

interface LoadingContentProps {
  children: React.ReactNode;
  data?: any;
  loading?: boolean;
  error?: Error | null;
  retry?: () => Promise<any>;
  shouldLoad?: boolean;
}

export const LoadingContent: React.FC<LoadingContentProps> = ({ children, data = [], loading = false, error = null, retry = () => Promise.resolve(), shouldLoad = true }) => {
  React.useEffect(() => {
    if (shouldLoad && error) {
      toast.error(error?.message || "Something went wrong.");
    }
  }, [error, shouldLoad]);

  if (loading)
    return (
      <div className="w-full h-full flex justify-center items-center p-8">
        <Loader />
      </div>
    );

  if (shouldLoad && (error || (!loading && !data))) {
    return (
      <div className="flex flex-col items-center justify-center p-8 gap-4">
        <div className="flex flex-col items-center space-y-2">
          <CircleX size={40} />
          <Typography size={"p"}>{error?.message || "Something went wrong."}</Typography>
        </div>
        <div className="grid md:grid-cols-2 gap-4 w-full md:w-auto">
          <Button variant={"outline"} onClick={() => toast.info("Feature not implemented yet!.")}>
            Send Report
          </Button>
          <Button disabled={loading} onClick={retry}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
