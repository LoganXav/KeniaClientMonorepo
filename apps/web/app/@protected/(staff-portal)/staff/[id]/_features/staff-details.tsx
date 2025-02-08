"use client";

import { Card, ScrollBar, ScrollArea, Tabs, TabsContent, TabsList, TabsTrigger, SelectValue, Select, SelectTrigger, SelectContent, SelectItem, Button } from "@repo/ui";
import React from "react";
import Image from "next/image";
import { RouteEnums } from "@/constants/router/route-constants";
import Link from "next/link";
import { UserRoundPen } from "lucide-react";
import { useGetSingleStaffQuery } from "@/apis/core-staff-api/staff";
import { LoadingContent } from "@/components/loading-content";
import { formatDateToString } from "@/lib/dates";

function StaffDetails({ staffId }: { staffId: number }) {
  const { data: staff, isLoading, error, refetch } = useGetSingleStaffQuery({ staffId });

  return (
    <>
      <div className="flex w-full pb-4 mt-8">
        <div className="hidden sm:flex sm:flex-1" />
        <div className="grid sm:grid-cols-2 gap-4 w-full sm:w-auto">
          <Select onValueChange={() => null} value={String("")}>
            <SelectTrigger className="w-auto h-10">
              <SelectValue placeholder="Actions" />
            </SelectTrigger>
            <SelectContent>
              {["Suspend", "Issue query"].map((item, idx) => (
                <SelectItem key={idx} value={String(item)}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Link className="" href={RouteEnums.STAFF_CREATE}>
            <Button className="w-full">
              Edit Staff <UserRoundPen size={18} strokeWidth={1} />
            </Button>
          </Link>
        </div>
      </div>
      <LoadingContent loading={isLoading} error={error} data={staff} retry={refetch}>
        <div className="grid md:grid-cols-3 gap-4 pb-8">
          <div className="md:sticky top-0 space-y-4">
            <Card>
              <div className="p-4 border-b flex items-center gap-4">
                <div className="relative w-20 h-20 border rounded-md overflow-hidden">
                  <Image src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/backgrounds/login-security.svg" alt="staff-image" fill className="object-cover rounded-full" />
                </div>
                <div>
                  <p className="font-heading">
                    {staff?.data?.user?.firstName} {staff?.data?.user?.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">{staff?.data?.jobTitle}</p>
                  <p className="text-sm text-muted-foreground">Joined: {formatDateToString(staff?.data?.startDate)}</p>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <div className="uppercase text-sm font-heading pb-2">Basic Information</div>
                {[1, 2, 3].map((info, idx) => (
                  <div key={idx} className="flex flex-col">
                    <p>Class & Section</p>
                    <p className="text-muted-foreground">III, A</p>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <div className="p-4 space-y-2">
                <div className="uppercase text-sm font-heading pb-2">Contact Information</div>
                {[1, 2, 3].map((info, idx) => (
                  <div key={idx} className="flex items-center gap-2 justify-between">
                    <p>Class & Section</p>
                    <p className="text-muted-foreground">III, A</p>
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
                    <TabsTrigger value="attendance">Leave &amp; Attendance</TabsTrigger>
                    <TabsTrigger value="salary">Salary</TabsTrigger>
                  </TabsList>
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
              <TabsContent value="personal">
                <div className="space-y-4">
                  <Card>
                    <div className="p-4 border-b font-heading uppercase text-sm">Profile Details</div>
                    <div className="p-4">Details</div>
                  </Card>
                  <Card>
                    <div className="p-4 border-b font-heading uppercase text-sm">Address</div>
                    <div className="p-4">Address</div>
                  </Card>
                  <Card>
                    <div className="p-4 border-b font-heading uppercase text-sm">Work Details</div>
                    <div className="p-4">Details</div>
                  </Card>
                  <Card>
                    <div className="p-4 border-b font-heading uppercase text-sm">Social Media</div>
                    <div className="p-4">Links</div>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="routine">
                <Card className="p-4">Routine</Card>
              </TabsContent>
              <TabsContent value="attendance">
                <Card className="p-4">Leave & Attendance</Card>
              </TabsContent>
              <TabsContent value="salary">
                <Card className="p-4">Salary</Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </LoadingContent>
    </>
  );
}

export default StaffDetails;
