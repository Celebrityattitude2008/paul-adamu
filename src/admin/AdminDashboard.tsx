import { useEffect, useState } from "react";
import { LogOut, Pencil, Plus, Shield, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { subscribeToProjects, createProject, updateProject, deleteProject } from "@/lib/projects";
import type { Project, ProjectInput } from "@/lib/types";
import { ProjectForm } from "./ProjectForm";

export function AdminDashboard() {
  const { user, logOut } = useAuth();
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [mode, setMode] = useState<"list" | "create" | "edit">("list");
  const [editing, setEditing] = useState<Project | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeToProjects(setProjects, (e) => setError(e.message));
    return unsub;
  }, []);

  const handleCreate = async (data: ProjectInput) => {
    setSubmitting(true);
    setError(null);
    try {
      await createProject(data);
      setMode("list");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create project.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (data: ProjectInput) => {
    if (!editing) return;
    setSubmitting(true);
    setError(null);
    try {
      await updateProject(editing.id, data);
      setMode("list");
      setEditing(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save changes.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (project: Project) => {
    if (!confirm(`Delete "${project.title}"? This can't be undone.`)) return;
    try {
      await deleteProject(project.id);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete project.");
    }
  };

  return (
    <div
      className="min-h-screen px-6 md:px-12 py-10"
      style={{ background: "#0d1117", color: "#f0f6fc", fontFamily: "'Inter', sans-serif" }}
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(0,255,204,0.12)", border: "1px solid rgba(0,255,204,0.35)" }}
            >
              <Shield size={18} style={{ color: "#00ffcc" }} />
            </div>
            <div>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "1.1rem", fontWeight: 700 }}>
                Work Admin
              </h1>
              <p style={{ fontSize: "0.75rem", color: "#8b949e" }}>{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {mode === "list" && (
              <button
                onClick={() => setMode("create")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
                style={{ background: "#00ffcc", color: "#0d1117" }}
              >
                <Plus size={15} /> New Project
              </button>
            )}
            <button
              onClick={logOut}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm"
              style={{ background: "transparent", border: "1px solid rgba(240,246,252,0.2)", color: "#f0f6fc" }}
            >
              <LogOut size={15} /> Sign out
            </button>
          </div>
        </div>

        {error && (
          <p
            className="text-sm rounded-lg px-4 py-3"
            style={{ background: "rgba(248,81,73,0.1)", border: "1px solid rgba(248,81,73,0.3)", color: "#f85149" }}
          >
            {error}
          </p>
        )}

        {mode === "create" && (
          <ProjectForm
            onSubmit={handleCreate}
            onCancel={() => setMode("list")}
            submitting={submitting}
          />
        )}

        {mode === "edit" && editing && (
          <ProjectForm
            initial={editing}
            onSubmit={handleUpdate}
            onCancel={() => {
              setMode("list");
              setEditing(null);
            }}
            submitting={submitting}
          />
        )}

        {mode === "list" && (
          <>
            {projects === null && (
              <p style={{ color: "#8b949e", fontSize: "0.85rem" }}>Loading projects…</p>
            )}

            {projects !== null && projects.length === 0 && (
              <div
                className="text-center py-20 rounded-2xl"
                style={{ background: "#161b22", border: "1px dashed rgba(0,255,204,0.2)" }}
              >
                <p style={{ color: "#8b949e", fontSize: "0.9rem" }}>
                  No projects yet — the Work section is empty on the live site.
                </p>
                <button
                  onClick={() => setMode("create")}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
                  style={{ background: "#00ffcc", color: "#0d1117" }}
                >
                  <Plus size={15} /> Add your first project
                </button>
              </div>
            )}

            {projects && projects.length > 0 && (
              <div className="flex flex-col gap-3">
                {projects.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-4 p-4 rounded-xl"
                    style={{ background: "#161b22", border: "1px solid rgba(0,255,204,0.08)" }}
                  >
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="w-16 h-12 object-cover rounded-lg flex-shrink-0"
                      style={{ border: "1px solid rgba(0,255,204,0.15)" }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm truncate">{p.title}</span>
                        {p.featured && (
                          <span
                            className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                            style={{ background: "rgba(0,255,204,0.12)", color: "#00ffcc" }}
                          >
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-xs truncate" style={{ color: "#8b949e" }}>
                        {p.tag} · {p.year}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setEditing(p);
                        setMode("edit");
                      }}
                      className="p-2 rounded-lg flex-shrink-0"
                      style={{ background: "rgba(0,112,243,0.1)", color: "#0070f3" }}
                      aria-label="Edit"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(p)}
                      className="p-2 rounded-lg flex-shrink-0"
                      style={{ background: "rgba(248,81,73,0.1)", color: "#f85149" }}
                      aria-label="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
