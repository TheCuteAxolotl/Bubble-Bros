import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  HeartHandshake,
  Mail,
  MapPin,
  PartyPopper,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { AfcLogo } from "@/components/afc-logo";

const highlights = [
  {
    icon: Users,
    title: "Find your people",
    description:
      "Meet students who want to celebrate Filipino and Asian culture, make friends, and build community on campus.",
  },
  {
    icon: PartyPopper,
    title: "Do more together",
    description:
      "Club meetings can include games, food, cultural activities, planning sessions, collaborations, and campus events.",
  },
  {
    icon: HeartHandshake,
    title: "Everyone is welcome",
    description:
      "You do not have to be Filipino to join. AFC is a place for anyone interested in the community and culture.",
  },
];

const portalFeatures = [
  { icon: ClipboardCheck, title: "Attendance", description: "Check in to meetings and keep your participation history in one place." },
  { icon: CalendarDays, title: "Meetings & events", description: "See what is coming up, where to go, and what the club has planned." },
  { icon: Sparkles, title: "Activities", description: "Know the agenda before each meeting and what you can join or help with." },
  { icon: Mail, title: "Club updates", description: "Officers can reach the right members without scattered lists and separate tools." },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fbfaf7] text-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-[#fbfaf7]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <AfcLogo />
          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
            <a href="#about" className="transition hover:text-slate-950">About</a>
            <a href="#meetings" className="transition hover:text-slate-950">Meetings</a>
            <a href="#portal" className="transition hover:text-slate-950">Member portal</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/auth/login"
              className="hidden rounded-full px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-white sm:inline-flex"
            >
              Sign in
            </Link>
            <Link
              href="/auth/sign-up"
              className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Join AFC <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <section className="relative">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-32 top-16 h-80 w-80 rounded-full bg-[#153E8C]/10 blur-3xl" />
          <div className="absolute -right-20 top-4 h-96 w-96 rounded-full bg-[#CE2B37]/10 blur-3xl" />
          <div className="absolute left-1/2 top-80 h-64 w-64 -translate-x-1/2 rounded-full bg-[#F4C542]/15 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-7xl gap-14 px-5 pb-24 pt-20 sm:px-8 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:pb-28 lg:pt-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-600 shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-[#F4A900]" />
              Community • Culture • Connection
            </div>
            <h1 className="max-w-4xl text-5xl font-black tracking-[-0.045em] text-slate-950 sm:text-6xl lg:text-7xl">
              A place at ECC to
              <span className="block bg-gradient-to-r from-[#153E8C] via-[#6B4A8F] to-[#CE2B37] bg-clip-text text-transparent">
                connect and belong.
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              Asian Filipino Club brings students together through culture, friendship, activities, and campus events — with one portal to keep the whole club organized.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/auth/sign-up"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#153E8C] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/15 transition hover:-translate-y-0.5 hover:bg-[#123575]"
              >
                Become a member <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#about"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300"
              >
                Explore AFC
              </a>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Open to ECC students</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> No cultural background required</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -left-6 top-12 h-24 w-24 rounded-[2rem] bg-[#F4C542] opacity-70 blur-[1px]" />
            <div className="absolute -right-7 bottom-12 h-28 w-28 rounded-full bg-[#CE2B37] opacity-80" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-slate-950 p-4 shadow-2xl shadow-slate-900/20">
              <div className="rounded-[1.55rem] bg-gradient-to-br from-[#173c83] via-[#293465] to-[#711f36] p-6 text-white sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white/80">Next AFC meeting</span>
                  <span className="text-xl text-[#F4C542]">✦</span>
                </div>
                <div className="mt-16">
                  <p className="text-sm font-medium text-white/65">Member meeting</p>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Come hang out, meet people, and see what we’re planning next.</h2>
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                      <Clock3 className="mb-3 h-5 w-5 text-[#F4C542]" />
                      <p className="text-xs uppercase tracking-wider text-white/55">Schedule</p>
                      <p className="mt-1 font-semibold">Meeting details in portal</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                      <MapPin className="mb-3 h-5 w-5 text-[#F4C542]" />
                      <p className="text-xs uppercase tracking-wider text-white/55">Location</p>
                      <p className="mt-1 font-semibold">Elgin Community College</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 px-2 pb-2 pt-4 text-center text-white">
                <div className="rounded-xl bg-white/5 px-2 py-3"><span className="block text-lg font-black">AFC</span><span className="text-[10px] uppercase tracking-wider text-white/45">Community</span></div>
                <div className="rounded-xl bg-white/5 px-2 py-3"><span className="block text-lg font-black">ECC</span><span className="text-[10px] uppercase tracking-wider text-white/45">Campus</span></div>
                <div className="rounded-xl bg-white/5 px-2 py-3"><span className="block text-lg font-black">All</span><span className="text-[10px] uppercase tracking-wider text-white/45">Welcome</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#153E8C]">Why AFC</p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.035em] sm:text-5xl">More than a meeting on your calendar.</h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-slate-600 lg:justify-self-end">
              AFC can be the place you recognize familiar culture, learn something new, find people to sit with between classes, and help create experiences for the wider ECC community.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {highlights.map(({ icon: Icon, title, description }) => (
              <article key={title} className="rounded-[1.75rem] border border-slate-200 bg-[#fbfaf7] p-7 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-950 text-white"><Icon className="h-5 w-5" /></div>
                <h3 className="mt-6 text-xl font-bold">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="meetings" className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_.9fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#F4C542]">AFC meetings</p>
              <h2 className="mt-4 max-w-xl text-4xl font-black tracking-[-0.035em] sm:text-5xl">Know what’s happening before you walk in.</h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                Meeting plans, activities, sign-ups, and attendance can all live together instead of being scattered across messages, forms, and documents.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-5 shadow-2xl shadow-black/20">
              <div className="rounded-[1.4rem] bg-white p-6 text-slate-950">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#153E8C]">Sample meeting flow</p>
                    <h3 className="mt-2 text-2xl font-black">AFC General Meeting</h3>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">Upcoming</span>
                </div>
                <div className="mt-7 space-y-3">
                  {[
                    ["01", "Welcome + announcements", "Officer updates and what’s coming up"],
                    ["02", "Community activity", "A game, cultural activity, or group challenge"],
                    ["03", "Event planning", "Sign up to volunteer or help with the next event"],
                    ["04", "Hangout", "Stay, meet people, and catch up"],
                  ].map(([number, title, desc]) => (
                    <div key={number} className="flex gap-4 rounded-2xl bg-slate-50 p-4">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-slate-950 text-xs font-black text-white">{number}</span>
                      <div><p className="font-bold">{title}</p><p className="mt-1 text-sm text-slate-500">{desc}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="portal" className="bg-[#f3f5fa]">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#153E8C] text-white shadow-lg shadow-blue-900/20"><ShieldCheck className="h-6 w-6" /></div>
            <p className="mt-6 text-sm font-black uppercase tracking-[0.22em] text-[#153E8C]">One AFC portal</p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.035em] sm:text-5xl">Everything members need. Less chaos for officers.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">The portal is being built to keep recurring club work organized and easy to hand off to future AFC leadership.</p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {portalFeatures.map(({ icon: FeatureIcon, title, description }) => (
              <div key={title} className="flex gap-5 rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#153E8C]/10 text-[#153E8C]"><FeatureIcon className="h-5 w-5" /></div>
                <div><h3 className="text-lg font-bold">{title}</h3><p className="mt-2 leading-7 text-slate-600">{description}</p></div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-6 rounded-[2rem] bg-gradient-to-r from-[#153E8C] to-[#412C67] p-8 text-white sm:flex-row sm:p-10">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/60">Already in AFC?</p>
              <h3 className="mt-2 text-2xl font-black">Open your member dashboard.</h3>
            </div>
            <Link href="/dashboard" className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-white px-5 py-3 font-bold text-slate-950 transition hover:-translate-y-0.5">
              Go to portal <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
          <AfcLogo />
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
            <a href="#about" className="hover:text-slate-950">About</a>
            <a href="#meetings" className="hover:text-slate-950">Meetings</a>
            <Link href="/auth/login" className="hover:text-slate-950">Member sign in</Link>
          </div>
          <p className="text-xs text-slate-400">Built for AFC at Elgin Community College.</p>
        </div>
      </footer>
    </main>
  );
}
