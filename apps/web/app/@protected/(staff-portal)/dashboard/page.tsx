import Link from "next/link";
import { Typography } from "@repo/ui";

export default function DashboardPage() {
  return (
    <div className="flex justify-center items-center flex-col space-y-2">
      <Typography size="h1" weight="bold" className="font-heading">
        Dashboard Page.
      </Typography>
      <div className="grid text-center space-y-2">
        <Typography>
          To check out the ui components, navigate to{" "}
          <Link href={"/test"} className="underline hover:text-link">
            Test page
          </Link>
        </Typography>
      </div>
    </div>
  );
}
