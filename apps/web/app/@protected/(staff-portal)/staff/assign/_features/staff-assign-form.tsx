"use client";

import React from "react";
import Image from "next/image";
import { debounce } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import useDataRef from "@/hooks/use-data-ref";
import { formatDateToString } from "@/lib/dates";
import { useAuthUser } from "@/hooks/use-auth-user";
import { Check, UserRoundSearch } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingContent } from "@/components/loading-content";
import { RouteEnums } from "@/constants/router/route-constants";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  SelectValue,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  cn,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Form,
  Card,
  Typography,
  MultiSelect,
  Label,
  toast,
  CardTitle,
  CardDescription,
} from "@repo/ui";
import { StaffAssignFormSchema } from "../_schema/staff-assign-form-schema";
import { StaffAssignFormSchemaType } from "../_types/staff-assign-form-types";
import { useGetStaffListQuery, useGetStaffTemplateQuery, useStaffUpdateMutation } from "@/apis/core-staff-api/staff";

type PageProps = {};

export function StaffAssignForm({}: PageProps) {
  const router = useRouter();
  const { authUserIds } = useAuthUser();
  const [query, setQuery] = React.useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = React.useState<string>("");
  const [searchBy, setSearchBy] = React.useState<"" | "firstName" | "lastName" | "email" | "phoneNumber">("");

  const searchByOptions = [
    { label: "First Name", value: "firstName" },
    { label: "Last Name", value: "lastName" },
  ];

  const defaultValues = {
    roleId: "",
    id: "",
    subjectIds: [],
    classDivisionIds: [],
  };

  const form = useForm<StaffAssignFormSchemaType>({
    resolver: zodResolver(StaffAssignFormSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const handleAssign = (values: StaffAssignFormSchemaType) => {
    staffUpdate(
      {
        payload: {
          ...values,
          id: Number(values.id),
          roleId: Number(values.roleId),
        },
      },
      {
        onSuccess: (result) => {
          toast.success(result.message);
          router.push(RouteEnums.STAFF_LIST);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  //   Queries
  const staffListQueryResult = useGetStaffListQuery(
    React.useMemo(
      () => ({
        params: {
          [searchBy]: debouncedQuery,
          tenantId: authUserIds?.tenantId,
        },
        enabled: !!searchBy && !!debouncedQuery,
      }),
      [searchBy, debouncedQuery, authUserIds?.tenantId]
    )
  );

  const staffId = Number(form.watch("id"));

  const foundStaff = React.useMemo(() => {
    return staffListQueryResult?.data?.data?.find((staff) => staff?.id === staffId);
  }, [staffListQueryResult?.data?.data, staffId]);

  const staffTemplateQuery = useGetStaffTemplateQuery(
    React.useMemo(
      () => ({
        params: {
          tenantId: authUserIds?.tenantId,
        },
      }),
      [authUserIds?.tenantId]
    )
  );

  const { staffUpdate, staffUpdatePending, staffUpdateError } = useStaffUpdateMutation({ path: { staffId: foundStaff?.id }, params: { tenantId: authUserIds?.tenantId } });

  //   Staff Search
  const handleSearchByChange = (value: "firstName" | "lastName" | "email" | "phoneNumber") => {
    setSearchBy(value);
  };

  const debouncedSetQuery = React.useCallback(
    debounce((value: string) => {
      setDebouncedQuery(value);
    }, 1000),
    []
  );

  const handleQueryChange = (value: string) => {
    setQuery(value);
    debouncedSetQuery(value);
  };

  //   Form Updates
  const dataRef = useDataRef({ form });

  React.useEffect(() => {
    if (foundStaff) {
      dataRef.current.form.reset((values: StaffAssignFormSchemaType) => ({
        ...values,
        id: foundStaff?.id,
        roleId: foundStaff?.roleId || values?.roleId,
        subjectIds: foundStaff?.subjects?.map((subject) => subject.id) || values.subjectIds,
        classDivisionIds: foundStaff?.classDivisions?.map((classDivision) => classDivision?.id) || values.classDivisionIds,
      }));
    }
  }, [foundStaff, dataRef]);

  return (
    <>
      <Card className="border shadow-none grid gap-2 p-4 my-8 md:p-8">
        <CardTitle className="font-heading">Academic & Administrative Assignment</CardTitle>
        <CardDescription className="max-w-xl">Search for a staff member and configure their academic subjects, assigned classes, and system role.</CardDescription>
      </Card>

      <div className="grid md:grid-cols-3 gap-4 pb-8">
        <div className="md:sticky top-0 space-y-4">
          <Card>
            <LoadingContent loading={staffListQueryResult?.isLoading} data={staffListQueryResult?.data} error={staffListQueryResult?.error} retry={staffListQueryResult?.refetch}>
              <div className="p-4 border-b flex items-center gap-4">
                <div className="relative w-20 h-20 border rounded-md overflow-hidden">
                  <Image src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/backgrounds/login-security.svg" alt="staff-image" fill className="object-cover rounded-full" />
                </div>
                <div>
                  <Typography className="font-heading">
                    {foundStaff?.user?.firstName || "-"} {foundStaff?.user?.lastName}
                  </Typography>
                  <Typography>{foundStaff?.jobTitle}</Typography>
                  <Typography>Joined: {formatDateToString(foundStaff?.startDate) || "-"}</Typography>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <div className="uppercase text-sm font-heading pb-2">Basic Information</div>
                {[
                  { label: "Gender", value: foundStaff?.user?.gender || "-" },
                  { label: "Date of Birth", value: formatDateToString(foundStaff?.user?.dateOfBirth || "") || "-" },
                ].map((info, idx) => (
                  <div key={idx} className="flex justify-between md:flex-col">
                    <Typography size="small" color="muted">
                      {info.label}
                    </Typography>
                    <Typography>{info.value}</Typography>
                  </div>
                ))}
              </div>
            </LoadingContent>
          </Card>
          <Card>
            <div className="p-4 space-y-2">
              <div className="uppercase text-sm font-heading pb-2">Contact Information</div>
              {[
                { label: "Email", value: foundStaff?.user?.email || "-" },
                { label: "Phone", value: foundStaff?.user?.phoneNumber || "-" },
              ].map((info, idx) => (
                <div key={idx} className="flex justify-between md:flex-col">
                  <Typography size="small" color="muted">
                    {info.label || "-"}
                  </Typography>
                  <Typography>{info.value || "-"}</Typography>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAssign)}>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <Select onValueChange={handleSearchByChange} value={searchBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Search By" />
                    </SelectTrigger>
                    <SelectContent>
                      {searchByOptions.map((property, idx) => (
                        <SelectItem key={idx} value={String(property.value)}>
                          {property.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="col-span-2">
                    <FormField
                      control={form.control}
                      name={`id`}
                      render={({ field }) => (
                        <FormItem>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button variant="input" size="input" role="combobox" className={cn("w-full justify-between", !field.value && "text-muted-foreground")}>
                                  {field.value ? staffListQueryResult?.data?.data?.find((staff) => staff?.id === field.value)?.user?.firstName + " " + staffListQueryResult.data?.data.find((staff) => staff.id === field.value)?.user?.lastName : "Select an existing staff"}
                                  <UserRoundSearch className="h-4 w-4 text-muted-foreground" strokeWidth={1} />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="min-w-36 p-0">
                              <Command shouldFilter={false}>
                                <CommandInput placeholder={`Search by ${searchByOptions.find((option) => option.value === searchBy)?.label || "..."}...`} className="h-9" value={query} onValueChange={handleQueryChange} />
                                <CommandList>
                                  <CommandEmpty>No Staff found.</CommandEmpty>
                                  <CommandGroup>
                                    {staffListQueryResult?.data?.data?.map((staff) => (
                                      <CommandItem
                                        value={String(staff?.id)}
                                        key={staff?.id}
                                        onSelect={() => {
                                          form.setValue(`id`, staff?.id);
                                        }}
                                      >
                                        {staff?.user?.firstName} {staff?.user?.lastName}
                                        <Check className={cn("ml-auto", staff?.id === field.value ? "opacity-100" : "opacity-0")} />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name={"subjectIds"}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <MultiSelect selected={Array.isArray(field.value) ? field.value : []} onChange={field.onChange} options={staffTemplateQuery?.data?.data?.subjectOptions || []} placeholder="Select Subjects" searchPlaceholder="Search Subjects" emptyMessage="No subjects found" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Label className="text-sm text-muted-foreground">Choose subjects for this staff. A staff can teach one or more subjects</Label>
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name={"classDivisionIds"}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <MultiSelect
                            selected={Array.isArray(field.value) ? field.value : []}
                            onChange={field.onChange}
                            options={staffTemplateQuery?.data?.data?.classDivisionOptions || []}
                            placeholder="Select Class Divisions"
                            searchPlaceholder="Search Class Division"
                            emptyMessage="No classes found"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Label className="text-sm text-muted-foreground">Choose classes for this staff. A staff can be the class teacher of one or more classes</Label>
                </div>

                <FormField
                  control={form.control}
                  name="roleId"
                  render={({ field }) => (
                    <FormItem>
                      <Select value={String(field.value || "")} onValueChange={field.onChange} disabled={foundStaff?.role?.isAdmin}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Assign Role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {staffTemplateQuery?.data?.data?.roleOptions?.map((role, idx) => (
                            <SelectItem key={idx} value={String(role?.id)}>
                              {role?.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 md:max-w-lg gap-4 mx-auto my-12">
                <Button variant={"outline"} type="button" onClick={() => router.push(RouteEnums.STAFF)} disabled={staffUpdatePending}>
                  Cancel
                </Button>
                <Button loading={staffUpdatePending} disabled={!foundStaff}>
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
