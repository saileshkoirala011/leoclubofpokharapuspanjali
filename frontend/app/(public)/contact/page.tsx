"use client";

import React, { useState } from "react";
import type { Metadata }   from "next";
import PageHero             from "@/components/ui/PageHero";
import { CONTACT_INFO, SOCIAL_LINKS } from "@/lib/constants";
import { submitContact }    from "@/lib/api";

// ── Field config ──────────────────────────────────────────────────────────────

const FIELDS = [
  { name: "name",    type: "text",  label: "Full Name",     placeholder: "Your full name"      },
  { name: "email",   type: "email", label: "Email Address", placeholder: "your@email.com"      },
  { name: "subject", type: "text",  label: "Subject",       placeholder: "What is this about?" },
] as const;

type FieldName = typeof FIELDS[number]["name"];

const INFO = [
  { label: "Address", value: CONTACT_INFO.address, icon: "M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" },
  { label: "Phone",   value: CONTACT_INFO.phone,   icon: "M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.042 11.042 0 005.516 5.516l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" },
  { label: "Email",   value: CONTACT_INFO.email,   icon: "M2.94 6.412A2 2 0 002 8.414V16a2 2 0 002 2h12a2 2 0 002-2V8.414a2 2 0 00-.94-1.679l-7.017-4.154a2 2 0 00-2.126 0L2.94 6.412z" },
] as const;

// ── Component ─────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [form, setForm]     = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<FieldName | "message", string>>>({});
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
    if (status) setStatus(null);
  };

  // Client-side validation
  const validate = (): boolean => {
    const next: typeof errors = {};
    if (!form.name.trim()    || form.name.trim().length < 2)   next.name    = "Name must be at least 2 characters";
    if (!form.email.trim()   || !/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address";
    if (!form.subject.trim() || form.subject.trim().length < 3) next.subject = "Subject must be at least 3 characters";
    if (!form.message.trim() || form.message.trim().length < 5) next.message = "Message must be at least 5 characters";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await submitContact(form);
      setStatus({ type: "success", msg: "Your message has been sent! We'll get back to you soon." });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to send. Please try again.";
      setStatus({ type: "error", msg });
    } finally {
      setLoading(false);
    }
  };

  const inputCls = (field: FieldName | "message") =>
    `w-full px-4 py-3 rounded-xl border-2 bg-white/5 text-white placeholder-white/25 focus:outline-none transition-all text-sm ${
      errors[field] ? "border-red-400 focus:border-red-400" : "border-white/10 focus:border-[#c9a84c]"
    }`;

  return (
    <div className="w-full min-h-screen bg-[#0a1628]">
      <PageHero
        label="Leo Club of Pokhara Puspanjali"
        title="Get In Touch"
        subtitle="Have a question or want to collaborate? We'd love to hear from you."
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid lg:grid-cols-5 gap-12">

        {/* ── Left: info + map ── */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div>
            <h2 className="font-display text-xl font-bold text-white mb-1">Contact Information</h2>
            <p className="text-white/40 text-sm mb-6">Reach us through any of the channels below.</p>
            <div className="flex flex-col gap-3">
              {INFO.map(({ label, value, icon }) => (
                <div key={label} className="flex items-center gap-4 p-4 rounded-2xl border border-white/8 bg-white/4 hover:border-[#c9a84c]/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/15 text-[#c9a84c] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d={icon} /></svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">{label}</p>
                    <p className="text-white/80 font-medium text-sm mt-0.5">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/30 mb-3">Follow Us</p>
            <div className="flex gap-3">
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-blue-600 border border-white/10 text-white flex items-center justify-center transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.29 20v-7.752h-2.603V9.349h2.603V7.124c0-2.577 1.574-3.974 3.864-3.974 1.099 0 2.042.082 2.313.118v2.685h-1.588c-1.246 0-1.487.592-1.487 1.46v1.912h2.973l-.386 2.899h-2.587V20" />
                </svg>
              </a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-gradient-to-br hover:from-pink-500 hover:to-orange-400 border border-white/10 text-white flex items-center justify-center transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 1.802c2.67 0 2.987.01 4.042.059 2.71.123 3.851 1.244 3.974 3.974.049 1.054.059 1.37.059 4.041 0 2.67-.01 2.987-.059 4.041-.123 2.729-1.268 3.859-3.977 3.977-1.053.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.04-.058-2.717-.119-3.851-1.244-3.977-3.942-.059-1.069-.069-1.386-.069-4.041 0-2.67.01-2.986.069-4.04.129-2.729 1.261-3.864 3.975-3.977 1.052-.048 1.368-.058 4.041-.058zm0 1.822c-2.629 0-2.927.01-3.96.058-1.482.069-2.633 1.182-2.702 2.702-.048 1.032-.058 1.331-.058 3.96 0 2.629.01 2.927.058 3.96.069 1.528 1.228 2.653 2.702 2.702 1.033.048 1.331.058 3.96.058 2.629 0 2.927-.01 3.96-.058 1.488-.049 2.646-1.156 2.724-2.702.048-1.033.058-1.331.058-3.96 0-2.629-.01-2.927-.058-3.96-.079-1.528-1.235-2.633-2.703-2.702-1.034-.048-1.332-.058-3.96-.058z" />
                  <path d="M10 4.865a5.135 5.135 0 1 0 0 10.27 5.135 5.135 0 0 0 0-10.27zm0 8.468a3.333 3.333 0 1 1 0-6.666 3.333 3.333 0 0 1 0 6.666z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden border border-white/8 min-h-[200px] flex-1">
            <iframe
              title="Leo Club Pokhara Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56516.31625951514!2d83.9564258!3d28.2095591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995937bbf0376ff%3A0xf6cf823b25802164!2sPokhara!5e0!3m2!1sen!2snp!4v1680000000000!5m2!1sen!2snp"
              width="100%" height="100%"
              style={{ border: 0, minHeight: "200px", filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* ── Right: form ── */}
        <div className="lg:col-span-3 rounded-3xl border border-white/8 bg-white/4 p-8 sm:p-10">
          <h2 className="font-display text-2xl font-bold text-white mb-1">Send a Message</h2>
          <p className="text-white/35 text-sm mb-8">Fill out the form and we&apos;ll respond as soon as possible.</p>

          <form onSubmit={onSubmit} noValidate className="space-y-5">
            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {FIELDS.slice(0, 2).map(({ name, type, label, placeholder }) => (
                <div key={name}>
                  <label htmlFor={name} className="block text-[10px] font-bold uppercase tracking-[0.18em] text-white/40 mb-2">
                    {label} <span className="text-[#c9a84c]">*</span>
                  </label>
                  <input
                    id={name} name={name} type={type}
                    value={form[name]} onChange={onChange}
                    required placeholder={placeholder}
                    className={inputCls(name)}
                    aria-describedby={errors[name] ? `${name}-err` : undefined}
                  />
                  {errors[name] && <p id={`${name}-err`} role="alert" className="text-red-400 text-xs mt-1.5">⚠ {errors[name]}</p>}
                </div>
              ))}
            </div>

            {/* Subject */}
            {FIELDS.slice(2).map(({ name, type, label, placeholder }) => (
              <div key={name}>
                <label htmlFor={name} className="block text-[10px] font-bold uppercase tracking-[0.18em] text-white/40 mb-2">
                  {label} <span className="text-[#c9a84c]">*</span>
                </label>
                <input
                  id={name} name={name} type={type}
                  value={form[name]} onChange={onChange}
                  required placeholder={placeholder}
                  className={inputCls(name)}
                  aria-describedby={errors[name] ? `${name}-err` : undefined}
                />
                {errors[name] && <p id={`${name}-err`} role="alert" className="text-red-400 text-xs mt-1.5">⚠ {errors[name]}</p>}
              </div>
            ))}

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-[10px] font-bold uppercase tracking-[0.18em] text-white/40 mb-2">
                Message <span className="text-[#c9a84c]">*</span>
              </label>
              <textarea
                id="message" name="message" rows={5}
                value={form.message} onChange={onChange}
                required placeholder="Write your message here…"
                className={`${inputCls("message")} resize-none`}
                aria-describedby={errors.message ? "message-err" : undefined}
              />
              <div className="flex justify-between mt-1.5">
                {errors.message
                  ? <p id="message-err" role="alert" className="text-red-400 text-xs">⚠ {errors.message}</p>
                  : <span />}
                <span className={`text-xs ${form.message.length > 4800 ? "text-orange-400" : "text-white/25"}`}>
                  {form.message.length}/5000
                </span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit" disabled={loading}
              className="btn-gold w-full justify-center py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Sending…
                </>
              ) : (
                <>
                  Send Message
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </>
              )}
            </button>

            {/* Status alerts */}
            {status?.type === "success" && (
              <div role="alert" className="p-4 bg-green-900/30 border border-green-500/30 text-green-300 rounded-xl text-sm flex items-start gap-3">
                <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {status.msg}
              </div>
            )}
            {status?.type === "error" && (
              <div role="alert" className="p-4 bg-red-900/30 border border-red-500/30 text-red-300 rounded-xl text-sm flex items-start gap-3">
                <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                {status.msg}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
