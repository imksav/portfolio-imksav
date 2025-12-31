"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client"; // NEW CLIENT
import Link from "next/link";
import { Trash2, Plus, Eye, Edit } from "lucide-react";

export default function BlogManager() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize secure client
  const supabase = createClient();

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    setPosts(data || []);
    setLoading(false);
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this post?")) return;

    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) {
      alert("Error deleting post: " + error.message);
    } else {
      setPosts(posts.filter((post) => post.id !== id));
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8 pt-24">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Blog Posts</h1>
          <Link
            href="/admin/blog/create"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            <Plus size={20} />
            Create New Post
          </Link>
        </div>

        {/* Loading State */}
        {loading && <div className="text-center py-10">Loading posts...</div>}

        {/* Posts Table */}
        {!loading && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider border-b border-slate-200">
                  <th className="p-4 font-medium">Title</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50 transition">
                    <td className="p-4 font-medium text-slate-800">
                      {post.title}
                      <div className="text-xs text-gray-400 font-normal truncate max-w-xs">
                        {post.slug}
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 text-xs font-bold rounded-full ${
                          post.published
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {post.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-slate-500">
                      {new Date(post.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right flex justify-end gap-3">
                      {/* View Button */}
                      <a
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="text-slate-400 hover:text-blue-600 transition"
                      >
                        <Eye size={20} />
                      </a>

                      {/* Edit Button */}
                      <Link
                        href={`/admin/blog/edit/${post.id}`}
                        className="text-slate-400 hover:text-green-600 transition"
                      >
                        <Edit size={20} />
                      </Link>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="text-slate-400 hover:text-red-600 transition"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {posts.length === 0 && (
              <div className="p-8 text-center text-gray-400">
                No posts found. Create one!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
