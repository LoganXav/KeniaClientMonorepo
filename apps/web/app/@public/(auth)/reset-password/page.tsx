import Link from "next/link";
import AuthResetPasswordRequestForm from "./_features/auth-reset-password-form";
import { Button, Typography } from "@repo/ui";
import { RouteEnums } from "@/constants/router/route-constants";
import { Earth } from "lucide-react";

export default function AuthResetPasswordPage() {
  return (
    <>
      <div className="w-full grid lg:grid-cols-4 xl:grid-cols-5 p-4 gap-4">
        <div className="hidden lg:flex xl:col-span-1" />
        <div className="grid space-y-8 lg:col-span-2 xl:col-span-2 mt-20 max-w-xl">
          <div className="w-full space-y-2">
            <Typography size={"h2"} className="font-heading">
              Forgot your password?
            </Typography>
            <Typography color={"muted"} className="max-w-sm">
              Please enter the email address associated with your account and we will email you a confirmation code to reset your password.
            </Typography>
          </div>
          <AuthResetPasswordRequestForm />
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
