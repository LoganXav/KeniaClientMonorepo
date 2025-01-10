import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-4">
      <Link
        href="/"
        className="bg-black hidden md:flex items-center justify-center"
      >
        <div className="w-[40rem] h-[40rem] relative">
          <Image
            src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/backgrounds/login-security.svg"
            fill
            alt="placeholder-img"
            className="h-full w-full object-center dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </Link>
      <main className="w-full md:col-span-3">{children}</main>
    </div>
  );
}
