"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function CreatePost() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState(""); // Comma separated string

  // Auto-generate slug from title
  const handleTitleChange = (e) => {
    const val = e.target.value;
    setTitle(val);
    // Convert "Hello World" -> "hello-world"
    setSlug(
      val
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "")
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Convert tags string "React, Nextjs" -> Array ["React", "Nextjs"]
    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const { error } = await supabase.from("posts").insert([
      {
        title,
        slug,
        content,
        excerpt,
        image_url: imageUrl,
        tags: tagsArray,
        published: true,
      },
    ]);

    if (error) {
      alert("Error creating post: " + error.message);
      setLoading(false);
    } else {
      router.push("/admin/blog"); // Go back to list
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 pt-24">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/admin/blog"
          className="flex items-center text-slate-500 hover:text-slate-800 mb-6 transition"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Manager
        </Link>

        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          Write New Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title & Slug */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g. My New Tutorial"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Slug (URL)
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full p-3 rounded-lg border border-slate-300 bg-slate-100 text-slate-500 font-mono text-sm"
                required
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Cover Image URL
            </label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="https://..."
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Excerpt (Short Summary)
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows="2"
              className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="A brief preview shown on the card..."
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Main Content (Markdown supported)
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="12"
              className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
              placeholder="Write your article here..."
              required
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="React, Database, Tutorial"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition flex justify-center items-center gap-2"
          >
            {loading ? (
              "Publishing..."
            ) : (
              <>
                <Save size={20} />
                Publish Post
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
