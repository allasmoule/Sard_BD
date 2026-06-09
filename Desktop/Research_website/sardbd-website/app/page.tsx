import Link from "next/link";

const features = [
  { icon: "🔬", title: "Peer Reviewed", desc: "All submissions undergo rigorous double-blind peer review by domain experts." },
  { icon: "🌐", title: "Open Access", desc: "Free to read and download for researchers, practitioners, and students worldwide." },
  { icon: "⚡", title: "Fast Publication", desc: "Streamlined review process ensures timely publication of accepted manuscripts." },
  { icon: "📊", title: "Indexed", desc: "Submitted for indexing in major academic databases and citation indices." },
];

const topics = [
  "Applied Sciences", "Technology & Engineering", "Development Studies",
  "Social Sciences", "Environmental Research", "Health & Medicine",
  "Agriculture & Food", "Economics & Finance", "Education Research", "ICT & Innovation",
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#003366] via-[#004080] to-[#002244] text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#C8A951]/20 border border-[#C8A951]/40 rounded-full px-4 py-1.5 text-[#C8A951] text-xs font-semibold mb-6 tracking-wide">
            VOL. 1 · ISSUE 1 · JUNE 2026 — NOW ACCEPTING SUBMISSIONS
          </div>
          <div className="w-20 h-20 rounded-full bg-[#C8A951] flex items-center justify-center font-black text-[#003366] text-2xl mx-auto mb-6 shadow-lg">
            JARD
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-3">
            Bangladesh Journal of<br />
            <span className="text-[#C8A951]">Applied Research &amp; Development</span>
          </h1>
          <p className="text-blue-200 text-lg mt-4 mb-2">Published by <span className="text-white font-semibold">SARD BD</span></p>
          <p className="text-blue-300 text-sm max-w-2xl mx-auto mb-10">
            A peer-reviewed, open-access journal dedicated to advancing knowledge in applied sciences,
            technology, and development across Bangladesh and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/submit"
              className="px-8 py-3.5 bg-[#C8A951] text-[#003366] font-bold text-base rounded-lg hover:bg-yellow-400 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Submit Manuscript
            </Link>
            <Link
              href="/current-issue"
              className="px-8 py-3.5 bg-white/10 border border-white/30 text-white font-semibold text-base rounded-lg hover:bg-white/20 transition-all"
            >
              Browse Current Issue
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#C8A951] py-4">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-[#003366]">
          {[
            { n: "Vol. 1", label: "Current Volume" },
            { n: "Issue 1", label: "Current Issue" },
            { n: "June 2026", label: "Publication Date" },
            { n: "Open Access", label: "Free to Read" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-extrabold text-lg">{s.n}</div>
              <div className="text-xs font-semibold opacity-80">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-[#003366] text-center mb-10">Why Publish with JARD?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="border border-gray-100 rounded-xl p-6 text-center hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-[#003366] mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scope */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#003366] mb-3">Scope &amp; Topics</h2>
          <p className="text-gray-500 text-sm mb-8 max-w-xl mx-auto">
            JARD welcomes original research, review articles, and case studies across a wide range of disciplines.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {topics.map((t) => (
              <span key={t} className="px-4 py-2 bg-white border border-[#003366]/20 text-[#003366] text-sm font-medium rounded-full shadow-sm hover:bg-[#003366] hover:text-white transition-colors cursor-default">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-[#003366] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Submit Your Research?</h2>
          <p className="text-blue-200 mb-8">
            We invite researchers, academics, and practitioners to submit their original manuscripts.
            Follow our author guidelines for a smooth submission process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/submit"
              className="px-8 py-3.5 bg-[#C8A951] text-[#003366] font-bold rounded-lg hover:bg-yellow-400 transition-all"
            >
              Submit Manuscript
            </Link>
            <Link
              href="/author-guidelines"
              className="px-8 py-3.5 border border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
            >
              Author Guidelines
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
