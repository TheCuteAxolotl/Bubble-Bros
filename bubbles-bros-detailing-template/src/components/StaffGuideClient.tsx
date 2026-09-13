"use client";

import { useMemo, useState } from "react";
import { PHONE_FEATURE_ENABLED, SMS_FEATURE_ENABLED } from "@/lib/constants";

export type StaffGuideSection = {
  id: string;
  title: string;
  eyebrow: string;
  summary: string;
  points: string[];
  scripts?: { label: string; text: string }[];
};

export default function StaffGuideClient({ sections, isOwner, permissions }: { sections: StaffGuideSection[]; isOwner: boolean; permissions: string[] }) {
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState("");

  const quickLinks = [
    { permission: "support", label: "Support Inbox", href: isOwner ? "/owner/support" : "/admin/support" },
    { permission: "quoteChats", label: "Quote Chat", href: isOwner ? "/owner/quotes" : "/admin/quotes" },
    { permission: "bookings", label: "Bookings", href: isOwner ? "/owner/bookings" : "/admin/bookings" },
    { permission: "smsInbox", label: "SMS Inbox", href: isOwner ? "/owner/messages" : "/admin/messages" },
    { permission: "businessPhone", label: "Business Phone", href: "/owner/calls" },
  ].filter((item) => {
    if (item.permission === "smsInbox" && !SMS_FEATURE_ENABLED) return false;
    if (item.permission === "businessPhone" && !PHONE_FEATURE_ENABLED) return false;
    return isOwner || permissions.includes(item.permission);
  });

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return sections;
    return sections.filter((section) =>
      [section.title, section.eyebrow, section.summary, ...section.points, ...(section.scripts || []).flatMap((script) => [script.label, script.text])]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    );
  }, [query, sections]);

  return (
    <main className="min-h-screen bg-white text-[#0B0F19]">
      <header className="border-b border-[#000B3D]/10 bg-[radial-gradient(circle_at_20%_-20%,rgba(0,11,61,.10),transparent_38%),#F8FAFD]">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.3em] text-[#000B3D]">Internal · Bubbles & Bros.</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-.045em] sm:text-5xl">Staff Guide</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-black/50">Rules, communication standards, customer-service scripts, and the operating playbook for representing Bubbles & Bros. professionally.</p>
            </div>
            <a href={isOwner ? "/owner/dashboard" : "/admin/dashboard"} className="rounded-full border border-[#000B3D]/15 px-5 py-2.5 text-sm font-semibold text-black/70 hover:border-[#000B3D]/30 hover:text-[#0B0F19]">Back to dashboard</a>
          </div>
          <div className="mt-7 max-w-xl">
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search rules, bookings, quotes, support…" className="w-full rounded-2xl border border-[#000B3D]/10 bg-[#F4F7FB] px-4 py-3.5 text-sm outline-none transition focus:border-[#000B3D]/60" />
          </div>
          {quickLinks.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {quickLinks.map((item) => (
                <a key={item.label} href={item.href} className="rounded-full border border-[#000B3D]/10 bg-[#F4F7FB] px-4 py-2 text-xs font-semibold text-black/60 transition hover:border-[#000B3D]/35 hover:text-[#0B0F19]">
                  {item.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:px-8 lg:grid-cols-[250px_1fr] lg:px-12">
        <aside className="h-fit rounded-[24px] border border-[#000B3D]/10 bg-[#F7F9FC] p-4 lg:sticky lg:top-6">
          <p className="px-2 text-[10px] font-bold uppercase tracking-[.25em] text-black/35">Sections</p>
          <div className="mt-3 space-y-1">
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className="block rounded-xl px-3 py-2 text-sm text-black/60 transition hover:bg-[#F2F5F9] hover:text-[#0B0F19]">{section.title}</a>
            ))}
          </div>
          <div className="mt-5 rounded-2xl border border-[#000B3D]/20 bg-[#000B3D]/[.06] p-4 text-xs leading-5 text-black/60">
            When in doubt, do not improvise a policy. Tell the customer you are verifying it and escalate to the owner.
          </div>
        </aside>

        <div className="space-y-6">
          {filtered.map((section) => (
            <section id={section.id} key={section.id} className="scroll-mt-6 rounded-[28px] border border-[#000B3D]/10 bg-[#F7F9FC] p-6 sm:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[.26em] text-[#000B3D]">{section.eyebrow}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-.035em]">{section.title}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-black/50">{section.summary}</p>

              <div className="mt-6 grid gap-3">
                {section.points.map((point, index) => (
                  <div key={point} className="flex gap-4 rounded-2xl border border-[#000B3D]/10 bg-[#F7F9FC] p-4">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[#000B3D]/10 text-[11px] font-bold text-black/45">{index + 1}</span>
                    <p className="text-sm leading-6 text-black/70">{point}</p>
                  </div>
                ))}
              </div>

              {section.scripts?.length ? (
                <div className="mt-7 border-t border-[#000B3D]/10 pt-6">
                  <p className="text-xs font-semibold uppercase tracking-[.2em] text-black/35">Suggested language</p>
                  <div className="mt-4 grid gap-3 xl:grid-cols-2">
                    {section.scripts.map((script) => {
                      const copyKey = `${section.id}:${script.label}`;
                      return (
                        <div key={script.label} className="rounded-2xl border border-[#000B3D]/15 bg-[#000B3D]/[.045] p-5">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-xs font-bold uppercase tracking-[.16em] text-[#000B3D]">{script.label}</p>
                            <button
                              type="button"
                              onClick={async () => {
                                try {
                                  await navigator.clipboard.writeText(script.text);
                                  setCopied(copyKey);
                                  window.setTimeout(() => setCopied((current) => (current === copyKey ? "" : current)), 1400);
                                } catch {
                                  setCopied("");
                                }
                              }}
                              className="rounded-full border border-[#000B3D]/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.12em] text-black/50 transition hover:border-[#000B3D]/25 hover:text-[#0B0F19]"
                            >
                              {copied === copyKey ? "Copied" : "Copy script"}
                            </button>
                          </div>
                          <p className="mt-3 text-sm leading-6 text-black/75">“{script.text}”</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </section>
          ))}

          {!filtered.length && (
            <div className="rounded-[28px] border border-dashed border-[#000B3D]/10 p-10 text-center text-sm text-black/40">No guide section matched that search.</div>
          )}
        </div>
      </div>
    </main>
  );
}
