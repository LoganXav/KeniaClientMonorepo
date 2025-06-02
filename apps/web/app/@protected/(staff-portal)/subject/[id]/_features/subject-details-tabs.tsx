"use client";

import { SubjectDetailsGradingTab } from "./subject-details-grading-tab";
import { SubjectDetailsStudentsTab } from "./subject-details-students-tab";
import { ScrollArea, ScrollBar, Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui";

export function SubjectDetailsTabs({ subjectId }: { subjectId: number }) {
  return (
    <Tabs defaultValue="students">
      <ScrollArea>
        <div className="w-full relative h-14">
          <TabsList className="flex absolute">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="grading">Grading</TabsTrigger>
          </TabsList>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <TabsContent value="students">
        <SubjectDetailsStudentsTab subjectId={subjectId} />
      </TabsContent>
      <TabsContent value="grading">
        <SubjectDetailsGradingTab subjectId={subjectId} />
      </TabsContent>
    </Tabs>
  );
}
