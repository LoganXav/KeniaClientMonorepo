"use client";

import React from "react";
import { PlusCircle } from "lucide-react";
import useToggle from "@/hooks/use-toggle";
import { Badge, Button, Card, Typography } from "@repo/ui";
import { RolesAndPermissionsCreateDialog } from "./roles-and-permissions-create-dialog";

export function RolesAndPermissionsList() {
  const [open, toggle] = useToggle(false);
  const [isViewMode, setIsViewMode] = React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState<(typeof mockRoles)[0] | null>(null);

  const mockRoles = [
    {
      name: "School Administrator",
      scope: "Organization",
      description: "Full administrative access to staff, students, grading, finance, and reports.",
      staffCount: 2,
    },
    {
      name: "Academic Officer",
      scope: "Academic",
      description: "Can manage timetable, calendar, grading structure, and student academic records.",
      staffCount: 1,
    },
    {
      name: "Teacher",
      scope: "Classroom",
      description: "Can manage assigned subjects, submit grades, and view class attendance.",
      staffCount: 12,
    },
    {
      name: "Bursar",
      scope: "Finance",
      description: "Manages school fees, billing, and financial reports.",
      staffCount: 1,
    },
    {
      name: "Principal",
      scope: "Executive",
      description: "Has read access to academic and financial reports, and oversees staff activities.",
      staffCount: 1,
    },
    {
      name: "ICT/Developer Admin",
      scope: "System",
      description: "Manages platform setup, roles, permissions, and technical integrations.",
      staffCount: 1,
    },
  ];

  const handleOpenDialog = (role?: (typeof mockRoles)[0], isView = false) => {
    setSelectedRole(role ?? null);
    setIsViewMode(isView);
    // Ensure we're running this after the dropdown's click event has completed
    setTimeout(() => {
      toggle();
    }, 0);
  };

  const handleCloseDialog = React.useCallback(() => {
    toggle();

    setTimeout(() => {}, 200);
  }, [toggle]);

  return (
    <>
      <div className="grid sm:grid-cols-2 2xl:grid-cols-3 gap-4">
        {mockRoles.map((role, idx) => (
          <Card key={idx} className="space-y-4 p-6">
            <div className="flex justify-between flex-col sm:flex-row">
              <div>
                <Typography size={"h5"} className="font-heading">
                  {role.name}
                </Typography>
                <Typography color={"muted"}>Scope: {role.scope}</Typography>
              </div>
              <Badge className="h-fit w-fit mt-2" variant={"outline"}>
                {role.staffCount} Staff{role.staffCount > 1 ? "s" : ""}
              </Badge>
            </div>
            <Typography>{role.description}</Typography>
            <div className="flex flex-col md:flex-row gap-2 items-center justify-between">
              <Button className="w-full md:w-auto" size={"sm"} variant={"outline"} onClick={() => handleOpenDialog(role, true)}>
                View Info
              </Button>

              <Button className="w-full md:w-auto" size={"sm"} onClick={() => handleOpenDialog(role, false)}>
                Add New Staff
              </Button>
            </div>
          </Card>
        ))}
        <Card className="group p-6">
          <div onClick={() => handleOpenDialog(undefined, false)} className="flex flex-col justify-center items-center border border-dashed gap-2 rounded-md p-6 h-full group-hover:border-foreground group-hover:cursor-pointer transition-border duration-100">
            <PlusCircle strokeWidth={1} className="text-muted-foreground group-hover:text-foreground transition-border duration-100" />
            <Typography className="text-muted-foreground group-hover:text-foreground transition-border duration-100">Create a new role</Typography>
          </div>
        </Card>
      </div>

      <RolesAndPermissionsCreateDialog open={open} onClose={handleCloseDialog} role={selectedRole ?? undefined} isView={isViewMode} />
    </>
  );
}
