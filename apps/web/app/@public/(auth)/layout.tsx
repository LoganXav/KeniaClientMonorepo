import Link from "next/link";
import Image from "next/image";
import { Typography } from "@repo/ui";
import { RouteEnums } from "@/constants/router/route-constants";

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-5">
      <div className="hidden md:flex items-center justify-center flex-col w-full border-r border-border">
        <div className="hidden 2xl:flex 2xl:h-1/3 bg-card w-full p-4">
          <div className="w-full space-y-8">
            <Link href={RouteEnums.HOME} className="font-heading">
              <Typography size={"h4"}>KENIA .</Typography>
            </Link>
            <div className="space-y-4">
              <Typography size={"h3"} className="font-heading">
                Empowering education through technology
              </Typography>
              <Typography color={"muted"}>Join the platform designed to connect students and educators, simplifying learning and school management.</Typography>
            </div>
          </div>
        </div>
        <div className="relative h-full 2xl:h-2/3 bg-card w-full">
          <Image src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/backgrounds/login-security.svg" fill alt="placeholder-img" className="w-full object-center" />
        </div>
      </div>
      <main className="w-full md:col-span-4">{children}</main>
    </div>
  );
}
