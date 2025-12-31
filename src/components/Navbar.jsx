"use client"; // This tells Next.js this component needs interactivity (onClick)

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Code2 } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/#projects" },
    { name: "Certifications", href: "/#certs" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    // 'fixed': Sticks to top. 'h-16': Sets height to 64px. 'z-50': Stays on top of everything.
    <nav className="fixed top-0 left-0 w-full h-16 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-slate-800"
          >
            <Code2 className="text-blue-600" />
            <span>imksav.py</span>
          </Link>

          {/* Desktop Menu (Hidden on mobile) */}
          <div className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button (Visible only on mobile) */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-lg">
          <div className="flex flex-col p-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-blue-600 font-medium"
                onClick={() => setIsOpen(false)} // Close menu when clicked
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
