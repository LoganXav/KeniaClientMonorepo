"use client";
import React from "react";
import Link from "next/link";
import { CalendarGrid } from "@repo/ui";
import { CalendarCog } from "lucide-react";
import { LoadingContent } from "@/components/loading-content";
import { RouteEnums } from "@/constants/router/route-constants";
import { SchoolTimetableTemplateOptions } from "../create/_types/school-timetable-form-types";
import { Card, Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui";
import { useGetTimetableQuery, useGetTimetableTemplateQuery } from "@/apis/core-timetable-api/timetable";
import { useAuthUser } from "@/hooks/use-auth-user";

function SchoolTimetableGrid() {
  const { authUserIds } = useAuthUser();
  const [termId, setTermId] = React.useState(0);
  const [classId, setClassId] = React.useState(0);
  const [classDivisionId, setClassDivisionId] = React.useState(0);

  const timetableQueryResult = useGetTimetableQuery(React.useMemo(() => ({ params: { classDivisionId, termId, tenantId: authUserIds?.tenantId } }), [classDivisionId, termId, authUserIds?.tenantId]));
  const timetable = timetableQueryResult?.data?.data;

  const timetableTemplateQueryResult = useGetTimetableTemplateQuery(React.useMemo(() => ({ params: { classId, tenantId: authUserIds?.tenantId } }), [classId, authUserIds?.tenantId])) as SchoolTimetableTemplateOptions;
  const timetableTemplate = timetableTemplateQueryResult?.data?.data;

  return (
    <>
      <div className="flex w-full pb-4 mt-8">
        <div className="hidden md:flex md:flex-1" />
        <div className="grid md:grid-cols-4 gap-4 w-full md:w-auto">
          <Select value={String(termId || "")} onValueChange={(value) => setTermId(Number(value))} disabled={timetableTemplateQueryResult?.isLoading}>
            <SelectTrigger>
              <SelectValue placeholder="Term" />
            </SelectTrigger>
            <SelectContent>
              {timetableTemplate?.termOptions?.map((termOption, idx) => (
                <SelectItem key={idx} value={String(termOption?.id)}>
                  {termOption?.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={String(classId || "")} onValueChange={(value) => setClassId(Number(value))} disabled={timetableTemplateQueryResult?.isLoading}>
            <SelectTrigger>
              <SelectValue placeholder="Class" />
            </SelectTrigger>
            <SelectContent>
              {timetableTemplate?.classOptions?.map((classOption, idx) => (
                <SelectItem key={idx} value={String(classOption?.id)}>
                  {classOption?.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={String(classDivisionId || "")} onValueChange={(value) => setClassDivisionId(Number(value))} disabled={timetableTemplateQueryResult?.isLoading || !classId}>
            <SelectTrigger>
              <SelectValue placeholder="Class Division" />
            </SelectTrigger>
            <SelectContent>
              {timetableTemplate?.classDivisionOptions?.map((classDivisionOption, idx) => (
                <SelectItem key={idx} value={String(classDivisionOption?.id)}>
                  {classDivisionOption?.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Link className="" href={RouteEnums.SCHOOL_TIMETABLE_CREATE}>
            <Button className="w-full">
              Manage Timetable <CalendarCog size={18} strokeWidth={1} />
            </Button>
          </Link>
        </div>
      </div>

      <LoadingContent
        loading={timetableQueryResult?.isLoading || timetableTemplateQueryResult?.isLoading}
        error={timetableQueryResult?.error || timetableTemplateQueryResult?.error}
        retry={timetableQueryResult?.refetch || timetableTemplateQueryResult?.refetch}
        data={timetableQueryResult?.data || timetableTemplateQueryResult?.data}
        shouldLoad={false}
      >
        {classDivisionId ? (
          <Card className="p-4 mb-8">
            <CalendarGrid events={timetable} views={["timeGridWeek", "timeGridDay"]} />
          </Card>
        ) : (
          <></>
        )}
      </LoadingContent>
    </>
  );
}

export default SchoolTimetableGrid;
