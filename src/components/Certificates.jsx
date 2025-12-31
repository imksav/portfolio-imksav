"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { FileText, ExternalLink } from "lucide-react";

export default function Certificates() {
  const [certs, setCerts] = useState([]);
  const [categories, setCategories] = useState(["All"]); // Start with just "All"
  const [activeFilter, setActiveFilter] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  async function fetchCertificates() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .order("issue_date", { ascending: false });

      if (error) throw error;

      setCerts(data);

      // --- DYNAMIC CATEGORY LOGIC START ---
      // 1. Extract all category strings: ["Data Science", "Cloud", "Data Science"...]
      const allCategories = data.map((item) => item.category);

      // 2. Remove duplicates using Set: ["Data Science", "Cloud"]
      const uniqueCategories = [...new Set(allCategories)];

      // 3. Add "All" to the front and save to state
      setCategories(["All", ...uniqueCategories]);
      // --- DYNAMIC CATEGORY LOGIC END ---
    } catch (err) {
      setError("Could not load certificates.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // Filter logic remains the same
  const visibleCerts =
    activeFilter === "All"
      ? certs
      : certs.filter((c) => c.category === activeFilter);

  if (loading)
    return (
      <div className="text-center py-20 text-gray-500">
        Loading certificates...
      </div>
    );
  if (error)
    return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <section id="certs" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900">Certifications</h2>
          <p className="text-slate-600 mt-2">
            Continuous learning and professional development.
          </p>
        </div>

        {/* Dynamic Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 capitalize ${
                activeFilter === cat
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleCerts.map((cert) => (
            <a
              key={cert.id}
              href={cert.image_url} // Clicking the card opens the link
              target="_blank"
              rel="noopener noreferrer"
              className="group relative h-80 w-full rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 block bg-slate-900"
            >
              {/* 1. BACKGROUND HANDLING */}
              {cert.image_url ? (
                <>
                  {/* Attempt to load as Image */}
                  <img
                    src={cert.image_url}
                    alt={cert.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      // IF LOADING FAILS (e.g., it's a PDF or FB Link):
                      // Hide the broken image tag
                      e.target.style.display = "none";
                      // The sibling div (fallback) below will become visible because the image is gone
                    }}
                  />

                  {/* Fallback Layer: Shows if image fails or is hidden */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800 text-slate-500 -z-10">
                    <FileText size={48} className="mb-2 opacity-50" />
                    <span className="text-xs uppercase tracking-widest font-semibold">
                      Document Preview
                    </span>
                  </div>
                </>
              ) : (
                // If URL is completely empty
                <div className="absolute inset-0 bg-slate-800" />
              )}

              {/* 2. GRADIENT OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90" />

              {/* 3. ICON OVERLAY (Visual Hint) */}
              <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink className="text-white w-4 h-4" />
              </div>

              {/* 4. CONTENT OVERLAY */}
              <div className="absolute bottom-0 left-0 p-6 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block px-3 py-1 mb-3 text-xs font-bold text-white bg-blue-600 rounded-full bg-opacity-90 backdrop-blur-sm">
                  {cert.category}
                </span>

                <h3 className="text-xl font-bold text-white leading-tight">
                  {cert.title}
                </h3>

                <div className="mt-2 flex items-center justify-between text-gray-300 text-sm">
                  <span>{cert.issuer}</span>
                  <span>{cert.issue_date}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
