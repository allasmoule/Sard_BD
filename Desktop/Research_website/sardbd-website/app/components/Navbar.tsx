"use client";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Editorial Board", href: "/editorial-board" },
  { label: "Current Issue", href: "/current-issue" },
  { label: "Archives", href: "/archives" },
  { label: "Author Guidelines", href: "/author-guidelines" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#003366] text-white shadow-md sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-[#002244] py-1 px-4 text-center text-xs tracking-wide text-blue-200">
        ISSN (Online): XXXX-XXXX &nbsp;|&nbsp; ISSN (Print): XXXX-XXXX &nbsp;|&nbsp; Published by SARD BD
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo + Title */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-[#C8A951] flex items-center justify-center font-bold text-[#003366] text-sm flex-shrink-0">
            JARD
          </div>
          <div>
            <div className="font-bold text-base leading-tight">Bangladesh Journal of</div>
            <div className="text-[#C8A951] text-sm font-semibold leading-tight">Applied Research &amp; Development</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 rounded hover:bg-[#004080] hover:text-[#C8A951] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/submit"
            className="ml-3 px-4 py-2 bg-[#C8A951] text-[#003366] font-bold rounded hover:bg-yellow-400 transition-colors"
          >
            Submit Manuscript
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded hover:bg-[#004080]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 h-0.5 bg-white mb-1"></div>
          <div className="w-5 h-0.5 bg-white mb-1"></div>
          <div className="w-5 h-0.5 bg-white"></div>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#002244] px-4 pb-4 flex flex-col gap-2 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-2 border-b border-[#003366] hover:text-[#C8A951]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/submit"
            onClick={() => setMenuOpen(false)}
            className="mt-2 py-2 text-center bg-[#C8A951] text-[#003366] font-bold rounded"
          >
            Submit Manuscript
          </Link>
        </div>
      )}
    </header>
  );
}
