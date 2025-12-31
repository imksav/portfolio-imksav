import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export const revalidate = 0; // Ensure page always fetches fresh data

export default async function BlogPage() {
  // Fetch published posts
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Engineering Blog
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Insights on system architecture, backend engineering, and database
            optimization.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts?.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
            >
              {/* IMAGE SECTION */}
              <div className="h-56 w-full overflow-hidden relative bg-gray-200">
                {post.image_url ? (
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                    No Image
                  </div>
                )}
              </div>

              {/* CONTENT SECTION */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Tags */}
                <div className="flex gap-2 mb-3">
                  {post.tags?.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-grow">
                  {post.excerpt}
                </p>

                {/* Date */}
                <div className="pt-4 border-t border-gray-50 text-xs text-gray-400 font-medium">
                  {new Date(post.created_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {posts?.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No posts found.</p>
        )}
      </div>
    </div>
  );
}
