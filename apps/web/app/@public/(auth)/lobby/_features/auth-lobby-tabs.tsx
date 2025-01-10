"use client";

import { RouteEnums } from "@/constants/router/route-constants";
import { Button, Card, CardContent, Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui";
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
              <div className="space-y-2">
                <p className="text-lg font-bold">Log in to as a student to</p>
                <div>
                  <p className="text-muted-foreground text-sm">Get access to course content you need.</p>
                  <p className="text-muted-foreground text-sm">Get access to some more course content.</p>
                  <p className="text-muted-foreground text-sm">Get access to course content.</p>
                </div>
              </div>
              <div className="flex items-center justify-center flex-1 relative">
                <Image src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/backgrounds/login-security.svg" fill alt="placeholder-img" className="h-full w-full object-center dark:brightness-[0.2] dark:grayscale" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="staff">
          <Card className="py-5 px-4">
            <CardContent className="flex gap-4">
              <div className="space-y-2">
                <p className="text-lg font-bold">Log in to as a staff to</p>
                <div>
                  <p className="text-muted-foreground text-sm">Upload your course content materials.</p>
                  <p className="text-muted-foreground text-sm">See your students information.</p>
                  <p className="text-muted-foreground text-sm">Get access to course content.</p>
                </div>
              </div>
              <div className="flex items-center justify-center flex-1 relative">
                <Image src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/backgrounds/login-security.svg" fill alt="placeholder-img" className="h-full w-full object-center dark:brightness-[0.2] dark:grayscale" />
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
