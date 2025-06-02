import { WorkspaceClassessTab } from "./workspace-classes-tab";
import { WorkspaceStudentsTab } from "./workspace-students-tab";
import { WorkspaceSubjectsTab } from "./workspace-subjects-tab";
import { ScrollArea, ScrollBar, Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui";

export function WorkspaceTabs() {
  return (
    <Tabs defaultValue="subjects">
      <ScrollArea>
        <div className="w-full relative h-14">
          <TabsList className="flex absolute">
            <TabsTrigger value="subjects">My Subjects</TabsTrigger>
            <TabsTrigger value="classes">My Classes</TabsTrigger>
            <TabsTrigger value="students">My Students</TabsTrigger>
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
