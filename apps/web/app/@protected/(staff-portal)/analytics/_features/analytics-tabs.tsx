"use client";

import React from "react";
import { ScrollArea, ScrollBar, Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui";
import { AtRiskStudentsTab } from "./at-risk-students-tab";
import { SubjectFailuresTab } from "./subject-failures-tab";
import { TeacherImpactTab } from "./teacher-impact-tab";

export function AnalyticsTabs() {
  return (
    <Tabs defaultValue="at-risk-students">
      <ScrollArea>
        <div className="w-full relative h-14">
          <TabsList className="flex absolute">
            <TabsTrigger value="at-risk-students">At-Risk Students</TabsTrigger>
            <TabsTrigger value="subject-failures">Subject Failures</TabsTrigger>
            <TabsTrigger value="teacher-impact">Teacher Impact</TabsTrigger>
          </TabsList>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <TabsContent value="at-risk-students">
        <AtRiskStudentsTab />
      </TabsContent>
      <TabsContent value="subject-failures">
        <SubjectFailuresTab />
      </TabsContent>
      <TabsContent value="teacher-impact">
        <TeacherImpactTab />
      </TabsContent>
    </Tabs>
  );
}
