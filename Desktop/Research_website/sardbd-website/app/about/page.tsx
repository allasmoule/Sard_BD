import Link from "next/link";

export default function AboutPage() {
  return (
    <div>
      {/* Header */}
      <div className="bg-[#003366] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C8A951] text-sm font-semibold uppercase tracking-widest mb-2">About the Journal</p>
          <h1 className="text-3xl font-extrabold mb-2">Bangladesh Journal of Applied Research &amp; Development</h1>
          <p className="text-blue-200 text-sm">JARD · Vol. 1 · Issue 1 · June 2026 · Published by SARD BD</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">

        {/* About */}
        <section>
          <h2 className="text-xl font-bold text-[#003366] mb-3 border-b-2 border-[#C8A951] pb-1 inline-block">About JARD</h2>
          <p className="text-gray-600 leading-relaxed mt-3">
            The <strong>Bangladesh Journal of Applied Research &amp; Development (JARD)</strong> is a peer-reviewed,
            open-access academic journal published by <strong>SARD BD</strong>. Established in 2026, JARD aims to
            bridge the gap between theoretical research and practical applications by publishing high-quality,
            original research across multidisciplinary fields.
          </p>
          <p className="text-gray-600 leading-relaxed mt-3">
            JARD provides a platform for researchers, academics, scientists, engineers, and practitioners to
            share their work with a global audience. All published articles are freely accessible to everyone,
            ensuring maximum dissemination of knowledge.
          </p>
        </section>

        {/* Mission */}
        <section>
          <h2 className="text-xl font-bold text-[#003366] mb-3 border-b-2 border-[#C8A951] pb-1 inline-block">Mission &amp; Vision</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
              <h3 className="font-bold text-[#003366] mb-2">🎯 Mission</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                To advance applied research and development by providing a rigorous, open-access platform
                for disseminating original research findings that address real-world challenges.
              </p>
            </div>
            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-5">
              <h3 className="font-bold text-[#003366] mb-2">🔭 Vision</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                To become a leading academic journal from Bangladesh, recognized internationally for
                excellence in applied research, innovation, and development studies.
              </p>
            </div>
          </div>
        </section>

        {/* Scope */}
        <section>
          <h2 className="text-xl font-bold text-[#003366] mb-3 border-b-2 border-[#C8A951] pb-1 inline-block">Aim &amp; Scope</h2>
          <p className="text-gray-600 leading-relaxed mt-3">
            JARD welcomes original research articles, review papers, case studies, short communications,
            and technical notes in the following areas (but not limited to):
          </p>
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Applied Sciences & Technology",
              "Engineering & Innovation",
              "Development Studies",
              "Social & Behavioral Sciences",
              "Environmental Science",
              "Health & Medical Sciences",
              "Agriculture & Food Science",
              "Economics & Finance",
              "Education & Pedagogy",
              "ICT & Computer Science",
              "Urban & Rural Development",
              "Public Policy & Governance",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-[#C8A951] font-bold">▸</span> {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Publication Info */}
        <section>
          <h2 className="text-xl font-bold text-[#003366] mb-3 border-b-2 border-[#C8A951] pb-1 inline-block">Publication Information</h2>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Publisher", value: "SARD BD" },
              { label: "ISSN (Online)", value: "XXXX-XXXX" },
              { label: "ISSN (Print)", value: "XXXX-XXXX" },
              { label: "Frequency", value: "Bi-annual (June & December)" },
              { label: "Language", value: "English" },
              { label: "Access Type", value: "Open Access" },
              { label: "Review Process", value: "Double-blind Peer Review" },
              { label: "Current Volume", value: "Vol. 1 (2026)" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between border-b border-gray-100 pb-2 text-sm">
                <span className="text-gray-500 font-medium">{item.label}</span>
                <span className="text-[#003366] font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-[#003366] text-white rounded-xl p-8 text-center">
          <h3 className="font-bold text-xl mb-2">Ready to Contribute?</h3>
          <p className="text-blue-200 text-sm mb-5">Submit your manuscript today and join our growing community of researchers.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/submit" className="px-6 py-2.5 bg-[#C8A951] text-[#003366] font-bold rounded-lg hover:bg-yellow-400 transition-colors">
              Submit Manuscript
            </Link>
            <Link href="/author-guidelines" className="px-6 py-2.5 border border-white/40 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
              Author Guidelines
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
