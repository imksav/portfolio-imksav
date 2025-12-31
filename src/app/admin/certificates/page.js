"use client";
import { useEffect, useState } from "react";
// FIX: Import secure client
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Trash2, Plus, Edit, ExternalLink } from "lucide-react";

export default function CertificateManager() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  // FIX: Initialize secure client
  const supabase = createClient();

  useEffect(() => {
    fetchCerts();
  }, []);

  async function fetchCerts() {
    setLoading(true);
    const { data } = await supabase
      .from("certificates")
      .select("*")
      .order("issue_date", { ascending: false });
    setCerts(data || []);
    setLoading(false);
  }

  async function handleDelete(id) {
    if (!confirm("Delete this certificate?")) return;

    const { error } = await supabase.from("certificates").delete().eq("id", id);

    if (!error) {
      setCerts(certs.filter((c) => c.id !== id));
    } else {
      alert("Error deleting: " + error.message);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Certificates</h1>
          <Link
            href="/admin/certificates/create"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={20} /> Add Certificate
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm uppercase">
                <tr>
                  <th className="p-4">Title / Issuer</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {certs.map((cert) => (
                  <tr key={cert.id} className="hover:bg-slate-50 transition">
                    <td className="p-4">
                      <div className="font-bold text-slate-800">
                        {cert.title}
                      </div>
                      <div className="text-sm text-slate-500">
                        {cert.issuer}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-xs bg-slate-100 px-2 py-1 rounded font-semibold text-slate-600">
                        {cert.category}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-slate-500">
                      {cert.issue_date}
                    </td>
                    <td className="p-4 text-right flex justify-end gap-3">
                      {/* View Link */}
                      {cert.image_url && (
                        <a
                          href={cert.image_url}
                          target="_blank"
                          className="text-slate-400 hover:text-blue-600 transition"
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}

                      {/* Edit Button */}
                      <Link
                        href={`/admin/certificates/edit/${cert.id}`}
                        className="text-slate-400 hover:text-green-600 transition"
                      >
                        <Edit size={20} />
                      </Link>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(cert.id)}
                        className="text-slate-400 hover:text-red-600 transition"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {certs.length === 0 && (
              <div className="p-8 text-center text-gray-400">
                No certificates found.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
