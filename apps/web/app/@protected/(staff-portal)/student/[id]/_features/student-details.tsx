"use client";

import { Card, ScrollBar, ScrollArea, Tabs, TabsContent, TabsList, TabsTrigger, SelectValue, Select, SelectTrigger, SelectContent, SelectItem, Button, Typography } from "@repo/ui";
import React from "react";
import Image from "next/image";
import { RouteEnums } from "@/constants/router/route-constants";
import Link from "next/link";
import { UserRoundPen } from "lucide-react";
import { useGetSingleStudentQuery } from "@/apis/core-student-api/student";
import { LoadingContent } from "@/components/loading-content";
import { formatDateToString } from "@/lib/dates";
import { StudentDetailsPersonalInfoTab } from "./student-details-personal-info-tab";
import { StudentDetailsRoutineTab } from "./student-details-routine-tab";
import { StudentDetailsAttendanceTab } from "./student-details-attendance-tab";
import { StudentDetailsSalaryTab } from "./student-details-salary-tab";

function StudentDetails({ studentId }: { studentId: number }) {
  const { data: student, isLoading, error, refetch } = useGetSingleStudentQuery({ studentId });

  return (
    <>
      <div className="flex w-full pb-4 mt-8">
        <div className="hidden sm:flex sm:flex-1" />
        <div className="grid sm:grid-cols-2 gap-4 w-full sm:w-auto">
          <Select onValueChange={() => null} value="">
            <SelectTrigger className="w-auto h-10">
              <SelectValue placeholder="Actions" />
            </SelectTrigger>
            <SelectContent>
              {["Suspend", "Issue query"].map((item, idx) => (
                <SelectItem key={idx} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Link href={`${RouteEnums.STUDENT_CREATE}?id=${studentId}`}>
            <Button className="w-full">
              Edit Student <UserRoundPen size={18} strokeWidth={1} />
            </Button>
          </Link>
        </div>
      </div>
      <LoadingContent loading={isLoading} error={error} data={student} retry={refetch}>
        <div className="grid md:grid-cols-3 gap-4 pb-8">
          <div className="md:sticky top-0 space-y-4">
            <Card>
              <div className="p-4 border-b flex items-center gap-4">
                <div className="relative w-20 h-20 border rounded-md overflow-hidden">
                  <Image src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/backgrounds/login-security.svg" alt="student-image" fill className="object-cover rounded-full" />
                </div>
                <div>
                  <Typography className="font-heading">
                    {student?.data?.user?.firstName} {student?.data?.user?.lastName}
                  </Typography>
                  {/* Optionally, show a field such as class name or major */}
                  {/* <Typography>{student?.data?.className || "Student"}</Typography> */}
                  <Typography>Enrolled: {formatDateToString(student?.data?.enrollmentDate)}</Typography>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <div className="uppercase text-sm font-heading pb-2">Basic Information</div>
                {[
                  { label: "Gender", value: student?.data?.user?.gender },
                  { label: "Date of Birth", value: formatDateToString(student?.data?.user?.dateOfBirth || "") },
                ].map((info, idx) => (
                  <div key={idx} className="flex justify-between md:flex-col">
                    <Typography size="small" color="muted">
                      {info.label}
                    </Typography>
                    <Typography>{info.value}</Typography>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <div className="p-4 space-y-2">
                <div className="uppercase text-sm font-heading pb-2">Contact Information</div>
                {[
                  { label: "Email", value: student?.data?.user?.email },
                  { label: "Phone", value: student?.data?.user?.phoneNumber },
                ].map((info, idx) => (
                  <div key={idx} className="flex justify-between md:flex-col">
                    <Typography size="small" color="muted">
                      {info.label}
                    </Typography>
                    <Typography>{info.value}</Typography>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          <div className="md:col-span-2">
            <Tabs defaultValue="personal">
              <ScrollArea>
                <div className="w-full relative h-14">
                  <TabsList className="flex absolute">
                    <TabsTrigger value="personal">Personal Info</TabsTrigger>
                    <TabsTrigger value="routine">Routine</TabsTrigger>
                    <TabsTrigger value="attendance">Attendance</TabsTrigger>
                    <TabsTrigger value="salary">Salary</TabsTrigger>
                  </TabsList>
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>

              <TabsContent value="personal">
                <StudentDetailsPersonalInfoTab />
              </TabsContent>

              <TabsContent value="routine">
                <StudentDetailsRoutineTab />
              </TabsContent>

              <TabsContent value="attendance">
                <StudentDetailsAttendanceTab />
              </TabsContent>

              <TabsContent value="salary">
                <StudentDetailsSalaryTab />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </LoadingContent>
    </>
  );
}

export default StudentDetails;
