import Link from "next/link";
import { Typography } from "@repo/ui";
import { RouteEnums } from "@/constants/router/route-constants";

export default function HomePage(): JSX.Element {
  return (
    <div className="h-screen container flex justify-center items-center flex-col space-y-4">
      <Typography size={"h1"} className="font-heading">
        Home Page.
      </Typography>
      <div className="flex flex-col text-center items-center">
        <p>To check out the authentication screens,</p>
        <p>
          Navigate to{" "}
          <Link href={RouteEnums.LOBBY} className="underline hover:text-link">
            Get Started
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}
