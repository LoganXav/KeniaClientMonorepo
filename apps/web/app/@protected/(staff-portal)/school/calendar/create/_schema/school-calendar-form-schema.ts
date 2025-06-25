import { z } from "zod";

// Shared date validator for cross-field date comparison
const BreakweekSchema = z
  .object({
    name: z.string({ required_error: "Break period name is required" }).min(1, "Break period name cannot be empty"),
    startDate: z.string({ required_error: "Break period start date is required" }).min(1, "Break period start date cannot be empty"),
    endDate: z.string({ required_error: "Break period end date is required" }).min(1, "Break period end date cannot be empty"),
  })
  .refine((data) => new Date(data.startDate) <= new Date(data.endDate), {
    message: "Break period start date cannot be after end date",
    path: ["startDate"],
  });

export const SchoolCalendarFormSchema = z.object({
  year: z.union([z.string({ required_error: "Session is required" }).min(1, "Session cannot be empty"), z.number({ invalid_type_error: "Session must be a string or number" })]),
  terms: z.array(
    z
      .object({
        name: z.string({ required_error: "Term name is required" }).min(1, "Term name cannot be empty"),
        startDate: z.string({ required_error: "Term start date is required" }).min(1, "Start date cannot be empty"),
        endDate: z.string({ required_error: "Term end date is required" }).min(1, "End date cannot be empty"),
        breakWeeks: z.array(BreakweekSchema, { invalid_type_error: "Break weeks must be an array" }),
      })
      .refine((term) => new Date(term.startDate) <= new Date(term.endDate), {
        message: "Term start date cannot be after end date",
        path: ["startDate"],
      })
  ),
});
