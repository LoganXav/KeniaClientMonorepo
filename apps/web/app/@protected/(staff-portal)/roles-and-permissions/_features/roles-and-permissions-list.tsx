"use client";

import React from "react";
import { RoleType } from "@/types";
import { PlusCircle } from "lucide-react";
import useToggle from "@/hooks/use-toggle";
import { useAuthUser } from "@/hooks/use-auth-user";
import { Badge, Button, Card, Typography } from "@repo/ui";
import { LoadingContent } from "@/components/loading-content";
import { useGetRoleListQuery } from "@/apis/core-role-api/role";
import { PermissionRestrictor } from "@/components/permission-restrictor";
import { PERMISSIONS } from "@/constants/permissions/permission-constants";
import { RolesAndPermissionsCreateDialog } from "./roles-and-permissions-create-dialog";

export function RolesAndPermissionsList() {
  const { authUserIds } = useAuthUser();
  const [open, toggle] = useToggle(false);
  const [isViewMode, setIsViewMode] = React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState<RoleType | null>(null);

  const roleListQueryResult = useGetRoleListQuery({
    params: { tenantId: authUserIds?.tenantId },
  });

  const roleList = roleListQueryResult?.data?.data;

  const handleOpenDialog = (role?: RoleType, isView = false) => {
    setSelectedRole(role ?? null);
    setIsViewMode(isView);
    // Ensure we're running this after the dropdown's click event has completed
    setTimeout(() => {
      toggle();
    }, 0);
  };

  const handleCloseDialog = React.useCallback(() => {
    toggle();
    setSelectedRole(null);
    setTimeout(() => {}, 200);
  }, [toggle]);

  return (
    <>
      <LoadingContent
        loading={roleListQueryResult?.isLoading}
        data={roleListQueryResult?.data}
        error={roleListQueryResult?.error}
        retry={roleListQueryResult?.refetch}
      >
        <div className="grid sm:grid-cols-2 2xl:grid-cols-3 gap-4">
          {roleList?.map((role, idx) => (
            <Card
              key={idx}
              className="space-y-4 p-6 justify-between flex flex-col"
            >
              <div className="flex justify-between flex-col sm:flex-row">
                <div>
                  <Typography size={"h5"} className="font-heading">
                    {role?.name}
                  </Typography>
                  {/* <Typography color={"muted"}>Scope: {role?.scope}</Typography> */}
                </div>
                <Badge className="h-fit w-fit mt-2" variant={"outline"}>
                  {role?.staff.length} Staff{role?.staff.length > 1 ? "s" : ""}
                </Badge>
              </div>
              <Typography>{role?.description}</Typography>
              <div className="flex flex-col md:flex-row gap-2 items-center justify-between">
                <Button
                  className="w-full md:w-auto"
                  size={"sm"}
                  variant={"outline"}
                  onClick={() => handleOpenDialog(role, true)}
                >
                  View Info
                </Button>
                <PermissionRestrictor
                  requiredPermissions={[PERMISSIONS.ROLE.UPDATE]}
                >
                  {!role.isAdmin && (
                    <Button
                      className="w-full md:w-auto"
                      size={"sm"}
                      onClick={() => handleOpenDialog(role, false)}
                    >
                      Edit Role
                    </Button>
                  )}
                </PermissionRestrictor>
              </div>
            </Card>
          ))}
          <PermissionRestrictor requiredPermissions={[PERMISSIONS.ROLE.CREATE]}>
            <Card className="group p-6">
              <div
                onClick={() => handleOpenDialog(undefined, false)}
                className="flex flex-col justify-center items-center border border-dashed gap-2 rounded-md p-6 h-full group-hover:border-primary group-hover:cursor-pointer transition-border duration-100"
              >
                <PlusCircle
                  strokeWidth={1}
                  className="text-muted-foreground group-hover:text-foreground transition-border duration-100"
                />
                <Typography className="text-muted-foreground group-hover:text-foreground transition-border duration-100">
                  Create a new role
                </Typography>
              </div>
            </Card>
          </PermissionRestrictor>
        </div>
      </LoadingContent>

      <RolesAndPermissionsCreateDialog
        open={open}
        onClose={handleCloseDialog}
        role={selectedRole ?? undefined}
        isView={isViewMode}
        tenantId={authUserIds?.tenantId}
      />
    </>
  );
}
