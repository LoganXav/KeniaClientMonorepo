"use client";
import { CalendarGrid } from "@repo/ui";
import { useForm } from "react-hook-form";
import { Card, Button, FormField, FormItem, FormControl, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, FormMessage } from "@repo/ui";

import { RouteEnums } from "@/constants/router/route-constants";
import Link from "next/link";
import { CalendarCog } from "lucide-react";
import { LoadingContent } from "@/components/loading-content";
import { useGetTimetableQuery, useGetTimetableTemplateQuery } from "@/apis/core-timetable-api/timetable";
import React from "react";
import { SchoolTimetableTemplateOptions } from "../create/_types/school-timetable-form-types";

function SchoolTimetableGrid() {
  const [classId, setClassId] = React.useState(0);
  const [classDivisionId, setClassDivisionId] = React.useState(0);
  const timetableQueryResult = useGetTimetableQuery();

  const timetableTemplateQueryResult = useGetTimetableTemplateQuery(React.useMemo(() => ({ classId }), [classId])) as SchoolTimetableTemplateOptions;
  const timetableTemplate = timetableTemplateQueryResult?.data?.data;

  // console.log(timetableQueryResult?.data?.data);

  // Example events for a full week's timetable
  const events = [
    // Mathematics Thursdays
    { start: "2025-03-06T08:00:00", end: "2025-03-06T08:45:00", title: "SS2 Mathematics" },

    { start: "2025-03-13T08:00:00", end: "2025-03-13T08:45:00", title: "SS2 Mathematics" },
    { start: "2025-03-20T08:00:00", end: "2025-03-20T08:45:00", title: "SS2 Mathematics" },
    { start: "2025-03-27T08:00:00", end: "2025-03-27T08:45:00", title: "SS2 Mathematics" },
    { start: "2025-04-03T08:00:00", end: "2025-04-03T08:45:00", title: "SS2 Mathematics" },
    { start: "2025-04-10T08:00:00", end: "2025-04-10T08:45:00", title: "SS2 Mathematics" },
    { start: "2025-04-17T08:00:00", end: "2025-04-17T08:45:00", title: "SS2 Mathematics" },
    { start: "2025-04-24T08:00:00", end: "2025-04-24T08:45:00", title: "SS2 Mathematics" },
    { start: "2025-05-01T08:00:00", end: "2025-05-01T08:45:00", title: "SS2 Mathematics" },
    { start: "2025-05-08T08:00:00", end: "2025-05-08T08:45:00", title: "SS2 Mathematics" },
    { start: "2025-05-15T08:00:00", end: "2025-05-15T08:45:00", title: "SS2 Mathematics" },

    // Chemistry Fridays
    { start: "2025-03-07T08:00:00", end: "2025-03-07T08:45:00", title: "SS2 Chemistry" },

    { start: "2025-03-14T08:00:00", end: "2025-03-14T08:45:00", title: "SS2 Chemistry" },
    { start: "2025-03-21T08:00:00", end: "2025-03-21T08:45:00", title: "SS2 Chemistry" },
    { start: "2025-03-28T08:00:00", end: "2025-03-28T08:45:00", title: "SS2 Chemistry" },
    { start: "2025-04-04T08:00:00", end: "2025-04-04T08:45:00", title: "SS2 Chemistry" },
    { start: "2025-04-11T08:00:00", end: "2025-04-11T08:45:00", title: "SS2 Chemistry" },
    { start: "2025-04-18T08:00:00", end: "2025-04-18T08:45:00", title: "SS2 Chemistry" },
    { start: "2025-04-25T08:00:00", end: "2025-04-25T08:45:00", title: "SS2 Chemistry" },
    { start: "2025-05-02T08:00:00", end: "2025-05-02T08:45:00", title: "SS2 Chemistry" },
    { start: "2025-05-09T08:00:00", end: "2025-05-09T08:45:00", title: "SS2 Chemistry" },
    { start: "2025-05-16T08:00:00", end: "2025-05-16T08:45:00", title: "SS2 Chemistry" },

    // { start: "2025-03-13T08:00:00", end: "2025-03-13T08:45:00", title: "SS2 Mathematics" },

    { start: "2025-03-06T09:00:00", end: "2025-03-06T09:45:00", title: "SS2 English Language" },
    { start: "2025-03-06T10:00:00", end: "2025-03-06T10:45:00", title: "SS2 Biology" },
    { start: "2025-03-06T11:00:00", end: "2025-03-06T11:45:00", title: "SS2 Chemistry" },
    { start: "2025-03-06T12:00:00", end: "2025-03-06T12:45:00", title: "SS2 Physics" },
    { start: "2025-03-06T13:00:00", end: "2025-03-06T13:45:00", title: "SS2 History" },
    { start: "2025-03-06T14:00:00", end: "2025-03-06T14:45:00", title: "SS2 Geography" },
    { start: "2025-03-07T08:00:00", end: "2025-03-07T08:45:00", title: "SS2 Mathematics" },
    { start: "2025-03-07T09:00:00", end: "2025-03-07T09:45:00", title: "SS2 English Language" },
    { start: "2025-03-07T10:00:00", end: "2025-03-07T10:45:00", title: "SS2 Biology" },
    { start: "2025-03-07T11:00:00", end: "2025-03-07T11:45:00", title: "SS2 Chemistry" },
    { start: "2025-03-07T12:00:00", end: "2025-03-07T12:45:00", title: "SS2 Physics" },
    { start: "2025-03-07T13:00:00", end: "2025-03-07T13:45:00", title: "SS2 History" },
    { start: "2025-03-07T14:00:00", end: "2025-03-07T14:45:00", title: "SS2 Geography" },
    // Add more events for other days of the week
  ];

  return (
    <>
      <div className="flex w-full pb-4 mt-8">
        <div className="hidden md:flex md:flex-1" />
        <div className="grid md:grid-cols-3 gap-4 w-full md:w-auto">
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
        <Card className="p-4 mb-8">
          <CalendarGrid events={events} views={["timeGridWeek", "timeGridDay"]} />
        </Card>
      </LoadingContent>
    </>
  );
}

export default SchoolTimetableGrid;
