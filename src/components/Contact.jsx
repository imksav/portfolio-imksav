"use client";
import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

export default function Contact() {
  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'error'

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");

    // 1. Capture all form data, including phone
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      message: e.target.message.value,
    };

    try {
      // 2. Send to our Backend API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send");

      // 3. Handle Success
      setStatus("success");
      e.target.reset(); // Clear the form inputs

      // Optional: Reset status back to idle after 5 seconds so they can send another
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-20 bg-slate-900 text-white">
      <div className="max-w-xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Get In Touch</h2>
          <p className="text-slate-400 mt-2">
            Have a project in mind or just want to say hi?
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Name *
            </label>
            <input
              name="name"
              type="text"
              required
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500 transition"
              placeholder="Your Name"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Email *
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500 transition"
              placeholder="your@email.com"
            />
          </div>

          {/* NEW: Phone Field */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Phone (Optional)
            </label>
            <input
              name="phone"
              type="tel"
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500 transition"
              placeholder="+977 9800000000"
            />
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Message *
            </label>
            <textarea
              name="message"
              rows="4"
              required
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500 transition"
              placeholder="How can I help you?"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            disabled={status === "loading" || status === "success"}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex justify-center items-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading" ? (
              <span>Sending...</span>
            ) : status === "success" ? (
              <>
                <CheckCircle size={20} />
                Sent Successfully!
              </>
            ) : (
              <>
                <Send size={20} />
                Send Message
              </>
            )}
          </button>

          {/* Error Feedback */}
          {status === "error" && (
            <div className="flex items-center gap-2 text-red-400 justify-center mt-4">
              <AlertCircle size={18} />
              <p>Something went wrong. Please try again.</p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
