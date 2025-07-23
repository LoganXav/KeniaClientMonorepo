import Link from "next/link";
import { Button, Typography } from "@repo/ui";
import { captureException } from "@sentry/nextjs";
import { RouteEnums } from "@/constants/router/route-constants";

export default async function NotFoundPage({ error }: { error: Error }) {
  captureException(error);

  return (
    <div className="min-h-screen flex justify-center items-center flex-col space-y-4">
      <Typography size={"h1"} className="font-heading">
        404. Page Not Found Error.
      </Typography>
      <div className="grid text-center space-y-4">
        <p>This page has thrown a 404 error.</p>
        <Link href={RouteEnums.HOME}>
          <Button>Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
