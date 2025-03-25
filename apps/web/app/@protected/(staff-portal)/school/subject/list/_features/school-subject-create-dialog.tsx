import useDataRef from "@/hooks/use-data-ref";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, DialogContent, DialogTitle, SelectItem, SelectContent, SelectValue, SelectTrigger, FormControl, Select, Form, FormField, FormItem, Typography, FormMessage, Input, toast, MultiSelect } from "@repo/ui";
import React from "react";
import { useForm } from "react-hook-form";
import { SubjectCreateFormSchema } from "../_schema/school-subject-create-schema";
import { SubjectCreateFormSchemaType } from "../_types/school-subject-create-types";
import { LoadingContent } from "@/components/loading-content";
import { useGetSubjectTemplateQuery, useSubjectUpdateMutation, useSubjectCreateMutation } from "@/apis/core-subject-api/subject";
import { useAuthUser } from "@/hooks/use-auth-user";
import { SubjectType } from "@/types";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  subject?: SubjectType;
}

export function SchoolSubjectCreateDialog({ open, onClose, subject }: DialogProps) {
  const isEdit = !!subject;

  const { authUserIds } = useAuthUser();

  const subjectTemplateQueryResult = useGetSubjectTemplateQuery({
    tenantId: authUserIds?.tenantId,
  });

  const subjectTemplate = subjectTemplateQueryResult?.data?.data;

  const subjectTeacherOptions = subjectTemplate?.staffOptions?.map((staff: Record<string, any>) => ({
    name: `${staff?.user?.firstName} ${staff?.user?.lastName}`,
    id: staff?.id,
  }));

  const { subjectCreate, subjectCreatePending, subjectCreateError } = useSubjectCreateMutation();
  const { subjectUpdate, subjectUpdatePending, subjectUpdateError } = useSubjectUpdateMutation({ subjectId: subject?.id });

  const handleSubmit = (values: SubjectCreateFormSchemaType) => {
    const mutate = isEdit ? subjectUpdate : subjectCreate;

    mutate(
      {
        payload: { ...values, classId: Number(values.classId) },
      },
      {
        onSuccess: (result) => {
          toast.success(result.message);

          onClose();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  const defaultValues = {
    classId: 0,
    name: "",
    description: "",
    staffIds: [],
  };

  const form = useForm<SubjectCreateFormSchemaType>({
    resolver: zodResolver(SubjectCreateFormSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const dataRef = useDataRef({ form });

  // Reset form values if editing an existing class division
  React.useEffect(() => {
    if (subject) {
      dataRef.current.form.reset((values: SubjectCreateFormSchemaType) => ({
        ...values,
        name: subject?.name || values.name,
        description: subject?.description || values.description,
        classId: String(subject?.classId) || values.classId,
        staffIds: subject?.staffs || values.staffIds,
      }));
    }
  }, [subject]);

  const handleClose = () => {
    form.reset(defaultValues);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          handleClose();
        }
      }}
    >
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogTitle>
          <Typography size="h4" className="font-heading">
            {isEdit ? "Edit Subject" : "Create Subject"}
          </Typography>
        </DialogTitle>

        <LoadingContent loading={subjectTemplateQueryResult?.isLoading} error={subjectTemplateQueryResult?.error} data={subjectTemplateQueryResult?.data?.data} shouldLoad={true}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="mb-8 grid md:grid-cols-1 gap-4">
              <FormField control={form.control} name="name" render={({ field }) => <Input {...field} placeholder="Name" />} />
              <FormField control={form.control} name="description" render={({ field }) => <Input {...field} placeholder="Description" />} />
              <FormField
                control={form.control}
                name="classId"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} value={String(field.value)}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Class" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {subjectTemplate?.classOptions?.map((classItem: Record<string, any>, idx: number) => (
                          <SelectItem key={idx} value={String(classItem?.id)}>
                            {classItem?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                      <MultiSelect selected={Array.isArray(field.value) ? field.value : []} onChange={field.onChange} options={subjectTeacherOptions || []} placeholder="Select Subject Teachers" searchPlaceholder="Search Subject Teachers" emptyMessage="No Teachers found" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>

          <div className="grid md:grid-cols-2 md:max-w-lg gap-4 mx-auto">
            <Button variant={"outline"} type="button" onClick={handleClose} disabled={subjectCreatePending || subjectUpdatePending}>
              Cancel
            </Button>
            <Button type="button" onClick={() => handleSubmit(form.getValues())} loading={subjectCreatePending || subjectUpdatePending}>
              {isEdit ? "Update Subject" : "Create Subject"}
            </Button>
          </div>
        </LoadingContent>
      </DialogContent>
    </Dialog>
  );
}
