import { z } from "zod";

export const StaffAssignFormSchema = z.object({
  id: z.union([z.number(), z.string()]),
  roleId: z.union([
    z
      .number({
        required_error: "Role ID is required",
        invalid_type_error: "Role ID must be a number",
      })
      .positive("Role ID must be a positive number"),
    z.string(),
  ]),

  subjectIds: z.array(z.number().int("Subject ID must be an integer")).optional(),
  classDivisionIds: z.array(z.number().int("Class ID must be an integer")).optional(),
});
