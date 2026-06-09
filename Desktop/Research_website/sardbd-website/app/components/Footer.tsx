import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#002244] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        {/* Journal Info */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-full bg-[#C8A951] flex items-center justify-center font-bold text-[#003366] text-xs">
              JARD
            </div>
            <div>
              <div className="font-bold text-sm">Bangladesh Journal of</div>
              <div className="text-[#C8A951] text-xs">Applied Research &amp; Development</div>
            </div>
          </div>
          <p className="text-blue-200 text-xs leading-relaxed">
            JARD is a peer-reviewed open-access journal publishing high-quality
            research across applied sciences, technology, and development studies.
          </p>
          <p className="text-blue-300 text-xs mt-3">Published by <span className="text-[#C8A951] font-semibold">SARD BD</span></p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-[#C8A951] mb-3 uppercase tracking-wide text-xs">Quick Links</h4>
          <ul className="space-y-2 text-blue-200">
            {[
              { label: "Home", href: "/" },
              { label: "About the Journal", href: "/about" },
              { label: "Editorial Board", href: "/editorial-board" },
              { label: "Current Issue", href: "/current-issue" },
              { label: "Archives", href: "/archives" },
              { label: "Author Guidelines", href: "/author-guidelines" },
              { label: "Submit Manuscript", href: "/submit" },
              { label: "Contact", href: "/contact" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-[#C8A951] transition-colors">
                  → {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-[#C8A951] mb-3 uppercase tracking-wide text-xs">Contact Us</h4>
          <ul className="space-y-2 text-blue-200 text-xs">
            <li>📧 editor@jardbd.org</li>
            <li>📧 submit@jardbd.org</li>
            <li>🌐 www.jardbd.org</li>
            <li>📍 Bangladesh</li>
          </ul>
          <div className="mt-4">
            <h4 className="font-bold text-[#C8A951] mb-2 uppercase tracking-wide text-xs">Current Issue</h4>
            <p className="text-blue-200 text-xs">Vol. 1 · Issue 1 · June 2026</p>
          </div>
          <div className="mt-4">
            <Link
              href="/submit"
              className="inline-block px-4 py-2 bg-[#C8A951] text-[#003366] font-bold text-xs rounded hover:bg-yellow-400 transition-colors"
            >
              Submit Manuscript
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-[#003366] py-4 text-center text-xs text-blue-300">
        © 2026 JARD – Bangladesh Journal of Applied Research &amp; Development. All rights reserved. Published by SARD BD.
      </div>
    </footer>
  );
}
