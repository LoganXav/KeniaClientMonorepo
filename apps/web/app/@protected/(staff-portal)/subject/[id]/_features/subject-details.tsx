"use client";

import React from "react";
import useToggle from "@/hooks/use-toggle";
import { useAuthUser } from "@/hooks/use-auth-user";
import { SubjectDetailsTabs } from "./subject-details-tabs";
import { LoadingContent } from "@/components/loading-content";
import { MinusIcon, CirclePlus, EqualIcon } from "lucide-react";
import { useGetSingleSubjectQuery } from "@/apis/core-subject-api/subject";
import { SubjectGradingStructureCreateDialog } from "./subject-grading-structure-create-dialog";
import { useGetSchoolGradingStructureQuery } from "@/apis/core-tenant-api/tenant-grading-structure";
import { Button, Card, CardDescription, CardTitle, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Typography } from "@repo/ui";

export function SubjectDetails({ subjectId }: { subjectId: number }) {
  const { authUserIds } = useAuthUser();
  const [open, toggle] = useToggle(false);
  const [isView, setIsView] = React.useState(false);

  const subjectQueryResult = useGetSingleSubjectQuery({
    params: { tenantId: authUserIds?.tenantId, subjectId },
  });

  const subject = subjectQueryResult?.data?.data;

  const schoolGradingStructureQueryResult = useGetSchoolGradingStructureQuery({ path: {}, params: { tenantId: authUserIds?.tenantId, classId: subject?.classId } });
  const schoolGradingStructure = schoolGradingStructureQueryResult?.data?.data;

  const handleOpenDialog = () => {
    // Ensure we're running this after the dropdown's click event has completed
    setTimeout(() => {
      toggle();
    }, 0);
  };

  const handleCloseDialog = React.useCallback(() => {
    toggle();

    setTimeout(() => {
      setIsView(false);
    }, 200);
  }, [toggle]);

  const handleViewDialogOpen = () => {
    setIsView(true);
    handleOpenDialog();
  };

  return (
    <>
      <LoadingContent loading={subjectQueryResult?.isLoading} data={subjectQueryResult?.data} error={subjectQueryResult?.error} retry={subjectQueryResult?.refetch}>
        <div className="flex w-full pb-4 mt-8">
          <div className="hidden md:flex md:flex-1" />

          <div className="grid md:grid-cols-3 gap-4 w-full md:w-auto">
            {subject?.gradingStructure ? (
              <Button variant={"outline"} className="w-full justify-self-end" onClick={handleViewDialogOpen}>
                {/* <EyeIcon size={18} strokeWidth={1} /> */}
                View Grade Breakdown
              </Button>
            ) : (
              <div />
            )}
            <Button className="w-full" onClick={() => handleOpenDialog()}>
              {!subject?.gradingStructure ? (
                <>
                  Create Grade Breakdown <CirclePlus size={18} strokeWidth={1} />
                </>
              ) : (
                <>
                  Update Grade Breakdown <CirclePlus size={18} strokeWidth={1} />
                </>
              )}
            </Button>
            <Select value={String("")}>
              <SelectTrigger className="w-auto h-10">
                <SelectValue placeholder="Quick Actions" />
              </SelectTrigger>
              <SelectContent>
                {["Submit Scheme of Work", "Submit Grades"].map((item, idx) => (
                  <SelectItem key={idx} value={String(item)}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-12">
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="md:col-span-2 border shadow-none p-4 md:p-8 space-y-4">
              <CardTitle className="font-heading">{subject?.name}</CardTitle>
              <CardDescription className="max-w-xl">{subject?.description}</CardDescription>
              <CardDescription className="max-w-xl">{subject?.class?.name}</CardDescription>
            </Card>

            <Card className="p-4 space-y-4">
              <Typography className="font-heading uppercase" size={"small"}>
                School Grading Policy
              </Typography>
              <div className="space-y-2">
                <LoadingContent loading={schoolGradingStructureQueryResult?.isLoading} data={schoolGradingStructureQueryResult?.data} error={schoolGradingStructureQueryResult?.error} retry={schoolGradingStructureQueryResult?.refetch}>
                  <div className="grid grid-cols-5 border border-border">
                    {schoolGradingStructure?.gradeBoundaries.map((boundary, idx) => (
                      <React.Fragment key={idx}>
                        <div className="p-2 border border-border text-center">
                          <Typography>{boundary?.minimumScore}</Typography>
                        </div>
                        <div className="p-2 border border-border flex justify-center items-center">
                          <MinusIcon strokeWidth={1} size={16} />
                        </div>
                        <div className="p-2 border border-border text-center">
                          <Typography>{boundary?.maximumScore}</Typography>
                        </div>
                        <div className="p-2 border border-border flex justify-center items-center">
                          <EqualIcon strokeWidth={1} size={16} />
                        </div>
                        <div className="p-2 border border-border text-center">
                          <Typography>{boundary?.grade}</Typography>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </LoadingContent>
              </div>
            </Card>
          </div>
          <SubjectDetailsTabs subjectId={subjectId} classId={subject?.classId} />
        </div>
      </LoadingContent>

      <SubjectGradingStructureCreateDialog open={open} onClose={handleCloseDialog} isView={isView} subject={subject} schoolGradingStructure={schoolGradingStructure} />
    </>
  );
}
