import { Link, useNavigate } from "react-router-dom";
import { LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getAdminUser, logout } from "@/lib/adminAuth";

const AdminTopBar = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const navigate = useNavigate();
  const user = getAdminUser();

  const handleLogout = () => {
    logout();
    navigate("/manage/login");
  };

  return (
    <header
      className="sticky top-0 z-40 flex h-[52px] items-center justify-between px-4 text-white"
      style={{ backgroundColor: "#1A1918" }}
    >
      <div className="flex items-center gap-3">
        <button
          className="md:hidden text-white/80 hover:text-white"
          onClick={onMenuClick}
          aria-label="Meniu"
        >
          <Menu size={20} />
        </button>
        <Link to="/manage" className="flex items-center gap-2">
          <span className="font-semibold tracking-tight">GhidBeauty.ro</span>
          <Badge className="bg-primary text-primary-foreground hover:bg-primary">Admin</Badge>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        {user && (
          <>
            <span className="text-sm text-white/80 hidden sm:inline">{user.name}</span>
            <Badge variant="outline" className="border-white/30 text-white/90 hidden sm:inline-flex">
              {user.role}
            </Badge>
          </>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="text-white/80 hover:text-white hover:bg-white/10"
          onClick={handleLogout}
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
};

export default AdminTopBar;
