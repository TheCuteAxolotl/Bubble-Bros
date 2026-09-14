import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ClipboardCheck,
  Mail,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const instant = false;

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, first_name, last_name, role_id, is_system_admin")
    .eq("id", user.id)
    .single();

  let roleName = "Member";
  if (profile?.role_id) {
    const { data: role } = await supabase
      .from("roles")
      .select("name")
      .eq("id", profile.role_id)
      .single();
    if (role?.name) roleName = role.name;
  }

  const displayName =
    [profile?.first_name, profile?.last_name].filter(Boolean).join(" ") ||
    profile?.email?.split("@")[0] ||
    user.email?.split("@")[0] ||
    "AFC Member";

  const quickLinks = [
    { title: "Meetings", description: "See upcoming meetings and agendas.", href: "/dashboard/meetings", icon: CalendarDays },
    { title: "Attendance", description: "View your meeting participation.", href: "/dashboard/attendance", icon: ClipboardCheck },
    { title: "Events", description: "Find events, sign-ups, and opportunities.", href: "/dashboard/events", icon: Sparkles },
    { title: "Activities", description: "Know what is planned for each meeting.", href: "/dashboard/activities", icon: Users },
  ];

  return (
    <main className="px-4 py-6 sm:px-6 sm:py-8 xl:px-10">
      <div className="mx-auto max-w-7xl">
        <section className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-7 text-white shadow-xl shadow-slate-900/10 sm:p-9 lg:p-10">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#153E8C] opacity-70 blur-3xl" />
          <div className="absolute right-20 top-20 h-48 w-48 rounded-full bg-[#CE2B37] opacity-30 blur-3xl" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#F4C542]">AFC member dashboard</p>
              <h1 className="mt-3 text-3xl font-black tracking-[-0.035em] sm:text-4xl lg:text-5xl">Welcome, {displayName}.</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">Your meetings, activities, events, and AFC resources will live here as the portal grows.</p>
            </div>
            <div className="grid min-w-[260px] grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">Club role</p>
                <p className="mt-2 text-lg font-bold">{roleName}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">Access</p>
                <p className="mt-2 text-lg font-bold">{profile?.is_system_admin ? "System Admin" : "Member"}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_.65fr]">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#153E8C]">Next meeting</p>
                <h2 className="mt-2 text-2xl font-black tracking-tight">Nothing published yet</h2>
              </div>
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#153E8C]/10 text-[#153E8C]"><CalendarDays className="h-5 w-5" /></div>
            </div>
            <p className="mt-4 max-w-2xl leading-7 text-slate-600">When an officer creates the next AFC meeting, you’ll see the date, room, agenda, activities, and sign-ups here.</p>
            <Link href="/dashboard/meetings" className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#153E8C]">Open meetings <ArrowRight className="h-4 w-4" /></Link>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Your account</p>
            <p className="mt-3 break-all text-lg font-bold text-slate-900">{profile?.email || user.email}</p>
            <div className="mt-5 flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 text-emerald-800">
              <ShieldCheck className="h-5 w-5 shrink-0" />
              <p className="text-sm font-semibold">Signed in and connected to AFC Portal.</p>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Member tools</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight">Everything in one place</h2>
            </div>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {quickLinks.map(({ title, description, href, icon: Icon }) => (
              <Link key={href} href={href} className="group rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#f3f5fa] text-[#153E8C]"><Icon className="h-[18px] w-[18px]" /></div>
                <h3 className="mt-5 font-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-black text-slate-700 transition group-hover:text-[#153E8C]">Open <ArrowRight className="h-3.5 w-3.5" /></span>
              </Link>
            ))}
          </div>
        </section>

        {profile?.is_system_admin && (
          <section className="mt-8 grid gap-5 rounded-[1.75rem] border border-[#153E8C]/15 bg-[#153E8C]/[0.045] p-6 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-7">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#153E8C] text-white"><ShieldCheck className="h-5 w-5" /></div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#153E8C]">Technical administration</p>
              <h2 className="mt-1 text-xl font-black">System Admin access is active</h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">Your AFC club role is still {roleName}. System Admin only gives you the technical access needed to build and maintain the portal.</p>
            </div>
            <Link href="/dashboard/admin" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#153E8C] px-4 py-3 text-sm font-bold text-white">Admin <ArrowRight className="h-4 w-4" /></Link>
          </section>
        )}

        {profile?.is_system_admin && (
          <section className="mt-6 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
            <div className="flex items-center gap-3"><Mail className="h-5 w-5 text-[#CE2B37]" /><h2 className="text-lg font-black">What we build next</h2></div>
            <p className="mt-3 max-w-3xl leading-7 text-slate-600">Meetings should be the first live module. Once meetings exist, attendance and activities can attach directly to each meeting, then events, members, email, documents, and treasury can build on top of the same system.</p>
          </section>
        )}
      </div>
    </main>
  );
}
