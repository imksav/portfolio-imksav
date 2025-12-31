"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Upload, FileText, CheckCircle } from "lucide-react";

export default function ResumeManager() {
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState("");

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setStatus("");

    // 1. Upload file to Supabase Storage ('resume.pdf' overwrites old one)
    const { data, error } = await supabase.storage
      .from("portfolio-assets")
      .upload("resume.pdf", file, {
        upsert: true, // Overwrite if exists
        contentType: "application/pdf",
      });

    if (error) {
      alert("Error uploading: " + error.message);
      setStatus("error");
    } else {
      setStatus("success");
    }
    setUploading(false);
  }

  // Define the public URL
  const resumeUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/portfolio-assets/resume.pdf`;

  return (
    <div className="min-h-screen bg-slate-50 p-8 pt-24">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
        <div className="bg-blue-50 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileText size={32} />
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Update Resume
        </h1>
        <p className="text-slate-500 mb-8">
          Upload a new PDF to instantly update the download link on your site.
        </p>

        <div className="relative">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleUpload}
            disabled={uploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <button
            className={`w-full py-4 rounded-xl font-bold border-2 border-dashed transition flex flex-col items-center gap-2 ${
              status === "success"
                ? "border-green-300 bg-green-50 text-green-700"
                : "border-slate-300 hover:border-blue-400 hover:bg-slate-50 text-slate-600"
            }`}
          >
            {uploading ? (
              <span>Uploading...</span>
            ) : status === "success" ? (
              <>
                <CheckCircle size={24} />
                <span>Resume Updated Successfully!</span>
              </>
            ) : (
              <>
                <Upload size={24} />
                <span>Click to Select PDF</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100">
          <p className="text-sm text-slate-400 mb-2">Current Live Link:</p>
          <a
            href={resumeUrl}
            target="_blank"
            className="text-blue-600 font-mono text-xs break-all hover:underline"
          >
            {resumeUrl}
          </a>
        </div>
      </div>
    </div>
  );
}
