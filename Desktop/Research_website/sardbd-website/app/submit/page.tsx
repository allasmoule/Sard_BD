"use client";
import Link from "next/link";
import { useState } from "react";

export default function SubmitPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: "", authors: "", email: "", affiliation: "",
    abstract: "", keywords: "", articleType: "", file: "",
    declaration: false,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const target = e.target as HTMLInputElement;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setForm((prev) => ({ ...prev, [target.name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div>
      {/* === Beautiful Journal Splash Header === */}
      <div className="relative bg-gradient-to-br from-[#001a33] via-[#003366] to-[#004d99] text-white overflow-hidden">
        {/* decorative circles */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#C8A951]/10 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 py-14 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#C8A951]/20 border border-[#C8A951]/40 rounded-full px-4 py-1 text-[#C8A951] text-xs font-bold mb-6 tracking-widest uppercase">
            Online Manuscript Submission
          </div>

          {/* Logo */}
          <div className="w-20 h-20 rounded-full bg-[#C8A951] flex items-center justify-center font-black text-[#003366] text-2xl mx-auto mb-5 shadow-2xl ring-4 ring-[#C8A951]/30">
            JARD
          </div>

          {/* Journal Name */}
          <h1 className="text-3xl md:text-4xl font-extrabold leading-snug mb-1">
            Bangladesh Journal of
          </h1>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#C8A951] mb-5">
            Applied Research &amp; Development
          </h2>

          {/* Issue Info */}
          <div className="inline-flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm text-blue-200 mb-3">
            <span className="font-semibold text-white">Vol. 1 · Issue 1</span>
            <span>June 2026</span>
            <span>Published by <span className="text-[#C8A951] font-bold">SARD BD</span></span>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 my-5">
            <div className="h-px w-20 bg-[#C8A951]/40" />
            <div className="w-2 h-2 rounded-full bg-[#C8A951]" />
            <div className="h-px w-20 bg-[#C8A951]/40" />
          </div>

          <p className="text-blue-200 text-sm max-w-lg mx-auto">
            Submit your original manuscript for peer review. Please read the{" "}
            <Link href="/author-guidelines" className="text-[#C8A951] underline hover:text-yellow-300">
              Author Guidelines
            </Link>{" "}
            before submitting.
          </p>
        </div>
      </div>

      {/* === Submission Form === */}
      <div className="max-w-3xl mx-auto px-4 py-12">

        {submitted ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 text-3xl">✅</div>
            <h2 className="text-2xl font-bold text-[#003366] mb-2">Submission Received!</h2>
            <p className="text-gray-500 mb-6">
              Thank you for submitting to <strong>JARD</strong>. We will review your manuscript and contact you at the provided email address.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => { setSubmitted(false); setForm({ title: "", authors: "", email: "", affiliation: "", abstract: "", keywords: "", articleType: "", file: "", declaration: false }); }}
                className="px-6 py-2.5 bg-[#003366] text-white font-semibold rounded-lg hover:bg-[#004080] transition-colors"
              >
                Submit Another
              </button>
              <Link href="/" className="px-6 py-2.5 border border-[#003366] text-[#003366] font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Form header */}
            <div className="bg-[#003366] px-8 py-5">
              <h3 className="text-white font-bold text-xl">Manuscript Submission Form</h3>
              <p className="text-blue-200 text-sm mt-1">All fields marked <span className="text-[#C8A951]">*</span> are required.</p>
            </div>

            <div className="px-8 py-8 space-y-6">

              {/* Article Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Article Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="articleType" value={form.articleType} onChange={handleChange} required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003366] bg-white"
                >
                  <option value="">— Select Article Type —</option>
                  <option>Original Research Article</option>
                  <option>Review Article</option>
                  <option>Case Study</option>
                  <option>Short Communication</option>
                  <option>Letter to the Editor</option>
                  <option>Technical Note</option>
                </select>
              </div>

              {/* Manuscript Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Manuscript Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text" name="title" value={form.title} onChange={handleChange} required
                  placeholder="Full title of your manuscript"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003366]"
                />
              </div>

              {/* Authors */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Author(s) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text" name="authors" value={form.authors} onChange={handleChange} required
                  placeholder="e.g. John Doe, Jane Smith, ..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003366]"
                />
              </div>

              {/* Email & Affiliation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Corresponding Author Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email" name="email" value={form.email} onChange={handleChange} required
                    placeholder="author@example.com"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003366]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Affiliation / Institution <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text" name="affiliation" value={form.affiliation} onChange={handleChange} required
                    placeholder="University / Organization"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003366]"
                  />
                </div>
              </div>

              {/* Abstract */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Abstract <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="abstract" value={form.abstract} onChange={handleChange} required rows={5}
                  placeholder="Provide a structured abstract (max 300 words)..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003366] resize-none"
                />
              </div>

              {/* Keywords */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Keywords <span className="text-red-500">*</span>
                </label>
                <input
                  type="text" name="keywords" value={form.keywords} onChange={handleChange} required
                  placeholder="e.g. climate, agriculture, Bangladesh (comma separated)"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003366]"
                />
                <p className="text-xs text-gray-400 mt-1">3–8 keywords, comma separated</p>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Manuscript File <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#003366] transition-colors">
                  <div className="text-3xl mb-2">📄</div>
                  <p className="text-sm text-gray-500 mb-2">Upload your manuscript (DOC, DOCX, or PDF)</p>
                  <input
                    type="file" name="file" required accept=".doc,.docx,.pdf"
                    onChange={(e) => setForm((p) => ({ ...p, file: e.target.files?.[0]?.name || "" }))}
                    className="text-sm text-gray-600"
                  />
                  <p className="text-xs text-gray-400 mt-2">Max file size: 10 MB</p>
                </div>
              </div>

              {/* Declaration */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox" name="declaration" checked={form.declaration}
                    onChange={handleChange} required
                    className="mt-0.5 w-4 h-4 accent-[#003366]"
                  />
                  <span className="text-xs text-gray-600 leading-relaxed">
                    I confirm that this manuscript is original, has not been published elsewhere, and is not under review by another journal.
                    All authors have approved the submission. I agree to the <Link href="/author-guidelines" className="text-[#003366] underline">Author Guidelines</Link> of JARD.
                  </span>
                </label>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#003366] text-white font-bold text-base rounded-lg hover:bg-[#004080] transition-colors shadow-md hover:shadow-lg"
                >
                  Submit Manuscript →
                </button>
                <p className="text-center text-xs text-gray-400 mt-3">
                  Questions? Email us at{" "}
                  <a href="mailto:submit@jardbd.org" className="text-[#003366] underline">submit@jardbd.org</a>
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
