"use client";

import { ScrollArea, ScrollBar, Tabs, TabsContent, TabsList, TabsTrigger, Typography, Card } from "@repo/ui";

export function DashboardAgendaAndNoticeBoard() {
  return (
    <Card className="p-4 space-y-2">
      <Tabs defaultValue="agenda">
        <ScrollArea>
          <div className="w-full relative h-14">
            <TabsList className="w-full absolute flex justify-start items-center border-border border-t-0 border-x-0 rounded-none">
              <TabsTrigger value="agenda" className="rounded-b-none data-[state=active]:border-t-0 data-[state=active]:border-x-0 hover:bg-accent">
                <Typography className="font-heading uppercase" size={"small"}>
                  Agenda
                </Typography>
              </TabsTrigger>
              <TabsTrigger value="notice-board" className="rounded-b-none data-[state=active]:border-t-0 data-[state=active]:border-x-0 hover:bg-accent">
                <Typography className="font-heading uppercase" size={"small"}>
                  Notice Board
                </Typography>
              </TabsTrigger>
            </TabsList>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <TabsContent className="h-80" value="agenda"></TabsContent>
        <TabsContent className="h-80" value="notice-board"></TabsContent>
      </Tabs>
    </Card>
  );
}
