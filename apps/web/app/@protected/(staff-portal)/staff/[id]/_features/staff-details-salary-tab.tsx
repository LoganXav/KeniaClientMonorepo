"use client";

import { StaffType } from "@/types";
import { Card } from "@repo/ui";

type TabProps = {
  staff?: StaffType;
};

export function StaffDetailsSalaryTab({ staff }: TabProps) {
  return (
    <div className="space-y-4">
      <Card>
        <div className="p-4 border-b font-heading uppercase text-sm">Salary Information</div>
        <div className="p-4">{/* Salary details content */}</div>
      </Card>

      <Card>
        <div className="p-4 border-b font-heading uppercase text-sm">Payment History</div>
        <div className="p-4">{/* Payment history content */}</div>
      </Card>
    </div>
  );
}
