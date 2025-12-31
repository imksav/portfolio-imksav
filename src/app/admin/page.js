import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  FileText,
  Briefcase,
  Award,
  Upload,
  Mail,
  ArrowRight,
} from "lucide-react";
import LogoutButton from "@/components/LogoutButton";

export default async function AdminDashboard() {
  // 1. Verify Session on Server (Double Security)
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8 pt-24">
      <div className="max-w-6xl mx-auto">
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-500 mt-1">
              Logged in as{" "}
              <span className="font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded text-sm">
                {user.email}
              </span>
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <LogoutButton />
          </div>
        </div>

        {/* --- DASHBOARD GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Blog Manager */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                <FileText size={24} />
              </div>
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              Blog Posts
            </h2>
            <p className="text-slate-500 text-sm mb-6 flex-grow">
              Write, edit, and publish articles for your blog.
            </p>
            <Link
              href="/admin/blog"
              className="flex items-center justify-center gap-2 w-full py-3 bg-slate-50 text-slate-700 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition group"
            >
              Manage Blog{" "}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          {/* Card 2: Project Manager */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                <Briefcase size={24} />
              </div>
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Projects</h2>
            <p className="text-slate-500 text-sm mb-6 flex-grow">
              Showcase your latest work and case studies.
            </p>
            <Link
              href="/admin/projects"
              className="flex items-center justify-center gap-2 w-full py-3 bg-slate-50 text-slate-700 font-semibold rounded-xl hover:bg-purple-600 hover:text-white transition group"
            >
              Manage Projects{" "}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          {/* Card 3: Certificates */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                <Award size={24} />
              </div>
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              Certificates
            </h2>
            <p className="text-slate-500 text-sm mb-6 flex-grow">
              Add new certifications and achievements.
            </p>
            <Link
              href="/admin/certificates"
              className="flex items-center justify-center gap-2 w-full py-3 bg-slate-50 text-slate-700 font-semibold rounded-xl hover:bg-green-600 hover:text-white transition group"
            >
              Manage Certs{" "}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          {/* Card 4: Resume */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
                <Upload size={24} />
              </div>
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              Resume File
            </h2>
            <p className="text-slate-500 text-sm mb-6 flex-grow">
              Upload your latest PDF resume for download.
            </p>
            <Link
              href="/admin/resume"
              className="flex items-center justify-center gap-2 w-full py-3 bg-slate-50 text-slate-700 font-semibold rounded-xl hover:bg-orange-600 hover:text-white transition group"
            >
              Update Resume{" "}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          {/* Card 5: Inbox */}
          <div className="md:col-span-2 lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
                <Mail size={24} />
              </div>
              <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full">
                Private
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Inbox</h2>
            <p className="text-slate-500 text-sm mb-6 flex-grow">
              Read messages from your contact form.
            </p>
            <Link
              href="/admin/messages"
              className="flex items-center justify-center gap-2 w-full py-3 bg-slate-50 text-slate-700 font-semibold rounded-xl hover:bg-indigo-600 hover:text-white transition group"
            >
              View Messages{" "}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
