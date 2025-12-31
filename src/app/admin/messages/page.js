"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Trash2, Mail, Phone, Calendar } from "lucide-react";
import Link from "next/link";

export default function MessageInbox() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    setLoading(true);
    const { data } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });
    setMessages(data || []);
    setLoading(false);
  }

  async function handleDelete(id) {
    if (!confirm("Delete this message?")) return;
    const { error } = await supabase.from("messages").delete().eq("id", id);
    if (!error) {
      setMessages(messages.filter((m) => m.id !== id));
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Inbox</h1>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
            {messages.length} Messages
          </span>
        </div>

        {loading ? (
          <div className="text-center py-10">Loading messages...</div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition"
              >
                {/* Header Row */}
                <div className="flex justify-between items-start mb-4 border-b border-slate-50 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {msg.name}
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-slate-500 mt-1">
                      <a
                        href={`mailto:${msg.email}`}
                        className="flex items-center gap-1 hover:text-blue-600"
                      >
                        <Mail size={14} /> {msg.email}
                      </a>
                      {msg.phone && (
                        <span className="flex items-center gap-1">
                          <Phone size={14} /> {msg.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="text-slate-300 hover:text-red-500 transition p-1"
                      title="Delete Message"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Message Body */}
                <div className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                  {msg.message}
                </div>

                {/* Reply Button */}
                <div className="mt-4 pt-4 border-t border-slate-50">
                  <a
                    href={`mailto:${msg.email}?subject=Re: Inquiry from Portfolio`}
                    className="text-sm font-semibold text-blue-600 hover:underline"
                  >
                    Reply via Email →
                  </a>
                </div>
              </div>
            ))}

            {messages.length === 0 && (
              <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                <p className="text-slate-400">No messages yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
