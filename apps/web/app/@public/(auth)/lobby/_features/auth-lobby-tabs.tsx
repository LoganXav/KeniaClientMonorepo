"use client";

import { RouteEnums } from "@/constants/router/route-constants";
import { Button, Card, CardContent, Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui";
import { Check } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function AuthLobbyTabs() {
  const router = useRouter();
  const [userType, setUserType] = React.useState("student");

  return (
    <div className="space-y-8 max-w-xl">
      <Tabs value={userType} className="w-full space-y-4" onValueChange={(value) => setUserType(value)}>
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="student">I'm A Student</TabsTrigger>
          <TabsTrigger value="staff">I'm A Staff</TabsTrigger>
        </TabsList>
        <TabsContent value="student">
          <Card className="py-5 px-4">
            <CardContent className="flex gap-4">
              <div className="space-y-2 md:w-[75%]">
                <p className="text-lg font-bold">Log in as a student to</p>
                <div className="space-y-2">
                  {["Access all your course materials.", "Submit assignments.", "Get course announcements."].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check color="white" size={15} className="bg-green-700 rounded-full p-[2px]" />
                      <p className="text-muted-foreground text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden md:flex items-center justify-center flex-1 relative">
                <Image src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/backgrounds/login-security.svg" fill alt="placeholder-img" className="h-full w-full object-center" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="staff">
          <Card className="py-5 px-4">
            <CardContent className="flex gap-4">
              <div className="space-y-2 md:w-[75%]">
                <p className="text-lg font-bold">Log in as a staff to</p>
                <div className="space-y-2">
                  {["Manage and upload course materials.", "View and manage student information.", "Track course progress and grading."].map((item, index) => (
                    <div key={index} className="w-full flex items-center space-x-2">
                      <Check color="white" size={15} className="bg-green-700 rounded-full p-[2px]" />
                      <p className="text-muted-foreground text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden md:flex items-center justify-center flex-1 relative">
                <Image src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/backgrounds/login-security.svg" fill alt="placeholder-img" className="h-full w-full object-center" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Button onClick={() => router.push(`${RouteEnums.SIGNIN}?userType=${userType}`)} className="w-full">
        Next
      </Button>
    </div>
  );
}

export default AuthLobbyTabs;
