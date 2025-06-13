"use client";

import React from "react";
import { RoleType } from "@/types";
import { useForm } from "react-hook-form";
import useDataRef from "@/hooks/use-data-ref";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingContent } from "@/components/loading-content";
import { RoleAndPermissionsCreateFormSchema } from "../_schema/roles-and-permission-form-schema";
import { RoleAndPermissionsCreateFormSchemaType } from "../_types/roles-and-permissions-form-types";
import { useGetRoleTemplateQuery, useRoleCreateMutation, useRoleUpdateMutation } from "@/apis/core-role-api/role";
import { Button, cn, Dialog, DialogContent, DialogTitle, Form, FormControl, FormField, FormItem, FormMessage, Input, MultiSelect, Textarea, toast, Typography } from "@repo/ui";

interface DialogProps {
  open: boolean;
  isView?: boolean;
  onClose: () => void;
  role?: RoleType;
  tenantId?: number;
}
export function RolesAndPermissionsCreateDialog({ open, onClose, isView = false, role, tenantId }: DialogProps) {
  const isEdit = !!role?.id;

  const roleTemplateQueryResult = useGetRoleTemplateQuery(React.useMemo(() => ({ params: { tenantId } }), [tenantId]));
  const roleTemplate = roleTemplateQueryResult?.data?.data;

  const staffOptions =
    roleTemplate?.staffOptions?.map((staff: Record<string, any>) => ({
      name: `${staff?.user?.firstName} ${staff?.user?.lastName}`,
      id: staff?.id,
    })) || [];

  const permissionOptions =
    roleTemplate?.permissionsOptions?.map((permission: Record<string, any>) => ({
      name: permission?.name,
      id: permission?.id,
    })) || [];

  const { roleCreate, roleCreateError, roleCreatePending } = useRoleCreateMutation({ params: { tenantId } });
  const { roleUpdate, roleUpdateError, roleUpdatePending } = useRoleUpdateMutation({ path: { id: role?.id }, params: { tenantId } });

  const defaultValues = {
    name: "",
    description: "",
    // scope: "",
    permissionIds: [],
    staffIds: [],
  };

  const form = useForm<RoleAndPermissionsCreateFormSchemaType>({
    resolver: zodResolver(RoleAndPermissionsCreateFormSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const handleSubmit = (values: RoleAndPermissionsCreateFormSchemaType) => {
    const mutate = isEdit ? roleUpdate : roleCreate;

    mutate(
      { payload: values },
      {
        onSuccess: (result) => {
          toast.success(result.message);
          handleClose();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  const dataRef = useDataRef({ form });

  React.useEffect(() => {
    if (role) {
      dataRef.current.form.reset((values: RoleAndPermissionsCreateFormSchemaType) => ({
        ...values,
        name: role.name || values.name,
        // scope: role.scope || values.scope,
        description: role.description || values.description,
        staffIds: role?.staff?.map((staff) => staff.id) || values.staffIds,
        permissionIds: role?.permissions?.map((permission) => permission.id) || values.permissionIds,
      }));
    } else {
      dataRef.current.form.reset(defaultValues);
    }
  }, [dataRef, open]);

  const handleClose = () => {
    form.reset(defaultValues);
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
              {isView ? "View Role" : isEdit ? "Edit Role" : "Create Role"}
            </Typography>
          </DialogTitle>
          <LoadingContent loading={roleTemplateQueryResult?.isLoading} data={roleTemplateQueryResult?.data} error={roleTemplateQueryResult?.error} retry={roleTemplateQueryResult?.refetch}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="mb-8 grid gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input disabled={isView} {...field} placeholder="Name" />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* <FormField
                      control={form.control}
                      name="scope"
                      render={({ field }) => (
                        <FormItem>
                          <Select onValueChange={field.onChange} value={String(field.value)}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Scope" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value={"organization"}>Organization</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    /> */}

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea disabled={isView} {...field} placeholder="Description" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={"staffIds"}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <MultiSelect disabled={isView} selected={Array.isArray(field.value) ? field.value : []} onChange={field.onChange} options={staffOptions} placeholder="Select Staffs" searchPlaceholder="Search staffs" emptyMessage="No staffs found" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={"permissionIds"}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <MultiSelect disabled={isView} selected={Array.isArray(field.value) ? field.value : []} onChange={field.onChange} options={permissionOptions} placeholder="Select Permissions" searchPlaceholder="Search permissions" emptyMessage="No permissions found" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className={cn("w-full grid md:max-w-lg gap-4 mx-auto md:grid-cols-2", isView && "md:grid-cols-1")}>
                  <Button className="w-full md:w-auto" variant={"outline"} type="button" onClick={handleClose}>
                    Cancel
                  </Button>
                  {!isView && (
                    <Button className="w-full md:w-auto" loading={roleCreatePending}>
                      {isEdit ? "Update" : "Create"} Role
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </LoadingContent>
        </DialogContent>
      </Dialog>
    </>
  );
}
