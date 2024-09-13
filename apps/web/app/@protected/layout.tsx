import ProtectedNavbar from "@/layouts/protected/navbar";
import ProtectedSidebar from "@/layouts/protected/sidebar";

export default function ProtectedLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <div className="flex">
        <ProtectedSidebar />
        <div className="relative w-full bg-primary ml-[250px] flex-1">
          <ProtectedNavbar />
          <main className="bg-background">{children}</main>
        </div>
      </div>
    </>
  );
}
