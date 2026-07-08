import React, { useState } from "react";
import { CONTACT_INFO, SOCIAL_LINKS } from "../utils/constants";

const FIELDS = [
  { name: "name",    type: "text",  label: "Full Name",     placeholder: "Your full name",     minLength: 2,  maxLength: 100 },
  { name: "email",   type: "email", label: "Email Address", placeholder: "your@email.com",     minLength: 0,  maxLength: 200 },
  { name: "subject", type: "text",  label: "Subject",       placeholder: "What's this about?", minLength: 3,  maxLength: 200 },
];

const InfoCard = ({ icon, label, value, color }) => (
  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 shadow-sm hover:shadow-md transition-shadow">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">{label}</p>
      <p className="text-gray-800 font-medium text-sm mt-0.5">{value}</p>
    </div>
  </div>
);

const Contact = () => {
  const [formData, setFormData]     = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus]         = useState({ type: null, message: "" });
  const [loading, setLoading]       = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: "" });
    setFieldErrors({});

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Always try to parse JSON — even on error responses
      let data = null;
      try {
        data = await response.json();
      } catch {
        // Response body was not JSON (e.g. 502 from proxy)
        setStatus({
          type: "error",
          message: `Server error (${response.status}). Please try again later.`,
        });
        return;
      }

      if (response.ok && data?.success) {
        setStatus({ type: "success", message: "Your message has been sent! We'll get back to you soon." });
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus({ type: null, message: "" }), 6000);
      } else {
        // Map field-level validation errors
        if (Array.isArray(data?.errors)) {
          const map = {};
          data.errors.forEach((err) => { if (err.field) map[err.field] = err.message; });
          setFieldErrors(map);
        }
        setStatus({ type: "error", message: data?.message || "Failed to submit. Please try again." });
      }
    } catch (err) {
      // Network error — backend not reachable
      console.error("Contact submit error:", err);
      setStatus({
        type: "error",
        message: "Cannot reach the server. Please check your connection or try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl border-2 bg-gray-50 focus:bg-white focus:outline-none transition-all text-sm text-gray-800 placeholder-gray-400 ${
      fieldErrors[field]
        ? "border-red-400 focus:border-red-500 bg-red-50"
        : "border-gray-200 focus:border-blue-500"
    }`;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-white">

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 py-24 px-4 text-center overflow-hidden">
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-56 h-56 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <span className="inline-block bg-white/10 text-white/90 text-xs font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full mb-5 border border-white/15">
            Leo Club of Pokhara Puspanjali
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Get In Touch</h1>
          <p className="text-blue-100/80 text-lg max-w-xl mx-auto font-light">
            Have a question or want to collaborate? We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 lg:grid-cols-5 gap-10">

        {/* Left: Contact Info */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Contact Information</h2>
            <p className="text-gray-500 text-sm">Reach us through any of the channels below.</p>
          </div>

          <div className="flex flex-col gap-3">
            <InfoCard label="Address" value={CONTACT_INFO.address} color="bg-blue-100 text-blue-600"
              icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" /></svg>}
            />
            <InfoCard label="Phone" value={CONTACT_INFO.phone} color="bg-green-100 text-green-600"
              icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.042 11.042 0 005.516 5.516l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>}
            />
            <InfoCard label="Email" value={CONTACT_INFO.email} color="bg-purple-100 text-purple-600"
              icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2.94 6.412A2 2 0 002 8.414V16a2 2 0 002 2h12a2 2 0 002-2V8.414a2 2 0 00-.94-1.679l-7.017-4.154a2 2 0 00-2.126 0L2.94 6.412z" /></svg>}
            />
          </div>

          {/* Social */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Follow Us</p>
            <div className="flex gap-3">
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition shadow-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M8.29 20v-7.752h-2.603V9.349h2.603V7.124c0-2.577 1.574-3.974 3.864-3.974 1.099 0 2.042.082 2.313.118v2.685h-1.588c-1.246 0-1.487.592-1.487 1.46v1.912h2.973l-.386 2.899h-2.587V20" /></svg>
              </a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-orange-400 hover:opacity-90 text-white flex items-center justify-center transition shadow-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 1.802c2.67 0 2.987.01 4.042.059 2.71.123 3.851 1.244 3.974 3.974.049 1.054.059 1.37.059 4.041 0 2.67-.01 2.987-.059 4.041-.123 2.729-1.268 3.859-3.977 3.977-1.053.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.04-.058-2.717-.119-3.851-1.244-3.977-3.942-.059-1.069-.069-1.386-.069-4.041 0-2.67.01-2.986.069-4.04.129-2.729 1.261-3.864 3.975-3.977 1.052-.048 1.368-.058 4.041-.058zm0 1.822c-2.629 0-2.927.01-3.96.058-1.482.069-2.633 1.182-2.702 2.702-.048 1.032-.058 1.331-.058 3.96 0 2.629.01 2.927.058 3.96.069 1.528 1.228 2.653 2.702 2.702 1.033.048 1.331.058 3.96.058 2.629 0 2.927-.01 3.96-.058 1.488-.049 2.646-1.156 2.724-2.702.048-1.033.058-1.331.058-3.96 0-2.629-.01-2.927-.058-3.96-.079-1.528-1.235-2.633-2.703-2.702-1.034-.048-1.332-.058-3.96-.058z" />
                  <path d="M10 4.865a5.135 5.135 0 1 0 0 10.27 5.135 5.135 0 0 0 0-10.27zm0 8.468a3.333 3.333 0 1 1 0-6.666 3.333 3.333 0 0 1 0 6.666z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-md flex-1 min-h-[200px]">
            <iframe
              title="Leo Club Pokhara Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56516.31625951514!2d83.9564258!3d28.2095591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995937bbf0376ff%3A0xf6cf823b25802164!2sPokhara!5e0!3m2!1sen!2snp!4v1680000000000!5m2!1sen!2snp"
              width="100%" height="100%"
              style={{ border: 0, minHeight: "200px" }}
              allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Right: Form */}
        <div className="lg:col-span-3 bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Send a Message</h2>
          <p className="text-gray-400 text-sm mb-8">Fill out the form and we'll respond as soon as possible.</p>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>

            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {FIELDS.slice(0, 2).map(({ name, type, label, placeholder, minLength, maxLength }) => (
                <div key={name}>
                  <label htmlFor={name} className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                    {label} <span className="text-red-400">*</span>
                  </label>
                  <input
                    id={name} type={type} name={name} value={formData[name]}
                    onChange={handleChange} required
                    placeholder={placeholder}
                    minLength={minLength || undefined} maxLength={maxLength || undefined}
                    className={inputClass(name)}
                    aria-invalid={!!fieldErrors[name]}
                    aria-describedby={fieldErrors[name] ? `${name}-error` : undefined}
                  />
                  {fieldErrors[name] && (
                    <p id={`${name}-error`} role="alert" className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <span aria-hidden="true">⚠</span> {fieldErrors[name]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Subject */}
            {FIELDS.slice(2).map(({ name, type, label, placeholder, minLength, maxLength }) => (
              <div key={name}>
                <label htmlFor={name} className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                  {label} <span className="text-red-400">*</span>
                </label>
                <input
                  id={name} type={type} name={name} value={formData[name]}
                  onChange={handleChange} required
                  placeholder={placeholder}
                  minLength={minLength || undefined} maxLength={maxLength || undefined}
                  className={inputClass(name)}
                  aria-invalid={!!fieldErrors[name]}
                  aria-describedby={fieldErrors[name] ? `${name}-error` : undefined}
                />
                {fieldErrors[name] && (
                  <p id={`${name}-error`} role="alert" className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <span aria-hidden="true">⚠</span> {fieldErrors[name]}
                  </p>
                )}
              </div>
            ))}

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                id="message" name="message" value={formData.message}
                onChange={handleChange} rows="5" required
                minLength={5} maxLength={5000}
                placeholder="Write your message here..."
                className={`${inputClass("message")} resize-none`}
                aria-invalid={!!fieldErrors.message}
                aria-describedby={fieldErrors.message ? "message-error" : undefined}
              />
              <div className="flex justify-between items-center mt-1.5">
                {fieldErrors.message
                  ? <p id="message-error" role="alert" className="text-red-500 text-xs flex items-center gap-1"><span aria-hidden="true">⚠</span> {fieldErrors.message}</p>
                  : <span />
                }
                <span className={`text-xs ${formData.message.length > 4800 ? "text-orange-500" : "text-gray-400"}`}>
                  {formData.message.length}/5000
                </span>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit" disabled={loading}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm active:scale-[0.98] transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </>
              )}
            </button>

            {/* Status alerts */}
            {status.type === "success" && (
              <div role="alert" className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                  <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {status.message}
              </div>
            )}
            {status.type === "error" && (
              <div role="alert" className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                  <svg className="w-3.5 h-3.5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                {status.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
