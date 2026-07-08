import { lazy, Suspense } from "react";
import { useAuth } from "../context/AuthContext";

const StaffDashboard = lazy(() => import("../features/dashboard/StaffDashboard"));
const ManagerDashboard = lazy(() => import("../features/dashboard/ManagerDashboard"));
const OwnerDashboard = lazy(() => import("../features/dashboard/OwnerDashboard"));

function PageLoader() {
  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="mb-6">
        <div className="h-8 bg-slate-200 rounded-xl w-48 animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 bg-white rounded-2xl border border-slate-100 animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return <PageLoader />;

  const role = user.role;

  return (
    <Suspense fallback={<PageLoader />}>
      {role === "SUPERADMIN" || role === "OWNER" ? (
        <OwnerDashboard />
      ) : role === "MANAGER" ? (
        <ManagerDashboard />
      ) : (
        <StaffDashboard />
      )}
    </Suspense>
  );
}
