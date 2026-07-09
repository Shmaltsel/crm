import { useAuth } from "../context/AuthContext";
import OwnerDashboard from "../features/dashboard/OwnerDashboard";
import ManagerDashboard from "../features/dashboard/ManagerDashboard";
import StaffDashboard from "../features/dashboard/StaffDashboard";

export default function OverviewTab() {
  const { user } = useAuth();
  if (!user) return null;

  const role = user.role;
  if (role === "SUPERADMIN" || role === "OWNER") {
    return <OwnerDashboard />;
  }
  if (role === "MANAGER") {
    return <ManagerDashboard />;
  }
  return <StaffDashboard />;
}
