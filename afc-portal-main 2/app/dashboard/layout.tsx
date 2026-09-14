import Link from "next/link";
import {
  CalendarDays,
  ClipboardCheck,
  FileText,
  Gauge,
  LayoutDashboard,
  Mail,
  Settings,
  Sparkles,
  Users,
  WalletCards,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AfcLogo } from "@/components/afc-logo";

export const instant = false;

type PermissionRow = {
  permission_key: string;
};

const navigation = [
  { label: "Dashboard", href: "/dashboard", permission: "dashboard.view", icon: LayoutDashboard },
  { label: "Meetings", href: "/dashboard/meetings", permission: "meetings.view", icon: CalendarDays },
  { label: "Attendance", href: "/dashboard/attendance", permission: "attendance.view", icon: ClipboardCheck },
  { label: "Events", href: "/dashboard/events", permission: "events.view", icon: Sparkles },
  { label: "Activities", href: "/dashboard/activities", permission: "activities.view", icon: Gauge },
  { label: "Members", href: "/dashboard/members", permission: "members.view", icon: Users },
  { label: "Email", href: "/dashboard/email", permission: "email.send", icon: Mail },
  { label: "Treasury", href: "/dashboard/treasury", permission: "treasury.view", icon: WalletCards },
  { label: "Documents", href: "/dashboard/documents", permission: "documents.view", icon: FileText },
  { label: "Admin", href: "/dashboard/admin", permission: "admin.access", icon: Settings },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: permissionRows } = await supabase.rpc("get_my_permissions");
  const permissions = new Set(
    ((permissionRows ?? []) as PermissionRow[]).map((item) => item.permission_key)
  );
  const visibleNavigation = navigation.filter((item) => permissions.has(item.permission));

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <div className="flex min-h-screen">
        <aside className="sticky top-0 hidden h-screen w-[280px] shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
          <div className="border-b border-slate-200 p-6">
            <AfcLogo />
            <div className="mt-5 rounded-2xl bg-[#f4f6fb] p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#153E8C]">Member portal</p>
              <p className="mt-2 truncate text-sm font-semibold text-slate-700">{user.email}</p>
            </div>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto p-4">
            {visibleNavigation.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-[#153E8C]/[0.07] hover:text-[#153E8C]"
              >
                <Icon className="h-[18px] w-[18px] text-slate-400 transition group-hover:text-[#153E8C]" />
                {label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-slate-200 p-4">
            <Link href="/" className="flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
              View public site
            </Link>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-xl lg:hidden">
            <div className="flex h-16 items-center justify-between px-4">
              <AfcLogo compact />
              <div>
                <p className="text-sm font-extrabold">AFC Portal</p>
                <p className="max-w-[210px] truncate text-[11px] text-slate-500">{user.email}</p>
              </div>
            </div>
            <nav className="flex gap-1 overflow-x-auto border-t border-slate-100 px-3 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {visibleNavigation.map(({ label, href, icon: Icon }) => (
                <Link key={href} href={href} className="flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100">
                  <Icon className="h-3.5 w-3.5" /> {label}
                </Link>
              ))}
            </nav>
          </header>
          {children}
        </div>
      </div>
    </div>
  );
}
