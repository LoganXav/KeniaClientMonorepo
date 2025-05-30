"use client";
import { ScrollArea, ScrollBar, Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui";

export function SubjectDetailsTabs() {
  return (
    <Tabs defaultValue="students">
      <ScrollArea>
        <div className="w-full relative h-14">
          <TabsList className="flex absolute">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="grades">Grades</TabsTrigger>
          </TabsList>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <TabsContent value="students"></TabsContent>
      <TabsContent value="grades"></TabsContent>
    </Tabs>
  );
}
