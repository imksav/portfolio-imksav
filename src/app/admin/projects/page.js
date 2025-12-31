"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { Trash2, Plus, Github, ExternalLink, Edit } from "lucide-react";

export default function ProjectManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    setProjects(data || []);
    setLoading(false);
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this project?")) return;

    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      alert("Error deleting project");
    } else {
      setProjects(projects.filter((p) => p.id !== id));
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8 pt-24">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">My Projects</h1>
          <Link
            href="/admin/projects/create"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            <Plus size={20} />
            Add Project
          </Link>
        </div>

        {loading && (
          <div className="text-center py-10">Loading projects...</div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-slate-900">
                    {project.title}
                  </h3>

                  <div className="flex gap-2">
                    {/* NEW: Edit Button */}
                    <Link
                      href={`/admin/projects/edit/${project.id}`}
                      className="text-slate-400 hover:text-green-600 transition p-1"
                    >
                      <Edit size={20} />
                    </Link>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="text-slate-400 hover:text-red-600 transition p-1"
                      title="Delete Project"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech_stack?.map((tech) => (
                    <span
                      key={tech}
                      className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-bold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="text-slate-500 text-sm mb-6 flex-grow">
                  {project.description}
                </p>

                {/* Footer Links */}
                <div className="flex gap-4 pt-4 border-t border-slate-100">
                  {project.repo_url && (
                    <a
                      href={project.repo_url}
                      target="_blank"
                      className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                    >
                      <Github size={16} /> Code
                    </a>
                  )}
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                    >
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
