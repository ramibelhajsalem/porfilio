"use client";

import { useState, useTransition } from "react";
import { markMessageRead, archiveMessage } from "@/lib/supabase/actions";
import type { ContactSubmission } from "@/lib/supabase/types";
import { Mail, MailOpen, Archive, ChevronDown, ChevronUp } from "lucide-react";

export default function MessagesClient({
  messages: initial,
}: {
  messages: ContactSubmission[];
}) {
  const [messages, setMessages] = useState(initial);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  function toggleExpand(id: string) {
    setExpanded((prev) => {
      const next = prev === id ? null : id;
      // Mark as read when opening
      if (next) {
        const msg = messages.find((m) => m.id === id);
        if (msg && !msg.is_read) {
          setMessages((prev) =>
            prev.map((m) => (m.id === id ? { ...m, is_read: true } : m))
          );
          startTransition(async () => {
            await markMessageRead(id);
          });
        }
      }
      return next;
    });
  }

  function handleArchive(id: string) {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    startTransition(async () => {
      await archiveMessage(id);
    });
  }

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="space-y-3">
      {messages.length === 0 && (
        <div className="text-center py-16 text-white/30">
          <Mail className="w-8 h-8 mx-auto mb-3 opacity-30" />
          <p>No messages yet. Your contact form submissions will appear here.</p>
        </div>
      )}

      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`bg-white/5 border rounded-2xl overflow-hidden transition ${
            msg.is_read ? "border-white/8" : "border-teal-500/30"
          }`}
        >
          {/* Header row */}
          <div
            className="flex items-center gap-4 p-4 cursor-pointer hover:bg-white/5 transition"
            onClick={() => toggleExpand(msg.id)}
          >
            {/* Avatar */}
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                msg.is_read ? "bg-white/10 text-white/50" : "bg-teal-700 text-white"
              }`}
            >
              {msg.name[0].toUpperCase()}
            </div>

            {/* Meta */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-white text-sm font-medium">{msg.name}</span>
                {!msg.is_read && (
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                )}
                {msg.company && (
                  <span className="text-white/30 text-xs">· {msg.company}</span>
                )}
              </div>
              <p className="text-white/40 text-xs truncate mt-0.5">{msg.email}</p>
            </div>

            {/* Tags */}
            <div className="hidden md:flex items-center gap-2 shrink-0">
              {msg.project_type && (
                <span className="px-2.5 py-1 text-[10px] bg-white/5 text-white/40 rounded-full">
                  {msg.project_type}
                </span>
              )}
              {msg.budget && (
                <span className="px-2.5 py-1 text-[10px] bg-teal-500/10 text-teal-400/80 rounded-full">
                  {msg.budget}
                </span>
              )}
            </div>

            <span className="text-white/20 text-xs shrink-0 hidden lg:block">
              {formatDate(msg.created_at)}
            </span>

            {/* Read indicator */}
            <div className="text-white/20 shrink-0">
              {msg.is_read ? (
                <MailOpen className="w-4 h-4" />
              ) : (
                <Mail className="w-4 h-4 text-teal-400" />
              )}
            </div>

            {expanded === msg.id ? (
              <ChevronUp className="w-4 h-4 text-white/20 shrink-0" />
            ) : (
              <ChevronDown className="w-4 h-4 text-white/20 shrink-0" />
            )}
          </div>

          {/* Expanded content */}
          {expanded === msg.id && (
            <div className="px-5 pb-5 border-t border-white/5 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-xs">
                <div>
                  <span className="text-white/30 uppercase tracking-wider block mb-1">From</span>
                  <a
                    href={`mailto:${msg.email}`}
                    className="text-teal-400 hover:text-teal-300 transition"
                  >
                    {msg.email}
                  </a>
                </div>
                {msg.company && (
                  <div>
                    <span className="text-white/30 uppercase tracking-wider block mb-1">Company</span>
                    <span className="text-white/70">{msg.company}</span>
                  </div>
                )}
                {msg.project_type && (
                  <div>
                    <span className="text-white/30 uppercase tracking-wider block mb-1">Project Type</span>
                    <span className="text-white/70">{msg.project_type}</span>
                  </div>
                )}
                {msg.budget && (
                  <div>
                    <span className="text-white/30 uppercase tracking-wider block mb-1">Budget</span>
                    <span className="text-white/70">{msg.budget}</span>
                  </div>
                )}
                <div>
                  <span className="text-white/30 uppercase tracking-wider block mb-1">Received</span>
                  <span className="text-white/70">{formatDate(msg.created_at)}</span>
                </div>
              </div>

              <div className="mb-5">
                <span className="text-white/30 uppercase tracking-wider text-xs block mb-2">Message</span>
                <p className="text-white/80 text-sm leading-relaxed bg-white/5 rounded-xl p-4">
                  {msg.message}
                </p>
              </div>

              <div className="flex gap-3">
                <a
                  href={`mailto:${msg.email}?subject=Re: Your project inquiry`}
                  className="flex items-center gap-2 px-4 py-2 bg-teal-700 hover:bg-teal-600 text-white text-xs font-medium rounded-xl transition"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Reply via Email
                </a>
                <button
                  onClick={() => handleArchive(msg.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white text-xs font-medium rounded-xl transition"
                >
                  <Archive className="w-3.5 h-3.5" />
                  Archive
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
