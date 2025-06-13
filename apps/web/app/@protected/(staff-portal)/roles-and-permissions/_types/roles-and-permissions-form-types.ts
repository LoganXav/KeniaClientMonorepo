import { z } from "zod";
import { RoleAndPermissionsCreateFormSchema } from "../_schema/roles-and-permission-form-schema";
import { GetRequestReturnType } from "@/config/base-query";
import { RefetchOptions } from "@tanstack/react-query";
import { PermissionType, StaffType } from "@/types";

export type RoleAndPermissionsCreateFormSchemaType = z.infer<typeof RoleAndPermissionsCreateFormSchema>;

export type RolesAndPermissionsTemplateOptions = { staffOptions: StaffType[]; permissionsOptions: PermissionType[]; scopeOptions: any };
