import { WorkspaceClassessTab } from "./workspace-classes-tab";
import { WorkspaceStudentsTab } from "./workspace-students-tab";
import { WorkspaceSubjectsTab } from "./workspace-subjects-tab";
import { PermissionRestrictor } from "@/components/permission-restrictor";
import { PERMISSIONS } from "@/constants/permissions/permission-constants";
import { ScrollArea, ScrollBar, Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui";

export function WorkspaceTabs() {
  return (
    <Tabs defaultValue="subjects">
      <ScrollArea>
        <div className="w-full relative h-14">
          <TabsList className="flex absolute">
            <PermissionRestrictor requiredPermissions={[PERMISSIONS.SUBJECT.READ]}>
              <TabsTrigger value="subjects">My Subjects</TabsTrigger>
            </PermissionRestrictor>
            <PermissionRestrictor requiredPermissions={[PERMISSIONS.CLASS.READ]}>
              <TabsTrigger value="classes">My Classes</TabsTrigger>
            </PermissionRestrictor>
            <PermissionRestrictor requiredPermissions={[PERMISSIONS.STUDENT.READ]}>
              <TabsTrigger value="students">My Students</TabsTrigger>
            </PermissionRestrictor>
          </TabsList>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <TabsContent value="subjects">
        <WorkspaceSubjectsTab />
      </TabsContent>
      <TabsContent value="classes">
        <WorkspaceClassessTab />
      </TabsContent>
      <TabsContent value="students">
        <WorkspaceStudentsTab />
      </TabsContent>
    </Tabs>
  );
}
