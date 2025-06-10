"use client";

import { StaffType } from "@/types";
import { Card, cn, Typography } from "@repo/ui";

type TabProps = {
  staff?: StaffType;
};

export function StaffDetailsSalaryTab({ staff }: TabProps) {
  return (
    <div className="space-y-4">
      <Card>
        <div className="p-4 border-b font-heading uppercase text-sm">Salary Information</div>
        <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: "Base Salary", value: "$3,500 / month" },
            { label: "Allowances", value: "$500 (Housing, Transport)" },
            { label: "Tax Deductions", value: "$350" },
            { label: "Net Salary", value: "$3,650" },
            { label: "Bank Name", value: "Example Bank Ltd." },
            { label: "Account Number", value: "0123456789" },
          ].map((item, index) => (
            <div key={index} className="space-y-2">
              <Typography size="small" color="muted">
                {item.label}
              </Typography>
              <Typography>{item.value}</Typography>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div className="p-4 border-b font-heading uppercase text-sm">Payment History</div>
        <div className="p-4 space-y-4">
          {[
            { month: "April 2025", amount: "$3,650", status: "Paid", date: "2025-04-30" },
            { month: "March 2025", amount: "$3,650", status: "Paid", date: "2025-03-31" },
            { month: "February 2025", amount: "$3,650", status: "Paid", date: "2025-02-28" },
          ].map((payment, index) => (
            <div key={index} className={cn("grid md:grid-cols-4 p-3", index <= 1 && "border-b")}>
              <div>
                <Typography size="small" color="muted">
                  Month
                </Typography>
                <Typography>{payment.month}</Typography>
              </div>
              <div>
                <Typography size="small" color="muted">
                  Amount
                </Typography>
                <Typography>{payment.amount}</Typography>
              </div>
              <div>
                <Typography size="small" color="muted">
                  Status
                </Typography>
                <Typography>{payment.status}</Typography>
              </div>
              <div>
                <Typography size="small" color="muted">
                  Payment Date
                </Typography>
                <Typography>{payment.date}</Typography>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
