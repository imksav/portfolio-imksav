"use client";
import { useState } from "react";
// FIX: Import new client
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function CreateProject() {
  const router = useRouter();
  // FIX: Initialize secure client
  const supabase = createClient();

  const [loading, setLoading] = useState(false);

  // State for all fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [techStack, setTechStack] = useState(""); // "React, Node"

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Convert "React, Next.js" string into ["React", "Next.js"] array
    const stackArray = techStack
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const { error } = await supabase.from("projects").insert([
      {
        title,
        description,
        image_url: imageUrl,
        repo_url: repoUrl,
        live_url: liveUrl,
        tech_stack: stackArray,
      },
    ]);

    if (error) {
      alert("Error: " + error.message);
      setLoading(false);
    } else {
      router.push("/admin/projects");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 pt-24">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/admin/projects"
          className="flex items-center text-slate-500 hover:text-slate-800 mb-6 transition"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Projects
        </Link>

        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          Add New Project
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-slate-200"
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Project Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. E-Commerce Dashboard"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="What does this project do?"
              required
            />
          </div>

          {/* Tech Stack */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Tech Stack (comma separated)
            </label>
            <input
              type="text"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="React, Tailwind, Supabase"
            />
          </div>

          {/* Links Row */}
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
                placeholder="https://github.com/..."
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
                placeholder="https://my-app.com"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Screenshot URL
            </label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="https://..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition flex justify-center items-center gap-2 mt-4"
          >
            {loading ? (
              "Saving..."
            ) : (
              <>
                <Save size={20} />
                Save Project
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
