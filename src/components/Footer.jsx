import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Section */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">imksav.py</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Building scalable systems and solving complex problems with code.
            Let's build something amazing together.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-blue-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:text-blue-400 transition">
                Blog
              </a>
            </li>
            <li>
              <a href="/#projects" className="hover:text-blue-400 transition">
                Projects
              </a>
            </li>
            <li>
              <a href="/#contact" className="hover:text-blue-400 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
          <div className="flex gap-4">
            <a
              href="https://github.com/imksav"
              target="_blank"
              className="hover:text-white transition p-2 bg-slate-800 rounded-full"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/imksav/"
              target="_blank"
              className="hover:text-white transition p-2 bg-slate-800 rounded-full"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://twitter.com/imksav"
              target="_blank"
              className="hover:text-white transition p-2 bg-slate-800 rounded-full"
            >
              <Twitter size={20} />
            </a>
            <a
              href="mailto:imksav@gmail.com"
              className="hover:text-white transition p-2 bg-slate-800 rounded-full"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Keshav Bhandari | imksav. All rights
        reserved.
      </div>
    </footer>
  );
}
