"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function EditProject({ params }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [id, setId] = useState(null);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [techStack, setTechStack] = useState("");

  // 1. Fetch Data
  useEffect(() => {
    async function loadProject() {
      const resolvedParams = await params;
      const projectId = resolvedParams.id;
      setId(projectId);

      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .single();

      if (error) {
        alert("Error fetching project");
        router.push("/admin/projects");
      } else {
        setTitle(data.title);
        setDescription(data.description);
        setImageUrl(data.image_url || "");
        setRepoUrl(data.repo_url || "");
        setLiveUrl(data.live_url || "");
        setTechStack(data.tech_stack ? data.tech_stack.join(", ") : "");
        setLoading(false);
      }
    }
    loadProject();
  }, [params, router]);

  // 2. Handle Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);

    const stackArray = techStack
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const { error } = await supabase
      .from("projects")
      .update({
        title,
        description,
        image_url: imageUrl,
        repo_url: repoUrl,
        live_url: liveUrl,
        tech_stack: stackArray,
      })
      .eq("id", id);

    if (error) {
      alert("Error updating: " + error.message);
      setSaving(false);
    } else {
      router.push("/admin/projects");
    }
  };

  if (loading)
    return <div className="p-10 text-center">Loading project...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-8 pt-24">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/admin/projects"
          className="flex items-center text-slate-500 hover:text-slate-800 mb-6 transition"
        >
          <ArrowLeft size={20} className="mr-2" />
          Cancel Edit
        </Link>

        <h1 className="text-3xl font-bold text-slate-900 mb-8">Edit Project</h1>

        <form
          onSubmit={handleUpdate}
          className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-slate-200"
        >
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Project Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Tech Stack
            </label>
            <input
              type="text"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                GitHub Repo URL
              </label>
              <input
                type="url"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Live Demo URL
              </label>
              <input
                type="url"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Screenshot URL
            </label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition flex justify-center items-center gap-2 mt-4"
          >
            {saving ? (
              "Saving Changes..."
            ) : (
              <>
                <Save size={20} />
                Update Project
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
