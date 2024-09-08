import { RouteEnums } from "@/constants/router/route-constants";
import Link from "next/link";

export default function HomePage(): JSX.Element {
  return (
    <div className="h-screen container flex justify-center items-center flex-col space-y-4">
      <h5 className="text-5xl font-bold font-heading">Home Page.</h5>
      <div className="flex flex-col text-center items-center">
        <p>To check out the authentication screens,</p>
        <p>
          Navigate to{" "}
          <Link href={RouteEnums.SIGNUP} className="underline hover:text-link">
            Sign up
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}
