"use client";
import { UserRoundPen } from "lucide-react";

import { RouteEnums } from "@/constants/router/route-constants";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Button } from "@repo/ui";
import Link from "next/link";

export function ClassDivisionDetails({ classDivisionId }: { classDivisionId: number }) {
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
              {["Change Class Teacher", "Change Building"].map((item, idx) => (
                <SelectItem key={idx} value={String(item)}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Link href={`${RouteEnums.CLASS_DIVISION_CREATE}?id=${classDivisionId}`}>
            <Button className="w-full">
              Edit Class Division <UserRoundPen size={18} strokeWidth={1} />
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
