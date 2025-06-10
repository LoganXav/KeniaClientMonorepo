"use client";

import React from "react";
import { StaffType } from "@/types";
import { Card, Typography } from "@repo/ui";

type TabProps = {
  staff?: StaffType;
};

export function StaffDetailsPersonalInfoTab({ staff }: TabProps) {
  return (
    <div className="space-y-4">
      <Card>
        <Typography size="small" className="p-4 border-b font-heading uppercase">
          Profile Details
        </Typography>
        <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: "Full Name", value: "Jane Doe" },
            { label: "Date of Birth", value: "1990-06-15" },
            { label: "Gender", value: "Female" },
            { label: "National ID (NIN)", value: "C1234567890" },
            { label: "Tax ID (TIN)", value: "TIN789456123" },
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
        <Typography size="small" className="p-4 border-b font-heading uppercase">
          Address
        </Typography>
        <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: "Street", value: "123 Example Street" },
            { label: "City", value: "Exampleville" },
            { label: "State", value: "Exampleshire" },
            { label: "Postal Code", value: "45678" },
            { label: "Country", value: "Exampleland" },
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
        <Typography size="small" className="p-4 border-b font-heading uppercase">
          Work Details
        </Typography>
        <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: "Job Title", value: "Senior Lecturer" },
            { label: "Department", value: "Computer Science" },
            { label: "Employment Type", value: "Full-Time" },
            { label: "Start Date", value: "2018-09-01" },
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
        <Typography size="small" className="p-4 border-b font-heading uppercase">
          Social Media
        </Typography>
        <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: "LinkedIn", value: "linkedin.com/in/janedoe" },
            { label: "Twitter", value: "@janedoe" },
            { label: "Personal Website", value: "www.janedoe.dev" },
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
    </div>
  );
}
