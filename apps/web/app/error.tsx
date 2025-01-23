"use client";

import { getAuthUserServer } from "@/helpers/server/auth-user-action";
import { Button } from "@repo/ui";
import { captureException } from "@sentry/nextjs";
import Link from "next/link";

export default async function ErrorPage({ error }: { error: Error }) {
  captureException(error);

  let redirectUrl;
  const authUser = await getAuthUserServer();
  if (authUser) {
    redirectUrl = "/dashboard";
  } else {
    redirectUrl = "/signin";
  }

  return (
    <div className="min-h-screen flex justify-center items-center flex-col space-y-4">
      <h5 className="text-5xl font-bold font-heading">500. Internal Server Error.</h5>
      <div className="grid text-center space-y-4">
        <p>This page has thrown a 500 error.</p>
        <Link href={redirectUrl}>
          <Button>Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
