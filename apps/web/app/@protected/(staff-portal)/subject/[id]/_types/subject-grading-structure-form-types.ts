import { z } from "zod";
import { SubjectGradingStructureType } from "@/types";
import { RefetchOptions } from "@tanstack/react-query";
import { GetRequestReturnType } from "@/config/base-query";
import { SubjectGradingStructureCreateFormSchema } from "../_schema/subject-grading-structure-schema";

export type SubjectGradingStructureCreateFormSchemaType = z.infer<typeof SubjectGradingStructureCreateFormSchema>;

export type SubjectGradingStructureQueryResultType =
  | {
      data: GetRequestReturnType<SubjectGradingStructureType> | undefined;
      isLoading: boolean;
      error: Error | null;
      refetch: (options?: RefetchOptions) => Promise<any>;
    }
  | undefined;
