import React, { useState } from "react";
import Footer from "../Page/Footer";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setFieldErrors({});

        try {
            const response = await fetch("/api/contacts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                // Handle validation errors with field-specific messages
                if (data.errors && Array.isArray(data.errors)) {
                    const fieldErrorMap = {};
                    data.errors.forEach(err => {
                        if (err.field) {
                            fieldErrorMap[err.field] = err.message;
                        }
                    });
                    setFieldErrors(fieldErrorMap);
                }
                
                const errorMsg = data.message || `HTTP error! status: ${response.status}`;
                throw new Error(errorMsg);
            }

            if (data.success) {
                setSubmitted(true);
                setFormData({ name: "", email: "", subject: "", message: "" });
                setFieldErrors({});
                setTimeout(() => setSubmitted(false), 3000);
            } else {
                setError(data.message || "Failed to submit form");
            }
        } catch (err) {
            setError(err.message);
            console.error("Submission error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full py-25 bg-gradient-to-br from-white to-blue-50 max-h-screen">
            <div className="max-w-6xl mx-auto px-6 space-y-8">
                 <div className="text-center mb-16">
                     <h1 className="text-4xl font-extrabold text-blue-600">
                         Contact Us
                     </h1>
                     <p className="text-gray-600 text-lg mt-3 max-w-xl mx-auto">
                         We're here to help. Reach out with any inquiries or feedback.
                     </p>
                     <div className="mt-4 w-24 h-1 mx-auto bg-blue-600 rounded-full"></div>
                 </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all">
                         <h3 className="text-3xl font-semibold text-gray-900">Get in Touch</h3>
                         <p className="text-gray-600">
                             Feel free to reach out anytime—we will get back to you as soon as possible.
                         </p>

                         <div className="space-y-8">
                             <div className="flex items-center gap-5">
                                 <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                                     <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                                         <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
                                     </svg>
                                 </div>
                                 <div>
                                     <p className="font-semibold text-gray-900">Address</p>
                                     <p className="text-gray-600">Pokhara, Nepal</p>
                                 </div>
                             </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                                     <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                                         <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.740 4.435a1 1 0 01-.540 1.06l-1.548.773c.958 1.846 2.956 3.845 4.802 4.802l.773-1.548a1 1 0 011.06-.540l4.435.740a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 4 14.18 4 9.5V5a1 1 0 011-1h2.153z" />
                                     </svg>
                                 </div>
                                 <div>
                                     <p className="font-semibold text-gray-900">Phone</p>
                                     <p className="text-gray-600">+977-61-XXXXXX</p>
                                 </div>
                             </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                                     <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                                         <path d="M2.94 6.412A2 2 0 002 8.414V16a2 2 0 002 2h12a2 2 0 002-2V8.414a2 2 0 00-.94-1.679l-7.017-4.154a2 2 0 00-2.126 0l-7.017 4.154z" />
                                     </svg>
                                 </div>
                                 <div>
                                     <p className="font-semibold text-gray-900">Email</p>
                                     <p className="text-gray-600">leoclubpokharapuspanjali@gmail.com</p>
                                 </div>
                             </div>
                         </div>
                     </div>

                    <div className="bg-white p-9 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all">
                        <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm text-blue-800">
                                <strong>Form Requirements:</strong>
                            </p>
                            <ul className="text-xs text-blue-700 mt-2 space-y-1">
                                <li>• <strong>Name:</strong> 2-100 characters</li>
                                <li>• <strong>Email:</strong> Valid email format</li>
                                <li>• <strong>Subject:</strong> 3-200 characters</li>
                                <li>• <strong>Message:</strong> 5-5000 characters</li>
                            </ul>
                        </div>
                         <form onSubmit={handleSubmit} className="space-y-6">
                            {["name", "email", "subject"].map((field) => (
                                <div key={field}>
                                    <label className="block text-sm font-semibold text-gray-800 mb-2 capitalize">
                                        {field}
                                    </label>
                                    <input
                                        type={field === "email" ? "email" : "text"}
                                        name={field}
                                        value={formData[field]}
                                        onChange={handleChange}
                                        required
                                        placeholder={`Your ${field}`}
                                        className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none shadow-sm ${
                                            fieldErrors[field] 
                                                ? 'border-red-500 focus:ring-red-600' 
                                                : 'border-gray-300 focus:ring-blue-600'
                                        }`}
                                    />
                                    {fieldErrors[field] && (
                                        <p className="text-red-600 text-sm mt-1">{fieldErrors[field]}</p>
                                    )}
                                </div>
                            ))}

                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-2">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="5"
                                    required
                                    placeholder="Write your message..."
                                    className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none resize-none shadow-sm ${
                                        fieldErrors.message 
                                            ? 'border-red-500 focus:ring-red-600' 
                                            : 'border-gray-300 focus:ring-blue-600'
                                    }`}
                                ></textarea>
                                {fieldErrors.message && (
                                    <p className="text-red-600 text-sm mt-1">{fieldErrors.message}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg text-base hover:bg-blue-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Sending..." : "Send Message"}
                            </button>

                            {submitted && (
                                <div className="p-3 bg-green-100 text-green-700 rounded-lg text-center">
                                    Your message has been sent successfully!
                                </div>
                            )}

                            {error && (
                                <div className="p-3 bg-red-100 text-red-700 rounded-lg text-center">
                                    {error}
                                </div>
                            )}
                         </form>
                     </div>
                 </div>
             </div>
           <div className="mt-12">
         <Footer />
            </div>
         </div>
     );
 };
            
 export default Contact;
