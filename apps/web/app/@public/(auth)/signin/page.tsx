import { Button } from "@repo/ui";
import AuthSignInForm from "./_features/auth-signin-form";
import Link from "next/link";
import { RouteEnums } from "@/constants/router/route-constants";

export default function AuthSignInPage() {
  return (
    <>
      <div className="w-full grid md:grid-cols-5 p-4 gap-4">
        <div />
        <div className="grid space-y-8 md:col-span-2 mt-20 max-w-xl">
          <div className="w-full space-y-2">
            <h4 className="font-heading text-3xl md:text-4xl font-bold">Continue with Kenia</h4>
            <p className="text-sm text-muted-foreground">Log in to your school</p>
          </div>
          <AuthSignInForm />
        </div>

        <div className="flex md:col-span-2 md:justify-end h-min items-center gap-4">
          {/* <p className="text-sm text-muted-foreground text-nowrap border-l px-4 py-1"> */}
          {/*   Don't have an account? */}
          {/* </p> */}
          {/* <Link href={RouteEnums.SIGNUP}> */}
          {/*   <Button size={"xs"} variant={"outline"}> */}
          {/*     Sign up */}
          {/*   </Button> */}
          {/* </Link> */}

          <p className="text-sm">
            Don't have an account?{" "}
            <Link href={RouteEnums.SIGNUP} className="font-semibold text-muted-foreground transition-colors hover:text-link underline pl-1">
              Sign up.
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
