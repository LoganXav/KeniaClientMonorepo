import { z } from "zod";

export const SchoolTimetableFormSchema = z.object({
  id: z.number({ required_error: "Please provide a timetable ID", invalid_type_error: "Timetable ID must be a number" }).nonnegative("Timetable ID must be 0 or greater").optional(),
  day: z.string().min(1, "Day cannot be empty"),
  calendarId: z.union([z.string().min(1, "Please select a calendar year"), z.number()]),
  termId: z.union([z.number({ required_error: "Please select a term" }), z.string()]),
  classId: z.union([z.number({ required_error: "Please select a class" }), z.string()]),
  classDivisionId: z.union([z.number({ required_error: "Please select a class division" }), z.string().min(1, "Please select a class division")]),
  tenantId: z.number({ required_error: "Tenant ID is required" }),

  periods: z
    .array(
      z
        .object({
          startTime: z.union([z.date({ required_error: "Period start time is required" }), z.string().min(1, "Period start time is required")]),
          endTime: z.union([z.date({ required_error: "Period end time is required" }), z.string().min(1, "Period end time is required")]),
          subjectId: z.union([z.number(), z.string()]).optional(),
          isBreak: z.boolean({
            required_error: "Please indicate if this is a break period",
            invalid_type_error: "isBreak must be true or false",
          }),
          breakType: z.union([z.string(), z.null()]).optional(),
        })
        .refine(
          (data) => {
            if (!data.startTime || !data.endTime) return true;
            const start = new Date(data.startTime);
            const end = new Date(data.endTime);
            return start < end;
          },
          {
            message: "Start time must be before the end time",
            path: ["startTime"],
          }
        )
        .refine(
          (data) => {
            if (data.isBreak) {
              return typeof data.breakType === "string" && data.breakType.trim().length > 0;
            }
            return true;
          },
          {
            message: "Please specify a break type",
            path: ["breakType"],
          }
        )
        .refine(
          (data) => {
            if (!data.isBreak) {
              if (typeof data.subjectId === "string") {
                return data.subjectId.trim().length > 0;
              }
              return typeof data.subjectId === "number";
            }
            return true;
          },
          {
            message: "Please select a subject",
            path: ["subjectId"],
          }
        )
    )
    .min(1, "Please provide at least one period"),
});
