"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Mail, FileText, BookMarked, LayoutGrid, RefreshCw, LogOut } from "lucide-react";
import AdminGuard from "@/components/admin/AdminGuard";
import { useAuth } from "@/context/AuthContext";
import { fetchContacts, deleteContact, updateContactStatus } from "@/lib/api";
import type { Contact, Pagination } from "@/types";

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

const STATS_CFG = [
  { key: "total",   label: "Total Messages", Icon: Mail,       color: "#1B3A6B", bg: "bg-[#EBF3FF]" },
  { key: "onPage",  label: "On This Page",   Icon: FileText,   color: "#5BB8E8", bg: "bg-[#EBF5FB]" },
  { key: "page",    label: "Current Page",   Icon: BookMarked, color: "#D4A017", bg: "bg-[#FEF9EC]" },
  { key: "pages",   label: "Total Pages",    Icon: LayoutGrid, color: "#2D9348", bg: "bg-[#ECFDF5]" },
] as const;

function Dashboard() {
  const { user, logout } = useAuth();
  const [contacts,   setContacts]   = useState<Contact[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [page,       setPage]       = useState(1);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState("");
  const [expanded,   setExpanded]   = useState<string | null>(null);

  const load = useCallback(async (p: number) => {
    setLoading(true); setError("");
    try {
      const data = await fetchContacts(p);
      setContacts(data.contacts as Contact[]);
      setPagination(data.pagination);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load.");
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(page); }, [load, page]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    try {
      await deleteContact(id);
      load(page);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to delete message.");
    }
  };

  const handleStatusChange = async (id: string, status: "unread" | "read" | "archived") => {
    try {
      await updateContactStatus(id, status);
      setContacts(prev => prev.map(c => c._id === id ? { ...c, status } : c));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update status.");
    }
  };

  const statsVals = {
    total:  pagination?.total,
    onPage: contacts.length,
    page:   pagination?.page,
    pages:  pagination?.pages,
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>

      {/* Top bar */}
      <header className="sticky top-0 z-20 bg-white border-b border-[#D6EAF8] h-16 flex items-center px-5 sm:px-8 gap-4"
        style={{ boxShadow: "0 1px 8px rgba(30,64,175,0.07)" }}>
        <div className="flex items-center gap-3">
          <Image src="/images/logo.png" alt="Leo Club" width={32} height={32} className="rounded-xl" />
          <div className="hidden sm:block">
            <div className="font-display font-bold text-[#1B3A6B] text-sm leading-none">LCP Admin</div>
            <div className="text-[10px] text-[#64748B] mt-0.5">Dashboard</div>
          </div>
        </div>
        <div className="flex-1" />
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#F0F6FF] rounded-full">
          <div className="w-6 h-6 rounded-full bg-[#1B3A6B] text-white flex items-center justify-center text-[10px] font-bold">
            {user?.name?.[0]?.toUpperCase() ?? "A"}
          </div>
          <span className="text-xs text-[#1B3A6B] font-semibold truncate max-w-[160px]">{user?.email}</span>
        </div>
        <button
          onClick={async () => { await logout(); window.location.href = "/admin/login"; }}
          className="btn btn-crimson btn-sm"
        >
          <LogOut size={14} strokeWidth={2} />
          Sign Out
        </button>
      </header>

      <div className="max-w-7xl mx-auto p-5 sm:p-8">

        {/* Welcome */}
        <div className="mb-8">
          <h1 className="font-display text-2xl font-black text-[#1E293B]">Dashboard</h1>
          <p className="text-[#64748B] text-sm mt-1">
            Welcome back, <span className="text-[#1B3A6B] font-bold">{user?.name ?? "Admin"}</span>
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {STATS_CFG.map(({ key, label, Icon, color, bg }) => (
            <div key={key} className={`${bg} rounded-2xl p-5 flex items-center gap-3 border border-[#D6EAF8]`}>
              <div className="w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center flex-shrink-0">
                <Icon size={18} style={{ color }} strokeWidth={2} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">{label}</p>
                <p className="font-display text-2xl font-black mt-0.5" style={{ color }}>
                  {statsVals[key as keyof typeof statsVals] ?? "—"}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Table card */}
        <div className="bg-white rounded-2xl border border-[#D6EAF8] overflow-hidden"
          style={{ boxShadow: "0 2px 16px rgba(30,64,175,0.08)" }}>

          <div className="px-6 py-4 border-b border-[#D6EAF8] flex items-center justify-between">
            <div>
              <h2 className="font-display font-bold text-[#1E293B] text-base">Contact Submissions</h2>
              <p className="text-[#64748B] text-xs mt-0.5">{pagination?.total ?? 0} total messages</p>
            </div>
            <button onClick={() => load(page)} className="btn btn-ghost btn-sm gap-1.5 text-xs">
              <RefreshCw size={13} strokeWidth={2.5} />
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-[#64748B]">
              <div className="w-6 h-6 rounded-full border-3 border-[#D6EAF8] border-t-[#1B3A6B] animate-spin" />
              <span className="text-sm">Loading…</span>
            </div>
          ) : error ? (
            <div className="p-6 flex items-center justify-between">
              <p className="text-red-500 text-sm">{error}</p>
              <button onClick={() => load(page)} className="btn btn-crimson btn-sm">Retry</button>
            </div>
          ) : contacts.length === 0 ? (
            <div className="py-20 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#EBF3FF] flex items-center justify-center mx-auto mb-4">
                <Mail size={28} className="text-[#1B3A6B]" strokeWidth={1.5} />
              </div>
              <p className="text-[#64748B] text-sm">No contact submissions yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F8FAFC]">
                  <tr className="border-b border-[#D6EAF8]">
                    {["Sender", "Subject", "Date", "Actions"].map(h => (
                      <th key={h} className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-[#64748B]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {contacts.map(c => (
                    <React.Fragment key={c._id}>
                      <tr className="border-b border-[#D6EAF8] hover:bg-[#F8FAFC] transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-[#EBF3FF] text-[#1B3A6B] flex items-center justify-center font-bold text-xs flex-shrink-0">
                              {c.name?.[0]?.toUpperCase() ?? "?"}
                            </div>
                            <div className="min-w-0">
                              <p className="text-[#1E293B] text-sm font-semibold truncate">{c.name}</p>
                              <p className="text-[#64748B] text-xs truncate">{c.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 hidden sm:table-cell">
                          <div className="flex flex-col gap-1.5">
                            <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-[#EBF3FF] text-[#1B3A6B] max-w-[160px] truncate">
                              {c.subject}
                            </span>
                            {/* Status badge */}
                            <span className={`inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full w-fit ${
                              c.status === "unread"   ? "bg-[#FEF9EC] text-[#D4A017]" :
                              c.status === "archived" ? "bg-[#F1F5F9] text-[#64748B]" :
                                                        "bg-[#ECFDF5] text-[#2D9348]"
                            }`}>
                              {c.status ?? "unread"}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-4 hidden lg:table-cell text-[#64748B] text-xs whitespace-nowrap">{fmt(c.createdAt)}</td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2 flex-wrap">
                            <button onClick={() => setExpanded(v => v === c._id ? null : c._id)}
                              className="text-xs font-semibold text-[#1B3A6B] hover:underline">
                              {expanded === c._id ? "Hide" : "View"}
                            </button>
                            {(c.status === "unread") && (
                              <button
                                onClick={() => handleStatusChange(c._id, "read")}
                                className="text-xs font-semibold text-green-600 hover:underline"
                              >
                                Mark read
                              </button>
                            )}
                            {(c.status === "read") && (
                              <button
                                onClick={() => handleStatusChange(c._id, "archived")}
                                className="text-xs font-semibold text-[#64748B] hover:underline"
                              >
                                Archive
                              </button>
                            )}
                            <button onClick={() => handleDelete(c._id)}
                              className="text-xs font-semibold text-red-400 hover:text-red-600">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                      {expanded === c._id && (
                        <tr className="border-b border-[#D6EAF8] bg-[#F8FAFC]">
                          <td colSpan={4} className="px-5 pb-4 pt-1">
                            <div className="bg-white rounded-xl border border-[#D6EAF8] p-4 text-sm text-[#64748B] leading-relaxed whitespace-pre-wrap ml-12"
                              style={{ boxShadow: "0 1px 6px rgba(30,64,175,0.05)" }}>
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

          {pagination && pagination.pages > 1 && (
            <div className="px-6 py-4 border-t border-[#D6EAF8] flex items-center justify-between">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1}
                className="btn btn-ghost btn-sm disabled:opacity-40">
                ← Previous
              </button>
              <span className="text-xs text-[#64748B]">Page {pagination.page} of {pagination.pages}</span>
              <button onClick={() => setPage(p => Math.min(pagination.pages, p + 1))} disabled={page >= pagination.pages}
                className="btn btn-ghost btn-sm disabled:opacity-40">
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
  return <AdminGuard><Dashboard /></AdminGuard>;
}
