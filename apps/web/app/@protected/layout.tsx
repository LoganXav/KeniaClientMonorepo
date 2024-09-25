import ProtectedNavbar from "@/layouts/protected/navbar";
import ProtectedSidebar from "@/layouts/protected/sidebar";

export default function ProtectedLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <div className="relative flex">
        <ProtectedSidebar />
        <div className="relative w-full bg-background ml-[0px] lg:ml-[250px] flex-1">
          <ProtectedNavbar />
          <main className="container mt-12 min-h-[calc(100vh-70px)]">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
