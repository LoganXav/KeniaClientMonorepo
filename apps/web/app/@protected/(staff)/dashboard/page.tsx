import LogoutButton from "@/components/logout-button";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="h-screen container flex justify-center items-center flex-col space-y-4">
      <h5 className="text-5xl font-bold font-heading">Dashboard Page.</h5>
      <div className="grid text-center space-y-4">
        <p>
          To check out the ui components, navigate to{" "}
          <Link href={"/test"} className="underline hover:text-link">
            Test page
          </Link>{" "}
        </p>
        <LogoutButton />
      </div>
    </div>
  );
}
