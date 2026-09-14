import Link from "next/link";

export function AfcLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-3" aria-label="AFC home">
      <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl border border-white/15 bg-white shadow-sm">
        <span className="absolute inset-y-0 left-0 w-1/2 bg-[#153E8C]" />
        <span className="absolute inset-y-0 right-0 w-1/2 bg-[#CE2B37]" />
        <span className="absolute left-0 top-0 h-full w-full [clip-path:polygon(0_0,0_100%,62%_50%)] bg-white" />
        <span className="relative -ml-3 text-[14px] leading-none text-[#F4C542]">✦</span>
      </span>
      {!compact && (
        <span className="leading-tight">
          <span className="block text-sm font-extrabold tracking-tight text-slate-950 dark:text-white">
            Asian Filipino Club
          </span>
          <span className="block text-[11px] font-medium tracking-[0.18em] text-slate-500 dark:text-slate-400">
            ELGIN COMMUNITY COLLEGE
          </span>
        </span>
      )}
    </Link>
  );
}
