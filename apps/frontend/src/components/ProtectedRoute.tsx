import { Navigate } from "react-router-dom";

interface Props {
  allowedRoles: string[];
  children: React.ReactNode;
}

function getCurrentUserRole(): string | null {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw).role : null;
  } catch {
    return null;
  }
}

export default function ProtectedRoute({ allowedRoles, children }: Props) {
  const role = getCurrentUserRole();
  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
}
