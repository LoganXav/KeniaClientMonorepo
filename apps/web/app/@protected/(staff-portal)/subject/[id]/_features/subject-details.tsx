"use client";

import React from "react";
import useToggle from "@/hooks/use-toggle";
import { useAuthUser } from "@/hooks/use-auth-user";
import { SubjectDetailsTabs } from "./subject-details-tabs";
import { LoadingContent } from "@/components/loading-content";
import { ArrowRightIcon, CirclePlus, EqualIcon } from "lucide-react";
import { useGetSingleSubjectQuery } from "@/apis/core-subject-api/subject";
import { Button, Card, CardDescription, CardTitle, Typography } from "@repo/ui";
import { SubjectGradingStructureCreateDialog } from "./subject-grading-structure-create-dialog";
import { useGetSchoolGradingStructureQuery } from "@/apis/core-tenant-api/tenant-grading-structure";

export function SubjectDetails({ subjectId }: { subjectId: number }) {
  const { authUserIds } = useAuthUser();
  const [open, toggle] = useToggle(false);

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
  }, [toggle]);

  return (
    <>
      <LoadingContent loading={subjectQueryResult?.isLoading || schoolGradingStructureQueryResult?.isLoading} data={schoolGradingStructure || subject} error={schoolGradingStructureQueryResult?.error || subjectQueryResult?.error} shouldLoad={true} retry={subjectQueryResult?.refetch}>
        <div className="flex w-full pb-4 mt-8">
          <div className="hidden md:flex md:flex-1" />

          <div className="grid md:grid-cols-1 gap-4 w-full md:w-auto">
            <Button className="w-full" onClick={() => handleOpenDialog()}>
              {!subject?.gradingStructure ? (
                <>
                  Create Grading Structure <CirclePlus size={18} strokeWidth={1} />
                </>
              ) : (
                <>
                  Update Grading Structure <CirclePlus size={18} strokeWidth={1} />
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-12">
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="md:col-span-2 border shadow-none grid gap-2 p-4 md:p-8">
              <CardTitle className="font-heading">{subject?.name}</CardTitle>
              <CardDescription className="max-w-xl">{subject?.description}</CardDescription>
              <CardDescription className="max-w-xl">{subject?.class?.name}</CardDescription>
            </Card>

            <Card className="p-4 space-y-4">
              <Typography className="font-heading uppercase" size={"small"}>
                Class Grading Structure
              </Typography>
              <div className="space-y-2">
                {schoolGradingStructure?.gradeBoundaries.map((boundary, idx) => (
                  <div className="flex gap-6 items-center" key={idx}>
                    <Typography>{boundary?.minimumScore}</Typography>
                    <ArrowRightIcon strokeWidth={1} size={16} />
                    <Typography>{boundary?.maximumScore}</Typography>
                    <EqualIcon strokeWidth={1} size={16} />
                    <Typography>{boundary?.grade}</Typography>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          <SubjectDetailsTabs />
        </div>
      </LoadingContent>

      <SubjectGradingStructureCreateDialog open={open} onClose={handleCloseDialog} subject={subject} schoolGradingStructure={schoolGradingStructure} />
    </>
  );
}
