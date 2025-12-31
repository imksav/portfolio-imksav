"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Github, ExternalLink, Code2 } from "lucide-react";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) setProjects(data);
    }
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
          Featured Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition bg-slate-50 flex flex-col"
            >
              {/* Image Area (Simpler version for now) */}
              <div className="h-48 bg-slate-200 w-full relative group">
                {project.image_url ? (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400">
                    <Code2 size={48} />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-slate-900">
                    {project.title}
                  </h3>
                  <div className="flex gap-2">
                    {project.repo_url && (
                      <a
                        href={project.repo_url}
                        target="_blank"
                        className="text-gray-500 hover:text-black"
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        className="text-gray-500 hover:text-blue-600"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>

                <p className="mt-3 text-slate-600 text-sm leading-relaxed flex-grow">
                  {project.description}
                </p>

                {/* Tech Stack Badges */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech_stack?.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-slate-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
