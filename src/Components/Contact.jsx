import React, { useState } from "react";
import Footer from "../Page/Footer";

const FIELDS = [
  { name: "name",    type: "text",  label: "Name",    placeholder: "Your full name",     minLength: 2,  maxLength: 100  },
  { name: "email",   type: "email", label: "Email",   placeholder: "your@email.com",     minLength: 0,  maxLength: 200  },
  { name: "subject", type: "text",  label: "Subject", placeholder: "What's this about?", minLength: 3,  maxLength: 200  },
];

const ContactInfo = ({ icon, label, value }) => (
  <div className="flex items-center gap-5">
    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 shadow-sm flex-shrink-0">
      {icon}
    </div>
    <div>
      <p className="font-semibold text-gray-900">{label}</p>
      <p className="text-gray-600 text-sm">{value}</p>
    </div>
  </div>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", subject: "", message: "",
  });
  const [status, setStatus]           = useState({ type: null, message: "" }); // 'success' | 'error' | null
  const [loading, setLoading]         = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
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

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error("Failed to parse response:", parseError);
        setStatus({ type: "error", message: `Server error (${response.status}). Please try again later.` });
        return;
      }

      if (response.ok && data.success) {
        setStatus({ type: "success", message: "Your message has been sent successfully! We'll get back to you soon." });
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus({ type: null, message: "" }), 5000);
      } else {
        if (data.errors && Array.isArray(data.errors)) {
          const fieldErrorMap = {};
          data.errors.forEach((fieldErr) => {
            if (fieldErr.field) fieldErrorMap[fieldErr.field] = fieldErr.message;
          });
          setFieldErrors(fieldErrorMap);
        }
        setStatus({ type: "error", message: data.message || "Failed to submit form. Please try again." });
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus({ type: "error", message: "Something went wrong. Please check your connection and try again." });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:outline-none shadow-sm text-sm transition-colors ${
      fieldErrors[field]
        ? "border-red-400 focus:ring-red-300 bg-red-50"
        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
    }`;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-white to-blue-50">
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-10">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-blue-600">Contact Us</h1>
          <p className="text-gray-600 text-lg mt-3 max-w-xl mx-auto">
            We're here to help. Reach out with any inquiries or feedback.
          </p>
          <div className="mt-4 w-24 h-1 mx-auto bg-blue-600 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* ── Left: Contact Info ── */}
          <div className="space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">Get in Touch</h3>
              <p className="text-gray-500 text-sm mt-2">
                Feel free to reach out anytime — we'll get back to you as soon as possible.
              </p>
            </div>

            <div className="space-y-6">
              <ContactInfo
                label="Address"
                value="Pokhara, Nepal"
                icon={
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                }
              />
              <ContactInfo
                label="Phone"
                value="+977-61-XXXXXX"
                icon={
                  /* BUG FIX: previous path was a malformed copy of the email icon */
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.042 11.042 0 005.516 5.516l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                }
              />
              <ContactInfo
                label="Email"
                value="leoclubpokharapuspanjali@gmail.com"
                icon={
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.94 6.412A2 2 0 002 8.414V16a2 2 0 002 2h12a2 2 0 002-2V8.414a2 2 0 00-.94-1.679l-7.017-4.154a2 2 0 00-2.126 0L2.94 6.412z" />
                  </svg>
                }
              />
            </div>

            {/* Map */}
            <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <iframe
                title="Leo Club Pokhara Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56516.31625951514!2d83.9564258!3d28.2095591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995937bbf0376ff%3A0xf6cf823b25802164!2sPokhara!5e0!3m2!1sen!2snp!4v1680000000000!5m2!1sen!2snp"
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* ── Right: Contact Form ── */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow">
            <h3 className="text-2xl font-semibold text-gray-900 mb-1">Send a Message</h3>
            <p className="text-gray-500 text-sm mb-6">Fill out the form below and we'll respond shortly.</p>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>

              {/* Text fields */}
              {FIELDS.map(({ name, type, label, placeholder, minLength, maxLength }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 capitalize">
                    {label} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                    placeholder={placeholder}
                    minLength={minLength || undefined}
                    maxLength={maxLength || undefined}
                    className={inputClass(name)}
                  />
                  {fieldErrors[name] && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <span>⚠</span> {fieldErrors[name]}
                    </p>
                  )}
                </div>
              ))}

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                  minLength={5}
                  maxLength={5000}
                  placeholder="Write your message here... (5–5000 characters)"
                  className={`${inputClass("message")} resize-none`}
                />
                <div className="flex justify-between items-center mt-1">
                  {fieldErrors.message ? (
                    <p className="text-red-500 text-xs flex items-center gap-1">
                      <span>⚠</span> {fieldErrors.message}
                    </p>
                  ) : (
                    <span />
                  )}
                  <span className={`text-xs ${formData.message.length > 5000 ? "text-red-500" : "text-gray-400"}`}>
                    {formData.message.length}/5000
                  </span>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg text-sm hover:bg-blue-700 active:scale-[0.98] transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>

              {/* Status messages */}
              {status.type === "success" && (
                <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm flex items-start gap-2">
                  <span className="text-green-500 text-base mt-0.5">✓</span>
                  {status.message}
                </div>
              )}
              {status.type === "error" && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex items-start gap-2">
                  <span className="text-red-500 text-base mt-0.5">✕</span>
                  {status.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;