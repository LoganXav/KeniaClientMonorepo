import { z } from "zod";

export const SubjectCreateFormSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(1),
  description: z.string({ required_error: "Description is required" }).min(1),
  classId: z.union([z.number({ required_error: "Class ID is required", invalid_type_error: "Class ID must be a number" }).min(1), z.string()]),
  staffIds: z.array(z.number({ required_error: "Subject Teacher IDs are required", invalid_type_error: "Subject Teacher IDs must be a number" })).min(1),
});
