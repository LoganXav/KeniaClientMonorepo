import { RouteEnums } from "@/constants/router/route-constants";
import { getAuthUserAction } from "@/helpers/server/auth-user-action";
import { Button } from "@repo/ui";
import { captureException } from "@sentry/nextjs";
import Link from "next/link";

export default async function NotFoundPage({ error }: { error: Error }) {
  captureException(error);

  let redirectUrl;
  const authUser = await getAuthUserAction();

  if (authUser) {
    redirectUrl = RouteEnums.DASHBOARD;
  } else {
    redirectUrl = RouteEnums.HOME;
  }

  return (
    <div className="min-h-screen flex justify-center items-center flex-col space-y-4">
      <h5 className="text-5xl font-bold font-heading">404. Page Not Found Error.</h5>
      <div className="grid text-center space-y-4">
        <p>This page has thrown a 404 error.</p>
        <Link href={redirectUrl}>
          <Button>Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
