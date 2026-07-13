import { Chrome, Shield, ShieldAlert } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { firebaseEnabled } from "@/lib/firebase";

export function AdminLogin() {
  const { user, isAdmin, error, signIn, logOut } = useAuth();

  const wrongAccount = !!user && !isAdmin;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "#0d1117", color: "#f0f6fc", fontFamily: "'Inter', sans-serif" }}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-8 flex flex-col items-center gap-6 text-center"
        style={{ background: "#161b22", border: "1px solid rgba(0,255,204,0.15)" }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background: "rgba(0,255,204,0.12)", border: "1px solid rgba(0,255,204,0.3)" }}
        >
          {wrongAccount ? (
            <ShieldAlert size={26} style={{ color: "#f85149" }} />
          ) : (
            <Shield size={26} style={{ color: "#00ffcc" }} />
          )}
        </div>

        <div>
          <h1
            style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "1.3rem", fontWeight: 700, color: "#f0f6fc" }}
          >
            Admin Access
          </h1>
          <p className="mt-2 text-sm" style={{ color: "#8b949e" }}>
            Sign in with the authorized Google account to manage Work section projects.
          </p>
        </div>

        {!firebaseEnabled && (
          <p
            className="text-xs rounded-lg px-3 py-2"
            style={{ background: "rgba(248,81,73,0.1)", border: "1px solid rgba(248,81,73,0.3)", color: "#f85149" }}
          >
            Firebase isn't configured yet. Add the Firebase env vars, then restart.
          </p>
        )}

        {wrongAccount && (
          <p
            className="text-xs rounded-lg px-3 py-2"
            style={{ background: "rgba(248,81,73,0.1)", border: "1px solid rgba(248,81,73,0.3)", color: "#f85149" }}
          >
            Signed in as {user?.email}. This account isn't authorized for admin access.
          </p>
        )}

        {error && (
          <p
            className="text-xs rounded-lg px-3 py-2"
            style={{ background: "rgba(248,81,73,0.1)", border: "1px solid rgba(248,81,73,0.3)", color: "#f85149" }}
          >
            {error}
          </p>
        )}

        {wrongAccount ? (
          <button
            onClick={logOut}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-sm"
            style={{ background: "transparent", border: "1px solid rgba(240,246,252,0.2)", color: "#f0f6fc" }}
          >
            Sign out
          </button>
        ) : (
          <button
            onClick={signIn}
            disabled={!firebaseEnabled}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: "#00ffcc", color: "#0d1117" }}
          >
            <Chrome size={16} /> Sign in with Google
          </button>
        )}
      </div>
    </div>
  );
}
