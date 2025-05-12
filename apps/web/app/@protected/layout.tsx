import ProtectedNavbar from "@/layouts/protected/navbar";
import ProtectedSidebar from "@/layouts/protected/sidebar";
import ClientWrapperProvider from "@/providers/client-wrapper-provider";
import { CallToActionPrompt } from "@/components/globals/call-to-action";

export default function ProtectedLayout({ children }: React.PropsWithChildren) {
  return (
    <ClientWrapperProvider>
      <div className="relative flex">
        <ProtectedSidebar />
        <div className="relative w-full bg-background ml-[0px] lg:ml-[250px] flex-1">
          <ProtectedNavbar />
          <main className="container min-h-[calc(100vh-70px)]">
            <div className="mt-4">
              <CallToActionPrompt />
            </div>
            <div className="py-8">{children}</div>
          </main>
        </div>
      </div>
    </ClientWrapperProvider>
  );
}
