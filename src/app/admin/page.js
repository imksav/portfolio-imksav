"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Check if user is logged in
  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        // If no user, kick them back to login
        router.push("/admin/login");
      } else {
        setUser(user);
        setLoading(false);
      }
    }
    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  if (loading)
    return <div className="text-center py-20">Loading Admin Panel...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-8 pt-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-500 text-sm">
              Welcome back, {user?.email}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-medium transition"
          >
            Logout
          </button>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Blog Posts */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              Manage Blog
            </h2>
            <p className="text-slate-500 mb-4">
              Create, edit, or delete your articles.
            </p>
            <Link
              href="/admin/blog"
              className="block w-full py-2 bg-blue-50 text-blue-600 font-semibold rounded-lg hover:bg-blue-100 transition text-center"
            >
              Go to Blog Manager
            </Link>
          </div>

          {/* Card 2: Projects */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              Manage Projects
            </h2>
            <p className="text-slate-500 mb-4">
              Update your portfolio projects.
            </p>
            <Link
              href="/admin/projects"
              className="block w-full py-2 bg-blue-50 text-blue-600 font-semibold rounded-lg hover:bg-blue-100 transition text-center"
            >
              Go to Project Manager
            </Link>
          </div>
          {/* Card 3: Certificates */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              Manage Certificates
            </h2>
            <p className="text-slate-500 mb-4">
              Add or update your certifications.
            </p>
            <Link
              href="/admin/certificates"
              className="block w-full py-2 bg-blue-50 text-blue-600 font-semibold rounded-lg hover:bg-blue-100 transition text-center"
            >
              Go to Certificate Manager
            </Link>
          </div>
          {/* Card 4: Resume */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              Resume File
            </h2>
            <p className="text-slate-500 mb-4">Upload your latest CV (PDF).</p>
            <Link
              href="/admin/resume"
              className="block w-full py-2 bg-blue-50 text-blue-600 font-semibold rounded-lg hover:bg-blue-100 transition text-center"
            >
              Update Resume
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
