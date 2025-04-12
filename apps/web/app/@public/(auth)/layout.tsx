import { RouteEnums } from "@/constants/router/route-constants";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-5">
      <div className="hidden md:flex items-center justify-center flex-col w-full border-r border-border">
        <div className="hidden 2xl:flex 2xl:h-1/3 bg-card w-full p-4">
          <div className="w-full space-y-8">
            <Link href={RouteEnums.HOME} className="font-heading text-2xl font-bold">
              KENIA .
            </Link>
            <div className="space-y-4">
              <h4 className="font-heading text-3xl font-bold">Empowering education through technology</h4>
              <p className="text-sm text-muted-foreground">Join the platform designed to connect students and educators, simplifying learning and school management.</p>
            </div>
          </div>
        </div>
        <div className="relative h-full 2xl:h-2/3 bg-card w-full">
          <Image src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/backgrounds/login-security.svg" fill alt="placeholder-img" className="w-full object-center dark:brightness-[0.2] dark:grayscale" />
        </div>
      </div>
      <main className="w-full md:col-span-4">{children}</main>
    </div>
  );
}
