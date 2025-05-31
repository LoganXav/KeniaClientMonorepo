import { GetRequestReturnType } from "@/config/base-query";
import { RefetchOptions } from "@tanstack/react-query";

export type SubjectGradingTemplateOptions =
  | {
      data:
        | GetRequestReturnType<{
            classOptions: { id: number; name: string }[];
            classDivisionOptions: { id: number; name: string }[];
            calendarOptions: { id: number; year: string }[];
            termOptions: { id: number; name: string; startDate: string; endDate: string; tenantId: number }[];
          }>
        | undefined;
      isLoading: boolean;
      error: Error | null;
      refetch: (options?: RefetchOptions) => Promise<any>;
    }
  | undefined;
