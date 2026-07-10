"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image       from "next/image";
import AdminGuard  from "@/components/admin/AdminGuard";
import { useAuth } from "@/context/AuthContext";
import { fetchContacts, deleteContact } from "@/lib/api";

/* ── Types ── */
interface Contact {
  _id:       string;
  name:      string;
  email:     string;
  subject:   string;
  message:   string;
  createdAt: string;
}
interface Pagination { total: number; page: number; limit: number; pages: number; }

/* ── Helpers ── */
const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

/* ── Sub-components ── */
const Stat = ({ label, value, icon }: { label: string; value: number | undefined; icon: string }) => (
  <div className="bg-[#05101f] rounded-2xl border border-white/5 p-5 flex items-center gap-4">
    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl" style={{ background: "rgba(201,168,76,0.12)" }}>{icon}</div>
    <div>
      <p className="text-white/35 text-[10px] font-bold uppercase tracking-[0.15em]">{label}</p>
      <p className="font-display text-2xl font-black text-[#c9a84c] mt-0.5">{value ?? "—"}</p>
    </div>
  </div>
);

/* ── Main dashboard ── */
function Dashboard() {
  const { user, logout } = useAuth();
  const [contacts,   setContacts]   = useState<Contact[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [page,       setPage]       = useState(1);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState("");
  const [expanded,   setExpanded]   = useState<string | null>(null);

  const load = useCallback(async (p: number) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchContacts(p);
      setContacts(data.contacts as Contact[]);
      setPagination(data.pagination);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load contacts.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(page); }, [load, page]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    await deleteContact(id);
    load(page);
  };

  return (
    <div className="min-h-screen bg-[#0a1628]">
      {/* Top bar */}
      <header className="sticky top-0 z-20 bg-[#0a1628]/95 backdrop-blur-xl border-b border-white/5 h-16 flex items-center px-5 sm:px-8 gap-4">
        <div className="flex items-center gap-3">
          <Image src="/images/logo.png" alt="Leo Club" width={28} height={28} className="brightness-0 invert opacity-70" />
          <span className="font-display font-bold text-white text-sm hidden sm:block">LCP Admin</span>
        </div>
        <div className="flex-1" />
        <span className="hidden sm:block text-xs text-white/30 truncate max-w-[200px]">{user?.email}</span>
        <button
          onClick={async () => { await logout(); window.location.href = "/admin/login"; }}
          className="text-xs font-semibold text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg hover:bg-red-900/20 transition-colors"
        >
          Sign Out
        </button>
      </header>

      <div className="p-5 sm:p-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="font-display text-2xl font-black text-white">Dashboard</h1>
          <p className="text-white/30 text-sm mt-1">
            Welcome back, <span className="text-[#c9a84c] font-semibold">{user?.name ?? "Admin"}</span>
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <Stat label="Total Messages" value={pagination?.total}  icon="✉️"  />
          <Stat label="This Page"      value={contacts.length}    icon="📄"  />
          <Stat label="Current Page"   value={pagination?.page}   icon="📍"  />
          <Stat label="Total Pages"    value={pagination?.pages}  icon="📚"  />
        </div>

        {/* Table */}
        <div className="bg-[#05101f] rounded-2xl border border-white/5 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
            <div>
              <h2 className="font-display font-bold text-white text-sm">Contact Submissions</h2>
              <p className="text-white/25 text-xs mt-0.5">{pagination?.total ?? 0} total messages</p>
            </div>
            <button onClick={() => load(page)}
              className="flex items-center gap-1.5 text-xs font-semibold text-white/35 hover:text-[#c9a84c] transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20 gap-2 text-white/30">
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <span className="text-sm">Loading…</span>
            </div>
          ) : error ? (
            <div className="p-6 flex items-center justify-between">
              <p className="text-red-400 text-sm">{error}</p>
              <button onClick={() => load(page)} className="text-xs text-red-400 underline">Retry</button>
            </div>
          ) : contacts.length === 0 ? (
            <div className="py-20 text-center text-white/25 text-sm">No contact submissions yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    {["Sender", "Subject", "Date", "Actions"].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-[0.15em] text-white/25">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((c) => (
                    <React.Fragment key={c._id}>
                      <tr className="border-b border-white/5 hover:bg-white/2 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#c9a84c]/15 text-[#c9a84c] flex items-center justify-center font-bold text-xs flex-shrink-0">
                              {c.name?.[0]?.toUpperCase() ?? "?"}
                            </div>
                            <div className="min-w-0">
                              <p className="text-white text-sm font-semibold truncate">{c.name}</p>
                              <p className="text-white/35 text-xs truncate">{c.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 hidden sm:table-cell">
                          <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#c9a84c]/10 text-[#c9a84c] max-w-[160px] truncate">
                            {c.subject}
                          </span>
                        </td>
                        <td className="px-5 py-4 hidden lg:table-cell text-white/35 text-xs whitespace-nowrap">{fmt(c.createdAt)}</td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <button onClick={() => setExpanded((v) => v === c._id ? null : c._id)}
                              className="text-xs font-semibold text-white/40 hover:text-[#c9a84c] transition-colors">
                              {expanded === c._id ? "Hide" : "View"}
                            </button>
                            <button onClick={() => handleDelete(c._id)}
                              className="text-xs font-semibold text-red-400/60 hover:text-red-400 transition-colors">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                      {expanded === c._id && (
                        <tr className="border-b border-white/5 bg-white/2">
                          <td colSpan={4} className="px-5 pb-4 pt-0">
                            <div className="bg-white/4 rounded-xl border border-white/8 p-4 text-sm text-white/55 leading-relaxed whitespace-pre-wrap ml-11">
                              {c.message}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {pagination && pagination.pages > 1 && (
            <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}
                className="text-xs font-semibold text-white/35 hover:text-[#c9a84c] disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                ← Previous
              </button>
              <span className="text-xs text-white/25">Page {pagination.page} of {pagination.pages}</span>
              <button onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))} disabled={page >= pagination.pages}
                className="text-xs font-semibold text-white/35 hover:text-[#c9a84c] disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                Next →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <AdminGuard>
      <Dashboard />
    </AdminGuard>
  );
}
