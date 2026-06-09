import Link from "next/link";

const articles = [
  {
    id: 1,
    type: "Original Research",
    title: "Impact of Climate Change on Agricultural Productivity in Bangladesh: A Regional Analysis",
    authors: "Rahman, M. A., Hossain, S., & Islam, N.",
    pages: "1–14",
    doi: "10.XXXX/jard.2026.01.001",
    abstract: "This study investigates the multifaceted impact of climate variability on crop yield across six divisions of Bangladesh...",
  },
  {
    id: 2,
    type: "Review Article",
    title: "Renewable Energy Transition in Developing Nations: Challenges and Opportunities",
    authors: "Ahmed, K. R., & Begum, F.",
    pages: "15–28",
    doi: "10.XXXX/jard.2026.01.002",
    abstract: "A comprehensive review of renewable energy policies, technologies, and socioeconomic barriers in South Asia...",
  },
  {
    id: 3,
    type: "Original Research",
    title: "Digital Financial Inclusion and Poverty Reduction: Evidence from Rural Bangladesh",
    authors: "Chowdhury, T., Ali, M. S., & Khan, R.",
    pages: "29–42",
    doi: "10.XXXX/jard.2026.01.003",
    abstract: "This paper examines the relationship between mobile banking adoption and household welfare outcomes in rural settings...",
  },
  {
    id: 4,
    type: "Case Study",
    title: "Urban Flood Risk Management in Dhaka City: A GIS-Based Assessment",
    authors: "Nasrin, S., & Rashid, M.",
    pages: "43–55",
    doi: "10.XXXX/jard.2026.01.004",
    abstract: "Using spatial analysis and GIS tools, this study maps flood-prone zones in Dhaka metropolitan area...",
  },
  {
    id: 5,
    type: "Short Communication",
    title: "Antibiotic Resistance Patterns in Hospital-Acquired Infections: A Preliminary Report",
    authors: "Sultana, R., Haque, A., & Momen, T.",
    pages: "56–62",
    doi: "10.XXXX/jard.2026.01.005",
    abstract: "A preliminary investigation of antimicrobial resistance profiles in selected tertiary hospitals in Dhaka...",
  },
];

const typeColors: Record<string, string> = {
  "Original Research": "bg-blue-100 text-blue-700",
  "Review Article": "bg-purple-100 text-purple-700",
  "Case Study": "bg-green-100 text-green-700",
  "Short Communication": "bg-orange-100 text-orange-700",
};

export default function CurrentIssuePage() {
  return (
    <div>
      {/* Header */}
      <div className="bg-[#003366] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C8A951] text-sm font-semibold uppercase tracking-widest mb-2">Current Issue</p>
          <h1 className="text-3xl font-extrabold mb-2">Volume 1 · Issue 1 · June 2026</h1>
          <p className="text-blue-200 text-sm">Bangladesh Journal of Applied Research &amp; Development · Published by SARD BD</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* Issue Info Box */}
        <div className="bg-[#C8A951]/10 border border-[#C8A951]/30 rounded-xl p-5 mb-8 flex flex-wrap gap-6 text-sm">
          {[
            { label: "Volume", value: "1" }, { label: "Issue", value: "1" },
            { label: "Published", value: "June 2026" }, { label: "Articles", value: `${articles.length}` },
            { label: "Access", value: "Open Access" },
          ].map((i) => (
            <div key={i.label} className="text-center">
              <div className="font-extrabold text-[#003366] text-lg">{i.value}</div>
              <div className="text-gray-500 text-xs">{i.label}</div>
            </div>
          ))}
        </div>

        {/* Articles */}
        <h2 className="text-xl font-bold text-[#003366] mb-5">Published Articles</h2>
        <div className="space-y-5">
          {articles.map((a) => (
            <div key={a.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${typeColors[a.type] ?? "bg-gray-100 text-gray-600"}`}>
                  {a.type}
                </span>
                <span className="text-xs text-gray-400">Pages {a.pages}</span>
              </div>
              <h3 className="font-bold text-[#003366] text-base mb-1 leading-snug">{a.title}</h3>
              <p className="text-gray-500 text-sm mb-2">{a.authors}</p>
              <p className="text-gray-400 text-xs mb-3">{a.abstract}</p>
              <div className="flex items-center gap-4 text-xs">
                <span className="text-gray-400">DOI: <span className="text-[#003366]">{a.doi}</span></span>
                <button className="px-3 py-1 bg-[#003366] text-white rounded hover:bg-[#004080] transition-colors">
                  Abstract
                </button>
                <button className="px-3 py-1 bg-[#C8A951] text-[#003366] font-semibold rounded hover:bg-yellow-400 transition-colors">
                  PDF
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Submit CTA */}
        <div className="mt-10 text-center bg-[#003366] text-white rounded-xl p-8">
          <h3 className="font-bold text-xl mb-2">Submit to the Next Issue</h3>
          <p className="text-blue-200 text-sm mb-5">Vol. 1 · Issue 2 (December 2026) is now open for submissions.</p>
          <Link href="/submit" className="inline-block px-8 py-3 bg-[#C8A951] text-[#003366] font-bold rounded-lg hover:bg-yellow-400 transition-colors">
            Submit Manuscript
          </Link>
        </div>
      </div>
    </div>
  );
}
