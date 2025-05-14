"use client";

import { getAuthUserAction } from "@/helpers/server/auth-user-action";
import { PermissionType } from "@/types";
import React, { createContext, useContext, useState, useEffect } from "react";

interface PermissionContextType {
  permissions: PermissionType[];
  hasPermission: (permissionName: string) => boolean;
  hasAnyPermission: (permissionNames: string[]) => boolean;
  hasAllPermissions: (permissionNames: string[]) => boolean;
  setPermissions: (permissions: PermissionType[]) => void;
}

const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

export const PermissionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [permissions, setPermissions] = useState<PermissionType[]>([]);

  useEffect(() => {
    const fetchPermissions = async () => {
      const authUser = await getAuthUserAction();

      if (authUser?.data?.staff?.role?.permissions) {
        setPermissions(authUser.data.staff.role.permissions);
      }
    };

    fetchPermissions();
  }, []);

  const hasPermission = (permissionName: string): boolean => {
    return permissions.some((permission) => permission.name === permissionName);
  };

  const hasAnyPermission = (permissionNames: string[]): boolean => {
    return permissionNames.some((permissionName) => hasPermission(permissionName));
  };

  const hasAllPermissions = (permissionNames: string[]): boolean => {
    return permissionNames.every((permissionName) => hasPermission(permissionName));
  };

  return (
    <PermissionContext.Provider
      value={{
        permissions,
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
        setPermissions,
      }}
    >
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermissions = () => {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error("usePermissions must be used within a PermissionProvider");
  }
  return context;
};
