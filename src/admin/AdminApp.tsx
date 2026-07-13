import { useAuth } from "@/hooks/useAuth";
import { AdminLogin } from "./AdminLogin";
import { AdminDashboard } from "./AdminDashboard";

export default function AdminApp() {
  const { loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#0d1117", color: "#8b949e" }}
      >
        Loading…
      </div>
    );
  }

  return isAdmin ? <AdminDashboard /> : <AdminLogin />;
}
