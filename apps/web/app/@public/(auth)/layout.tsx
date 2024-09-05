import Image from "next/image";
import Link from "next/link";
import PlaceholderSvg from "@/public/placeholder.svg";

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="h-screen grid grid-cols-1 lg:grid-cols-2">
      <Link href="/" className="bg-muted hidden lg:block">
        <Image src="" alt="placeholder-img" className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
      </Link>
      <main className="w-full bg-background flex items-center justify-center max-w-3xl container">{children}</main>
    </div>
  );
}
