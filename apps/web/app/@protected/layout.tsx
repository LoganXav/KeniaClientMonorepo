import { CallToActionPrompt } from "@/components/globals/call-to-action";
import ProtectedNavbar from "@/layouts/protected/navbar";
import ProtectedSidebar from "@/layouts/protected/sidebar";

export default function ProtectedLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <div className="relative flex">
        <ProtectedSidebar />
        <div className="relative w-full bg-background ml-[0px] lg:ml-[250px] flex-1">
          <ProtectedNavbar />
          <main className="container  min-h-[calc(100vh-70px)]">
            <div className="mt-4 mb-8">
              <CallToActionPrompt />
            </div>
            <div>{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
