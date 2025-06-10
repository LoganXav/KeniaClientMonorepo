"use client";

import React from "react";
import { Dialog, DialogContent, DialogTitle, Typography } from "@repo/ui";

interface DialogProps {
  open: boolean;
  isView?: boolean;
  onClose: () => void;
  role?: {
    name: string;
    scope: string;
    description: string;
    staffCount: number;
  };
}
export function RolesAndPermissionsCreateDialog({ open, onClose, isView = false, role }: DialogProps) {
  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            handleClose();
          }
        }}
      >
        <DialogContent
          className="max-w-2xl"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogTitle>
            <Typography size="h4" className="font-heading">
              {isView ? "View Role" : role ? "Edit Role" : "Create Role"}
            </Typography>
          </DialogTitle>
        </DialogContent>
      </Dialog>
    </>
  );
}
