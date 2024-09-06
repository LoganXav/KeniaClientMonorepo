import Image from "next/image";
import Link from "next/link";
import PlaceholderSvg from "@/public/placeholder.svg";

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2">
      <Link href="/" className="bg-muted hidden md:block">
        <Image src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/backgrounds/login-security.svg" width={100} height={100} alt="placeholder-img" className="h-full w-full object-center dark:brightness-[0.2] dark:grayscale" />
      </Link>
      <main className="w-full bg-background flex items-center justify-center max-w-3xl container">{children}</main>
    </div>
  );
}
