import { PermissionType } from "@/types";

export const hasPermission = (permissions: PermissionType[], permissionName: string) => {
  return permissions?.some((permission) => permission.name === permissionName);
};

export const hasAllPermissions = (permissions: PermissionType[], permissionNames: string[]) => {
  // return permissionNames.every((permissionName) => hasPermission(permissions, permissionName));
  return true;
};

export const hasAnyPermission = (permissions: PermissionType[], permissionNames: string[]): boolean => {
  return permissionNames.some((permissionName) => hasPermission(permissions, permissionName));
};
