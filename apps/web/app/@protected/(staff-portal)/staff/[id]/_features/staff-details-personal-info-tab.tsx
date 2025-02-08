import { Card } from "@repo/ui";
import React from "react";

type Props = {};

function StaffDetailsPersonalInfoTab({}: Props) {
  return (
    <div>
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
    </div>
  );
}

export { StaffDetailsPersonalInfoTab };
