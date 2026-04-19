import { Navigate } from "react-router-dom";
import { isLoggedIn } from "@/lib/adminAuth";

const AdminProtected = ({ children }: { children: React.ReactNode }) => {
  if (!isLoggedIn()) return <Navigate to="/manage/login" replace />;
  return <>{children}</>;
};

export default AdminProtected;
