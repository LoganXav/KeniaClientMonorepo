"use client";

import { Card, Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui";
import React from "react";
import { StudentDetailsPersonalInfoTab } from "./student-details-personal-info-tab";
import { StudentDetailsRoutineTab } from "./student-details-routine-tab";
import { StudentDetailsAttendanceTab } from "./student-details-attendance-tab";
import { StudentDetailsSalaryTab } from "./student-details-salary-tab";

export function StudentDetails({ studentId }: { studentId: number }) {
  return (
    <Card>
      <Tabs defaultValue="personal">
        <TabsList>
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="routine">Routine</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="salary">Salary</TabsTrigger>
        </TabsList>

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
    </Card>
  );
}
