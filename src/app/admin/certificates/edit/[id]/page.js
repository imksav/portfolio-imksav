"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function EditCertificate({ params }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [id, setId] = useState(null);

  // Form State
  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("");
  const [category, setCategory] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Fetch Data
  useEffect(() => {
    async function load() {
      const resolvedParams = await params;
      setId(resolvedParams.id);

      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .eq("id", resolvedParams.id)
        .single();

      if (error) {
        router.push("/admin/certificates");
      } else {
        setTitle(data.title);
        setIssuer(data.issuer);
        setCategory(data.category);
        setIssueDate(data.issue_date || "");
        setImageUrl(data.image_url || "");
        setLoading(false);
      }
    }
    load();
  }, [params, router]);

  // Update Data
  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase
      .from("certificates")
      .update({
        title,
        issuer,
        category,
        issue_date: issueDate || null,
        image_url: imageUrl,
      })
      .eq("id", id);

    if (!error) router.push("/admin/certificates");
    else {
      alert(error.message);
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-8 pt-24">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/admin/certificates"
          className="flex items-center text-slate-500 mb-6"
        >
          <ArrowLeft size={20} className="mr-2" /> Cancel
        </Link>
        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          Edit Certificate
        </h1>

        <form
          onSubmit={handleUpdate}
          className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 space-y-4"
        >
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">
              Certificate Name
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                Issuer
              </label>
              <input
                type="text"
                value={issuer}
                onChange={(e) => setIssuer(e.target.value)}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">
              Issue Date
            </label>
            <input
              type="date"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">
              Image / Credential URL
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition flex justify-center items-center gap-2"
          >
            <Save size={20} /> Update Certificate
          </button>
        </form>
      </div>
    </div>
  );
}
