import { Card, Typography } from "@repo/ui";
import React from "react";

type Props = {};

function StaffDetailsPersonalInfoTab({}: Props) {
  return (
    <div className="space-y-4">
      <Card>
        <Typography size="small" className="p-4 border-b font-heading uppercase">
          Profile Details
        </Typography>
        <Typography className="p-4">Details</Typography>
      </Card>
      <Card>
        <Typography size="small" className="p-4 border-b font-heading uppercase">
          Address
        </Typography>
        <Typography className="p-4">Address</Typography>
      </Card>
      <Card>
        <Typography size="small" className="p-4 border-b font-heading uppercase">
          Work Details
        </Typography>
        <Typography className="p-4">Details</Typography>
      </Card>
      <Card>
        <Typography size="small" className="p-4 border-b font-heading uppercase">
          Social Media
        </Typography>
        <Typography className="p-4">Links</Typography>
      </Card>
    </div>
  );
}

export { StaffDetailsPersonalInfoTab };
