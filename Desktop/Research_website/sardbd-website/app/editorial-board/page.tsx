import Link from "next/link";

const editorInChief = {
  name: "Prof. Dr. [Name]",
  role: "Editor-in-Chief",
  affiliation: "University of Dhaka, Bangladesh",
  expertise: "Applied Sciences, Development Studies",
};

const editors = [
  { name: "Prof. Dr. [Name]", role: "Associate Editor", affiliation: "BUET, Bangladesh", expertise: "Engineering & Technology" },
  { name: "Prof. Dr. [Name]", role: "Associate Editor", affiliation: "Rajshahi University, Bangladesh", expertise: "Environmental Science" },
  { name: "Prof. Dr. [Name]", role: "Associate Editor", affiliation: "Chittagong University, Bangladesh", expertise: "Social Sciences" },
  { name: "Dr. [Name]", role: "Managing Editor", affiliation: "SARD BD", expertise: "Research Management" },
];

const boardMembers = [
  { name: "Prof. Dr. [Name]", affiliation: "University of Oxford, UK", country: "🇬🇧" },
  { name: "Prof. Dr. [Name]", affiliation: "University of Tokyo, Japan", country: "🇯🇵" },
  { name: "Prof. Dr. [Name]", affiliation: "Harvard University, USA", country: "🇺🇸" },
  { name: "Prof. Dr. [Name]", affiliation: "Dhaka University, Bangladesh", country: "🇧🇩" },
  { name: "Prof. Dr. [Name]", affiliation: "University of Melbourne, Australia", country: "🇦🇺" },
  { name: "Prof. Dr. [Name]", affiliation: "IIT Delhi, India", country: "🇮🇳" },
  { name: "Prof. Dr. [Name]", affiliation: "University of Malaya, Malaysia", country: "🇲🇾" },
  { name: "Prof. Dr. [Name]", affiliation: "BRAC University, Bangladesh", country: "🇧🇩" },
];

export default function EditorialBoardPage() {
  return (
    <div>
      <div className="bg-[#003366] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C8A951] text-sm font-semibold uppercase tracking-widest mb-2">JARD</p>
          <h1 className="text-3xl font-extrabold mb-2">Editorial Board</h1>
          <p className="text-blue-200 text-sm">Bangladesh Journal of Applied Research &amp; Development</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">

        {/* Editor in Chief */}
        <section>
          <h2 className="text-xl font-bold text-[#003366] mb-4 border-b-2 border-[#C8A951] pb-1 inline-block">Editor-in-Chief</h2>
          <div className="mt-4 bg-gradient-to-r from-[#003366] to-[#004080] text-white rounded-xl p-6 flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-[#C8A951] flex items-center justify-center text-[#003366] font-black text-xl flex-shrink-0">
              EIC
            </div>
            <div>
              <div className="font-bold text-xl">{editorInChief.name}</div>
              <div className="text-[#C8A951] font-semibold text-sm">{editorInChief.role}</div>
              <div className="text-blue-200 text-sm mt-1">{editorInChief.affiliation}</div>
              <div className="text-blue-300 text-xs mt-1">Expertise: {editorInChief.expertise}</div>
            </div>
          </div>
        </section>

        {/* Associate & Managing Editors */}
        <section>
          <h2 className="text-xl font-bold text-[#003366] mb-4 border-b-2 border-[#C8A951] pb-1 inline-block">Editorial Team</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {editors.map((e, i) => (
              <div key={i} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-[#003366]/10 flex items-center justify-center text-[#003366] font-bold text-sm mb-3">
                  {e.role === "Managing Editor" ? "ME" : "AE"}
                </div>
                <div className="font-bold text-[#003366]">{e.name}</div>
                <div className="text-[#C8A951] text-xs font-semibold mt-0.5">{e.role}</div>
                <div className="text-gray-500 text-xs mt-1">{e.affiliation}</div>
                <div className="text-gray-400 text-xs mt-0.5">Expertise: {e.expertise}</div>
              </div>
            ))}
          </div>
        </section>

        {/* International Board */}
        <section>
          <h2 className="text-xl font-bold text-[#003366] mb-4 border-b-2 border-[#C8A951] pb-1 inline-block">International Editorial Advisory Board</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {boardMembers.map((m, i) => (
              <div key={i} className="flex items-center gap-3 border border-gray-100 rounded-lg p-4 hover:bg-gray-50">
                <span className="text-2xl">{m.country}</span>
                <div>
                  <div className="font-semibold text-[#003366] text-sm">{m.name}</div>
                  <div className="text-gray-400 text-xs">{m.affiliation}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Join CTA */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-8 text-center">
          <h3 className="font-bold text-[#003366] text-lg mb-2">Join Our Review Panel</h3>
          <p className="text-gray-500 text-sm mb-4">
            Interested in becoming a reviewer or editorial board member? We welcome experts from all disciplines.
          </p>
          <Link href="/contact" className="inline-block px-6 py-2.5 bg-[#003366] text-white font-semibold rounded-lg hover:bg-[#004080] transition-colors">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
