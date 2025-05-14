"use client";

import React from "react";
import { usePermissions } from "@/providers/permission-provider";

interface PermissionRestrictorProps {
  children: React.ReactNode;
  requiredPermissions: string | string[];
  requireAll?: boolean;
}

export const PermissionRestrictor: React.FC<PermissionRestrictorProps> = ({ children, requiredPermissions, requireAll = false }) => {
  const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermissions();

  let hasAccess = false;

  if (typeof requiredPermissions === "string") {
    hasAccess = hasPermission(requiredPermissions);
  } else if (requireAll) {
    hasAccess = hasAllPermissions(requiredPermissions);
  } else {
    hasAccess = hasAnyPermission(requiredPermissions);
  }

  if (!hasAccess) {
    return <></>;
  }

  return <>{children}</>;
};
