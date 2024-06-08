import Image from "next/image"
import Providers from "./providers"

export default function AuthLayout({ children }: React.PropsWithChildren) {
  // TODO - Wrap with a session provider to bounce back if user is authenticated.
  return (
    <Providers>
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-3">
        <div className="bg-muted hidden lg:block">
          <Image
            src="/placeholder.svg"
            alt="placeholder-img"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
        <main className="w-full lg:col-span-2 bg-background flex items-center justify-center max-w-3xl py-12 container">
          {children}
        </main>
      </div>
    </Providers>
  )
}
