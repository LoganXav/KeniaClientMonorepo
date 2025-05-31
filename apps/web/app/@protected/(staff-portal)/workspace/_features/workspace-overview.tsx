"use client";

import Link from "next/link";
import { FileCheck2 } from "lucide-react";
import { RouteEnums } from "@/constants/router/route-constants";
import { Button, Card, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui";

export function WorkspaceOverview() {
  return (
    <div>
      <div className="flex w-full pb-4">
        <div className="hidden md:flex md:flex-1" />
        <div className="grid md:grid-cols-2 gap-4 w-full md:w-auto">
          <Link className="" href={RouteEnums.STUDENT_GRADING}>
            <Button className="w-full" size={"sm"}>
              Collate Student Results
              <FileCheck2 size={18} strokeWidth={1} />
            </Button>
          </Link>

          <Select value={String("")}>
            <SelectTrigger className="w-auto h-10">
              <SelectValue placeholder="Other Actions" />
            </SelectTrigger>
            <SelectContent>
              {["Apply for Leave", "Report an Issue"].map((item, idx) => (
                <SelectItem key={idx} value={String(item)}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="md:col-span-2 p-4 min-h-48"></Card>
        <Card className="p-4 min-h-48"></Card>
      </div>
    </div>
  );
}
