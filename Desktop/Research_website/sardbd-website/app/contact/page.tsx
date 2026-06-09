"use client";
import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div>
      <div className="bg-[#003366] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#C8A951] text-sm font-semibold uppercase tracking-widest mb-2">JARD</p>
          <h1 className="text-3xl font-extrabold mb-2">Contact Us</h1>
          <p className="text-blue-200 text-sm">Bangladesh Journal of Applied Research &amp; Development · SARD BD</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">

          {/* Contact Info */}
          <div className="md:col-span-2 space-y-5">
            <h2 className="text-lg font-bold text-[#003366]">Get in Touch</h2>
            {[
              { icon: "📧", title: "Editorial Inquiries", info: "editor@jardbd.org" },
              { icon: "📨", title: "Manuscript Submission", info: "submit@jardbd.org" },
              { icon: "🌐", title: "Website", info: "www.jardbd.org" },
              { icon: "📍", title: "Address", info: "Bangladesh" },
            ].map((c) => (
              <div key={c.title} className="flex gap-3 items-start">
                <div className="text-xl">{c.icon}</div>
                <div>
                  <div className="font-semibold text-[#003366] text-sm">{c.title}</div>
                  <div className="text-gray-500 text-sm">{c.info}</div>
                </div>
              </div>
            ))}

            <div className="border-t border-gray-200 pt-5">
              <h3 className="font-bold text-[#003366] text-sm mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/submit" className="text-[#003366] hover:underline">→ Submit Manuscript</Link></li>
                <li><Link href="/author-guidelines" className="text-[#003366] hover:underline">→ Author Guidelines</Link></li>
                <li><Link href="/editorial-board" className="text-[#003366] hover:underline">→ Editorial Board</Link></li>
                <li><Link href="/current-issue" className="text-[#003366] hover:underline">→ Current Issue</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-3">
            {sent ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-3">✅</div>
                <h3 className="text-xl font-bold text-[#003366] mb-2">Message Sent!</h3>
                <p className="text-gray-500 text-sm mb-5">We will get back to you within 2–3 business days.</p>
                <button onClick={() => setSent(false)} className="px-5 py-2 bg-[#003366] text-white rounded-lg hover:bg-[#004080] transition-colors text-sm font-semibold">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 space-y-4 shadow-sm">
                <h3 className="font-bold text-[#003366] text-lg mb-1">Send a Message</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Your Name *</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003366]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003366]" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Subject *</label>
                  <select name="subject" value={form.subject} onChange={handleChange} required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003366] bg-white">
                    <option value="">— Select Subject —</option>
                    <option>Manuscript Submission Inquiry</option>
                    <option>Review Process Query</option>
                    <option>Editorial Board Membership</option>
                    <option>Subscription / Access</option>
                    <option>Technical Issue</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                    placeholder="Write your message here..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003366] resize-none" />
                </div>

                <button type="submit"
                  className="w-full py-3 bg-[#003366] text-white font-bold rounded-lg hover:bg-[#004080] transition-colors">
                  Send Message →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
