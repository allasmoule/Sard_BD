import Link from "next/link";

const sections = [
  {
    title: "Manuscript Types",
    icon: "📄",
    content: [
      "Original Research Articles (up to 8,000 words)",
      "Review Articles (up to 10,000 words)",
      "Case Studies (up to 6,000 words)",
      "Short Communications (up to 3,000 words)",
      "Letters to the Editor (up to 1,000 words)",
      "Technical Notes (up to 4,000 words)",
    ],
  },
  {
    title: "Formatting Requirements",
    icon: "📐",
    content: [
      "File format: Microsoft Word (.docx) or PDF",
      "Font: Times New Roman, 12pt, double-spaced",
      "Margins: 1 inch (2.54 cm) on all sides",
      "Page size: A4",
      "Title: Bold, 14pt, centered",
      "Section headings: Bold, 12pt, left-aligned",
      "Abstract: 200–300 words, structured format",
      "Keywords: 3–8 keywords, comma separated",
    ],
  },
  {
    title: "Manuscript Structure",
    icon: "🏗️",
    content: [
      "Title Page (title, authors, affiliations, contact)",
      "Abstract (structured: Background, Methods, Results, Conclusion)",
      "Keywords (3–8 terms)",
      "Introduction",
      "Materials and Methods",
      "Results",
      "Discussion",
      "Conclusion",
      "Acknowledgements (if applicable)",
      "Conflict of Interest Statement",
      "References",
      "Appendices (if applicable)",
    ],
  },
  {
    title: "References",
    icon: "🔗",
    content: [
      "Follow APA 7th edition citation style",
      "In-text: (Author, Year) or (Author, Year, p. X)",
      "Reference list: Alphabetical order by author surname",
      "Minimum 20 references for research articles",
      "Include DOI where available",
      "Avoid citing unpublished work unless necessary",
    ],
  },
  {
    title: "Figures & Tables",
    icon: "📊",
    content: [
      "Figures: High resolution (minimum 300 DPI)",
      "Accepted formats: JPEG, PNG, TIFF, EPS",
      "All figures must be numbered and titled",
      "Tables: Word format, not as images",
      "Captions below figures, above tables",
      "Reference all figures/tables in the text",
    ],
  },
  {
    title: "Ethical Requirements",
    icon: "⚖️",
    content: [
      "Manuscripts must be original and unpublished",
      "Not under simultaneous review elsewhere",
      "All authors must approve the submission",
      "Disclose any conflicts of interest",
      "Human/animal studies require ethics committee approval",
      "Provide ethics approval reference number if applicable",
      "Plagiarism is strictly prohibited (max 15% similarity)",
    ],
  },
];

export default function AuthorGuidelinesPage() {
  return (
    <div>
      <div className="bg-[#003366] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C8A951] text-sm font-semibold uppercase tracking-widest mb-2">JARD</p>
          <h1 className="text-3xl font-extrabold mb-2">Author Guidelines</h1>
          <p className="text-blue-200 text-sm">Please read all guidelines carefully before submitting your manuscript.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Quick Submit Box */}
        <div className="bg-[#C8A951]/10 border border-[#C8A951]/40 rounded-xl p-5 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-[#003366]">Ready to Submit?</p>
            <p className="text-gray-500 text-sm">Once you have read the guidelines, submit your manuscript online.</p>
          </div>
          <Link href="/submit" className="flex-shrink-0 px-6 py-2.5 bg-[#003366] text-white font-bold rounded-lg hover:bg-[#004080] transition-colors">
            Submit Manuscript →
          </Link>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((s) => (
            <div key={s.title} className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-lg font-bold text-[#003366] mb-4 flex items-center gap-2">
                <span>{s.icon}</span> {s.title}
              </h2>
              <ul className="space-y-2">
                {s.content.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-[#C8A951] font-bold mt-0.5">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Review Process */}
        <div className="mt-8 bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-[#003366] mb-4">📋 Review Process</h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "Initial Screening", desc: "Editorial team checks compliance with guidelines (3–5 days)" },
              { step: "2", title: "Peer Review", desc: "Double-blind review by 2–3 expert reviewers (3–6 weeks)" },
              { step: "3", title: "Decision", desc: "Accept, Minor Revision, Major Revision, or Reject" },
              { step: "4", title: "Revision", desc: "Authors revise and resubmit within the specified deadline" },
              { step: "5", title: "Final Decision", desc: "Accepted manuscripts proceed to copyediting and production" },
              { step: "6", title: "Publication", desc: "Published online with DOI assignment" },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#003366] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {s.step}
                </div>
                <div>
                  <div className="font-semibold text-[#003366] text-sm">{s.title}</div>
                  <div className="text-gray-500 text-xs">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm mb-4">Have questions about submission?</p>
          <div className="flex justify-center gap-3">
            <Link href="/contact" className="px-5 py-2 border border-[#003366] text-[#003366] font-semibold rounded-lg hover:bg-gray-50 transition-colors text-sm">Contact Editorial Office</Link>
            <Link href="/submit" className="px-5 py-2 bg-[#003366] text-white font-semibold rounded-lg hover:bg-[#004080] transition-colors text-sm">Submit Manuscript</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
