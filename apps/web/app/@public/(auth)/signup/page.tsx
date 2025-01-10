import AuthSignUpForm from "./_features/auth-signup-form";
import Link from "next/link";
import { RouteEnums } from "@/constants/router/route-constants";

export default function AuthSignUpPage() {
  return (
    <div className="w-full grid md:grid-cols-5 p-4 gap-4">
      <div />
      <div className="grid space-y-8 md:col-span-2 mt-20 max-w-xl">
        <div className="w-full space-y-2">
          <h4 className="font-heading text-3xl md:text-4xl font-bold">Get started with Kenia</h4>
          <p className="text-sm text-muted-foreground">Fill out this form to register your school</p>
        </div>
        <AuthSignUpForm />
      </div>
      <div className="flex md:col-span-2 md:justify-end h-min items-center gap-4">
        {/* <p className="text-sm text-muted-foreground text-nowrap md:border-l md:px-4 py-1"> */}
        {/*   Already have an account? */}
        {/* </p> */}
        {/* <Link href={RouteEnums.SIGNIN}> */}
        {/*   <Button size={"xs"} variant={"outline"}> */}
        {/*     Log in */}
        {/*   </Button> */}
        {/* </Link> */}

        <p className="text-sm">
          Already have an account?{" "}
          <Link href={RouteEnums.SIGNIN} className="font-semibold text-muted-foreground transition-colors hover:text-link underline pl-1">
            Log in.
          </Link>
        </p>
      </div>
    </div>
  );
}
