import { useState } from "react";
import AdminTopBar from "./AdminTopBar";
import AdminSidebar from "./AdminSidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <AdminTopBar onMenuClick={() => setMobileOpen(true)} />
      <div className="flex flex-1 min-h-0">
        <div className="hidden md:block sticky top-[52px] h-[calc(100vh-52px)]">
          <AdminSidebar />
        </div>
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="p-0 w-[240px]">
            <AdminSidebar onNavigate={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>
        <main className="flex-1 min-w-0 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
