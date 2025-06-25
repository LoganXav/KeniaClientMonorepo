"use client";

import { PermissionType } from "@/types";
import { getAuthUserAction } from "@/helpers/server/auth-user-action";
import React, { createContext, useContext, useState, useEffect } from "react";
import { hasPermission as _hasPermission, hasAnyPermission as _hasAnyPermission, hasAllPermissions as _hasAllPermissions } from "@/lib/permissions";

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

  return (
    <PermissionContext.Provider
      value={{
        permissions,
        setPermissions,
        hasPermission: (permissionName) => _hasPermission(permissions, permissionName),
        hasAnyPermission: (permissionNames) => _hasAnyPermission(permissions, permissionNames),
        hasAllPermissions: (permissionNames) => _hasAllPermissions(permissions, permissionNames),
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
