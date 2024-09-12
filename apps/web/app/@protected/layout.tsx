import { ProtectedNavbar } from "@/layouts/navbar";
import ProtectedSidebar from "@/layouts/protected/sidebar";

export default function ProtectedLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <ProtectedNavbar />
      <div className="flex min-h-screen overflow-hidden">
        <ProtectedSidebar />
        <main className="flex-1 overflow-y-auto pt-16 h-screen">{children}</main>
      </div>
    </>
  );
}
