"use client";

import { SubjectDetailsGradingTab } from "./subject-details-grading-tab";
import { PermissionRestrictor } from "@/components/permission-restrictor";
import { SubjectDetailsStudentsTab } from "./subject-details-students-tab";
import { PERMISSIONS } from "@/constants/permissions/permission-constants";
import { ScrollArea, ScrollBar, Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui";

export function SubjectDetailsTabs({ subjectId, classId }: { subjectId: number; classId?: number }) {
  return (
    <Tabs defaultValue="students">
      <ScrollArea>
        <div className="w-full relative h-14">
          <TabsList className="flex absolute">
            <PermissionRestrictor requiredPermissions={[PERMISSIONS.STUDENT.READ]}>
              <TabsTrigger value="students">Current Students</TabsTrigger>
            </PermissionRestrictor>
            <PermissionRestrictor requiredPermissions={[PERMISSIONS.SUBJECT_GRADE.READ]}>
              <TabsTrigger value="grading">Grading</TabsTrigger>
            </PermissionRestrictor>
          </TabsList>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <TabsContent value="students">
        <SubjectDetailsStudentsTab subjectId={subjectId} classId={classId} />
      </TabsContent>
      <TabsContent value="grading">
        <SubjectDetailsGradingTab subjectId={subjectId} classId={classId} />
      </TabsContent>
    </Tabs>
  );
}
