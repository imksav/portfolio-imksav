"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client"; // NEW CLIENT
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function EditPost({ params }) {
  const router = useRouter();
  const supabase = createClient(); // Initialize

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [id, setId] = useState(null);

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState("");

  // 1. Fetch Data
  useEffect(() => {
    async function loadPost() {
      // Unwrap params for Next.js 15 compatibility
      const resolvedParams = await params;
      const postId = resolvedParams.id;
      setId(postId);

      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", postId)
        .single();

      if (error) {
        alert("Error fetching post");
        router.push("/admin/blog");
      } else {
        setTitle(data.title);
        setSlug(data.slug);
        setContent(data.content);
        setExcerpt(data.excerpt || "");
        setImageUrl(data.image_url || "");
        setTags(data.tags ? data.tags.join(", ") : "");
        setLoading(false);
      }
    }
    loadPost();
  }, [params, router]); // Added dependencies

  // 2. Handle Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);

    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((t) => t.length > 0);

    const { error } = await supabase
      .from("posts")
      .update({
        title,
        slug,
        content,
        excerpt,
        image_url: imageUrl,
        tags: tagsArray,
      })
      .eq("id", id);

    if (error) {
      alert("Error updating post: " + error.message);
      setSaving(false);
    } else {
      router.push("/admin/blog");
    }
  };

  if (loading)
    return <div className="p-10 text-center">Loading post data...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-8 pt-24">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/admin/blog"
          className="flex items-center text-slate-500 hover:text-slate-800 mb-6 transition"
        >
          <ArrowLeft size={20} className="mr-2" />
          Cancel Edit
        </Link>

        <h1 className="text-3xl font-bold text-slate-900 mb-8">Edit Post</h1>

        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Title
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
                Slug
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

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Cover Image URL
            </label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Excerpt
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows="2"
              className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="12"
              className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition flex justify-center items-center gap-2"
          >
            {saving ? (
              "Updating..."
            ) : (
              <>
                <Save size={20} />
                Update Post
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
