import { z } from "zod";

export const RoleAndPermissionsCreateFormSchema = z.object({
  name: z.string(),
  // scope: z.string(),
  description: z.string(),
  staffIds: z.array(z.number()),
  permissionIds: z.array(z.number()),
});
