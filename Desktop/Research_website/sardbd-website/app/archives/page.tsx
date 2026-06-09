import Link from "next/link";

const volumes = [
  {
    volume: 1, year: 2026,
    issues: [
      { issue: 1, month: "June 2026", articles: 5, status: "published", href: "/current-issue" },
      { issue: 2, month: "December 2026", articles: null, status: "upcoming", href: "/submit" },
    ],
  },
];

export default function ArchivesPage() {
  return (
    <div>
      <div className="bg-[#003366] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C8A951] text-sm font-semibold uppercase tracking-widest mb-2">JARD</p>
          <h1 className="text-3xl font-extrabold mb-2">Archives</h1>
          <p className="text-blue-200 text-sm">Bangladesh Journal of Applied Research &amp; Development</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {volumes.map((v) => (
          <div key={v.volume} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#003366] flex items-center justify-center text-white font-black text-sm">
                V{v.volume}
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#003366]">Volume {v.volume} ({v.year})</h2>
                <p className="text-gray-400 text-sm">Bangladesh Journal of Applied Research &amp; Development</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ml-16">
              {v.issues.map((i) => (
                <div key={i.issue} className={`border rounded-xl p-5 ${i.status === "published" ? "border-gray-200 bg-white hover:shadow-md" : "border-dashed border-gray-300 bg-gray-50"} transition-shadow`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-[#003366]">Issue {i.issue}</h3>
                      <p className="text-gray-500 text-sm">{i.month}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${i.status === "published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {i.status === "published" ? "Published" : "Upcoming"}
                    </span>
                  </div>
                  {i.articles !== null && (
                    <p className="text-gray-400 text-xs mb-3">{i.articles} articles</p>
                  )}
                  <Link
                    href={i.href}
                    className={`text-sm font-semibold ${i.status === "published" ? "text-[#003366] hover:underline" : "text-[#C8A951] hover:underline"}`}
                  >
                    {i.status === "published" ? "View Issue →" : "Submit Your Paper →"}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-8 text-center mt-6">
          <h3 className="font-bold text-[#003366] text-lg mb-2">Newly Launched Journal</h3>
          <p className="text-gray-500 text-sm mb-4">
            JARD was launched in 2026. Archives will grow with each new issue. Be part of our inaugural publication.
          </p>
          <Link href="/submit" className="inline-block px-6 py-2.5 bg-[#003366] text-white font-semibold rounded-lg hover:bg-[#004080] transition-colors">
            Submit Manuscript
          </Link>
        </div>
      </div>
    </div>
  );
}
