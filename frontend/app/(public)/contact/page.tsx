"use client";

import React, { useState, useCallback } from "react";
import PageHero from "@/components/ui/PageHero";
import { MapPin, Phone, Mail, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { CONTACT_INFO, SOCIAL_LINKS } from "@/lib/constants";
import { submitContact } from "@/lib/api";

// ── Types ─────────────────────────────────────────────────────────────────────

type FieldName = "name" | "email" | "subject" | "message";

interface FormState {
  name:    string;
  email:   string;
  subject: string;
  message: string;
}

// ── Validation rules ──────────────────────────────────────────────────────────

const RULES: Record<FieldName, (v: string) => string> = {
  name:    v => v.trim().length < 2    ? "Name must be at least 2 characters"    : "",
  email:   v => !/^\S+@\S+\.\S+$/.test(v.trim()) ? "Enter a valid email address" : "",
  subject: v => v.trim().length < 3    ? "Subject must be at least 3 characters" : "",
  message: v => v.trim().length < 5    ? "Message must be at least 5 characters" : "",
};

// ── Contact info cards ────────────────────────────────────────────────────────

const INFO = [
  { label: "Address", value: CONTACT_INFO.address, Icon: MapPin, bg: "#EBF3FF", color: "#1B3A6B" },
  { label: "Phone",   value: CONTACT_INFO.phone,   Icon: Phone,  bg: "#EBF5FB", color: "#5BB8E8" },
  { label: "Email",   value: CONTACT_INFO.email,   Icon: Mail,   bg: "#FEF9EC", color: "#D4A017" },
] as const;

// ── Component ─────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [form,    setForm]    = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [errors,  setErrors]  = useState<Partial<Record<FieldName, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [status,  setStatus]  = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errMsg,  setErrMsg]  = useState("");

  // Validate a single field
  const validateField = useCallback((name: FieldName, value: string): string => {
    return RULES[name](value);
  }, []);

  // Real-time: validate on change after the field has been touched
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as { name: FieldName; value: string };
    setForm(p => ({ ...p, [name]: value }));
    if (touched[name]) {
      setErrors(p => ({ ...p, [name]: validateField(name, value) }));
    }
    if (status === "error") setStatus("idle");
  };

  // Mark touched on blur and validate immediately
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as { name: FieldName; value: string };
    setTouched(p => ({ ...p, [name]: true }));
    setErrors(p => ({ ...p, [name]: validateField(name, value) }));
  };

  // Full validation before submit
  const validateAll = (): boolean => {
    const next: Partial<Record<FieldName, string>> = {};
    (Object.keys(RULES) as FieldName[]).forEach(key => {
      const err = validateField(key, form[key]);
      if (err) next[key] = err;
    });
    setErrors(next);
    setTouched({ name: true, email: true, subject: true, message: true });
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;
    setStatus("loading");
    try {
      await submitContact(form);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTouched({});
      setErrors({});
    } catch (err: unknown) {
      setStatus("error");
      setErrMsg(err instanceof Error ? err.message : "Failed to send. Please try again.");
    }
  };

  const fieldCls = (name: FieldName) =>
    `input ${errors[name] && touched[name] ? "input-error" : ""}`;

  const isValid = (Object.keys(RULES) as FieldName[]).every(k => !validateField(k, form[k]));

  return (
    <div className="w-full min-h-screen" style={{ background: "var(--bg)" }}>
      <PageHero
        label="Leo Club of Pokhara Puspanjali"
        title="Get In Touch"
        subtitle="Have a question or want to collaborate? We'd love to hear from you."
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid lg:grid-cols-5 gap-12">

        {/* ── Left panel ── */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div>
            <h2 className="font-display text-xl font-bold text-[#1E293B] mb-1">Contact Information</h2>
            <p className="text-[#64748B] text-sm">Reach us through any of the channels below.</p>
          </div>

          {INFO.map(({ label, value, Icon, bg, color }) => (
            <div
              key={label}
              className="rounded-2xl p-4 flex items-center gap-4 border border-[#D6EAF8]"
              style={{ background: bg }}
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                <Icon size={20} style={{ color }} strokeWidth={2} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#64748B]">{label}</p>
                <p className="font-semibold text-sm mt-0.5 truncate" style={{ color }}>{value}</p>
              </div>
            </div>
          ))}

          {/* Social links */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-3">Follow Us</p>
            <div className="flex gap-3">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank" rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-xl bg-[#EBF3FF] text-[#1B3A6B] flex items-center justify-center transition-all hover:bg-[#1B3A6B] hover:text-white hover:scale-105"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank" rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-105 text-white"
                style={{ background: "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)" }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Map */}
          <div
            className="rounded-2xl overflow-hidden border border-[#D6EAF8] flex-1"
            style={{ minHeight: "220px", boxShadow: "0 2px 12px rgba(30,64,175,0.08)" }}
          >
            <iframe
              title="Leo Club Pokhara Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56516.31625951514!2d83.9564258!3d28.2095591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995937bbf0376ff%3A0xf6cf823b25802164!2sPokhara!5e0!3m2!1sen!2snp!4v1680000000000!5m2!1sen!2snp"
              width="100%" height="100%"
              style={{ border: 0, minHeight: "220px" }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* ── Right panel — form ── */}
        <div
          className="lg:col-span-3 bg-white rounded-3xl border border-[#D6EAF8] p-8 sm:p-10"
          style={{ boxShadow: "0 4px 24px rgba(30,64,175,0.10)" }}
        >
          {/* Success screen */}
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center text-center py-12 gap-5">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: "#ECFDF5", border: "2px solid #6EE7B7" }}
              >
                <CheckCircle size={40} className="text-green-500" strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-[#1E293B] mb-2">
                  Message Sent!
                </h3>
                <p className="text-[#64748B] text-[15px] leading-relaxed max-w-sm">
                  Thank you for reaching out. We&apos;ve received your message and sent a confirmation to your email. We&apos;ll get back to you soon.
                </p>
              </div>
              <button
                onClick={() => setStatus("idle")}
                className="btn btn-ghost btn-sm mt-2"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <>
              <h2 className="font-display text-2xl font-bold text-[#1E293B] mb-1">Send a Message</h2>
              <p className="text-[#64748B] text-sm mb-8">
                Fill out the form and we&apos;ll respond as soon as possible.
              </p>

              <form onSubmit={onSubmit} noValidate className="space-y-5">

                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {(["name", "email"] as const).map(name => {
                    const field = { name: { label: "Full Name", type: "text", placeholder: "Your full name" }, email: { label: "Email Address", type: "email", placeholder: "your@email.com" } }[name];
                    const hasErr = !!(errors[name] && touched[name]);
                    return (
                      <div key={name}>
                        <label htmlFor={name} className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[#64748B] mb-2">
                          {field.label} <span className="text-[#C8102E]">*</span>
                        </label>
                        <input
                          id={name} name={name} type={field.type}
                          value={form[name]} onChange={onChange} onBlur={onBlur}
                          required placeholder={field.placeholder}
                          className={fieldCls(name)}
                          aria-invalid={hasErr}
                          aria-describedby={hasErr ? `${name}-err` : undefined}
                          autoComplete={name === "email" ? "email" : "name"}
                        />
                        {hasErr && (
                          <p id={`${name}-err`} role="alert" className="flex items-center gap-1 text-[#C8102E] text-xs mt-1.5 font-medium">
                            <AlertCircle size={12} />
                            {errors[name]}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[#64748B] mb-2">
                    Subject <span className="text-[#C8102E]">*</span>
                  </label>
                  <input
                    id="subject" name="subject" type="text"
                    value={form.subject} onChange={onChange} onBlur={onBlur}
                    required placeholder="What is this about?"
                    className={fieldCls("subject")}
                    aria-invalid={!!(errors.subject && touched.subject)}
                    aria-describedby={errors.subject && touched.subject ? "subject-err" : undefined}
                  />
                  {errors.subject && touched.subject && (
                    <p id="subject-err" role="alert" className="flex items-center gap-1 text-[#C8102E] text-xs mt-1.5 font-medium">
                      <AlertCircle size={12} />
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[#64748B] mb-2">
                    Message <span className="text-[#C8102E]">*</span>
                  </label>
                  <textarea
                    id="message" name="message" rows={5}
                    value={form.message} onChange={onChange} onBlur={onBlur}
                    required placeholder="Write your message here…"
                    className={`${fieldCls("message")} resize-none`}
                    aria-invalid={!!(errors.message && touched.message)}
                    aria-describedby={errors.message && touched.message ? "message-err" : undefined}
                  />
                  <div className="flex justify-between items-center mt-1.5">
                    {errors.message && touched.message ? (
                      <p id="message-err" role="alert" className="flex items-center gap-1 text-[#C8102E] text-xs font-medium">
                        <AlertCircle size={12} />
                        {errors.message}
                      </p>
                    ) : <span />}
                    <span className={`text-xs tabular-nums ${form.message.length > 4800 ? "text-orange-500 font-semibold" : "text-[#94A3B8]"}`}>
                      {form.message.length} / 5000
                    </span>
                  </div>
                </div>

                {/* Error alert */}
                {status === "error" && (
                  <div role="alert" className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-start gap-3">
                    <AlertCircle size={18} className="flex-shrink-0 text-red-500 mt-0.5" />
                    <span>{errMsg}</span>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn btn-primary w-full justify-center"
                  style={{ opacity: status === "loading" ? 0.8 : 1 }}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={16} strokeWidth={2} />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-[#94A3B8]">
                  We typically reply within 24 hours.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
