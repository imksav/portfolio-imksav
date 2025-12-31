import Link from "next/link";
import { Github, Linkedin, Mail, FileText } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-20 pb-32 flex items-center min-h-[80vh] bg-white">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="max-w-3xl">
          {/* Small top tag */}
          <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm">
            Full-Stack Engineer | Data Enthusiast
          </span>

          {/* Main Headline */}
          <h1 className="mt-4 text-5xl md:text-7xl font-bold text-slate-900 leading-tight">
            Hi, I'm <span className="text-blue-600">Keshav Bhandari</span>.
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-xl text-slate-600 leading-relaxed max-w-2xl">
            I build scalable backend systems and interactive frontends.
            Passionate about database design, system architecture, and clean
            code.
          </p>

          {/* Buttons Area */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="#contact"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-600/20"
            >
              Contact Me
            </Link>

            <a
              href={process.env.RESUME_URL}
              download
              className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-lg font-medium hover:bg-slate-50 transition flex items-center gap-2"
            >
              <FileText size={20} />
              Download Resume
            </a>
          </div>

          {/* Social Links */}
          <div className="mt-12 flex items-center gap-6 text-slate-500">
            <a
              href="https://github.com/imksav/"
              target="_blank"
              className="hover:text-blue-600 transition"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com/in/imksav/"
              target="_blank"
              className="hover:text-blue-600 transition"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:imksav@gmail.com"
              className="hover:text-blue-600 transition"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
