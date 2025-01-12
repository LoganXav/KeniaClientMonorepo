import { Button } from "@repo/ui";
import AuthSignInForm from "./_features/auth-signin-form";
import Link from "next/link";
import { RouteEnums } from "@/constants/router/route-constants";
import { Earth } from "lucide-react";

export default function AuthSignInPage() {
  return (
    <>
      <div className="w-full grid lg:grid-cols-4 xl:grid-cols-5 p-4 gap-4">
        <div className="hidden lg:flex xl:col-span-1" />
        <div className="grid space-y-8 lg:col-span-2 xl:col-span-2 mt-20 max-w-xl">
          <div className="w-full space-y-2">
            <h4 className="font-heading text-3xl md:text-4xl font-bold">Continue with Kenia</h4>
            <p className="text-sm text-muted-foreground">Log in to your school</p>
          </div>
          <AuthSignInForm />
        </div>

        <div className="flex xl:col-span-2 xl:justify-end h-min items-center gap-4">
          <Earth size={15} />
          <p className="border-l border-foreground pl-4 text-sm">
            Want to register a new school?{" "}
            <Link href={RouteEnums.SIGNUP} className="font-semibold text-muted-foreground transition-colors hover:text-link underline pl-1">
              Sign up.
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
