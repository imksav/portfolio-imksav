import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag, Clock, User } from "lucide-react";

export const revalidate = 0;

export default async function SinglePost({ params }) {
  // 1. Await Params (Next.js 15 Fix)
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // 2. Fetch Data
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!post) return <div className="text-center py-20">Post not found</div>;

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* --- HERO SECTION --- */}
      <div className="relative w-full h-[60vh] min-h-[400px] bg-slate-900 flex items-end">
        {/* Background Image */}
        {post.image_url ? (
          <>
            <img
              src={post.image_url}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-slate-900" />
        )}

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 w-full pb-12">
          <Link
            href="/blog"
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition group"
          >
            <ArrowLeft
              size={20}
              className="mr-2 group-hover:-translate-x-1 transition-transform"
            />
            Back to Blog
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="bg-blue-600/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg">
            {post.title}
          </h1>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm font-medium">
            <div className="flex items-center gap-2">
              <User size={18} />
              <span>Keshav Bhandari</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>
                {new Date(post.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            {/* Estimate Read Time (Rough calc: 200 words per minute) */}
            <div className="flex items-center gap-2 opacity-80">
              <Clock size={18} />
              <span>
                {Math.max(1, Math.ceil(post.content.split(" ").length / 200))}{" "}
                min read
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <article className="max-w-3xl mx-auto px-4 -mt-10 relative z-20">
        {/* The Excerpt (Lead Paragraph) */}
        {post.excerpt && (
          <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100 mb-10">
            <p className="text-xl text-slate-600 italic leading-relaxed font-serif border-l-4 border-blue-500 pl-4">
              "{post.excerpt}"
            </p>
          </div>
        )}

        {/* Main Content */}
        <div className="prose prose-lg prose-slate max-w-none bg-white p-4 md:p-0">
          {/* whitespace-pre-wrap ensures new lines in DB are respected */}
          <div className="whitespace-pre-wrap text-slate-800 leading-8">
            {post.content}
          </div>
        </div>

        {/* Divider */}
        <hr className="my-12 border-slate-200" />

        {/* Footer of Post */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <span className="text-slate-500 text-sm">Tags:</span>
            {post.tags?.map((tag) => (
              <span key={tag} className="text-slate-700 font-semibold text-sm">
                #{tag}
              </span>
            ))}
          </div>
          <Link
            href="/blog"
            className="text-blue-600 font-semibold hover:underline"
          >
            Read Next Article →
          </Link>
        </div>
      </article>
    </div>
  );
}
