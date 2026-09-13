"use client";

import { useEffect, useState } from "react";

type User = { id: string; name: string; email: string };
type Booking = { id:string; serviceName:string; status:string; preferredDate:string|null; preferredTime:string|null; quotedPrice:number|null; createdAt:string };

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const auth = await fetch("/api/auth/me", { cache: "no-store" });
        if (!auth.ok) return window.location.assign("/login");
        const data = await auth.json();
        if (data.user.role === "owner") return window.location.assign("/owner/dashboard");
        if (data.staffAccess) return window.location.assign("/admin/dashboard");
        setUser(data.user);
        const [bookingResponse, quoteResponse, vehicleResponse] = await Promise.all([
          fetch("/api/bookings", { cache: "no-store" }),
          fetch("/api/quotes", { cache: "no-store" }),
          fetch("/api/vehicles", { cache: "no-store" }),
        ]);
        if (bookingResponse.ok) setBookings(await bookingResponse.json());
        if (quoteResponse.ok) setQuotes(await quoteResponse.json());
        if (vehicleResponse.ok) setVehicles(await vehicleResponse.json());
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <main className="min-h-screen bg-white p-12 text-[#0B0F19]">Loading your dashboard…</main>;
  if (!user) return null;

  const upcoming = bookings.filter((booking) => !["completed", "cancelled"].includes(booking.status));
  const history = bookings.filter((booking) => ["completed", "cancelled"].includes(booking.status));

  return (
    <main className="min-h-screen bg-white px-6 py-10 text-[#0B0F19]">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[.28em] text-[#000B3D]">Customer account</p>
        <h1 className="mt-2 text-4xl font-black tracking-[-.04em] text-[#000B3D]">Welcome back, {user.name}</h1>
        <p className="mt-2 text-black/45">Saved vehicles, quotes, and detailing appointments in one place.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            ["Saved vehicles", vehicles.length, "/vehicles"],
            ["Quote chats", quotes.length, "/quote"],
            ["Upcoming", upcoming.length, "/contact"],
          ].map(([label, value, href]) => (
            <a key={String(label)} href={String(href)} className="rounded-[26px] border border-[#000B3D]/10 bg-[#F7F9FD] p-6 transition hover:border-[#000B3D]/30">
              <p className="text-sm text-black/45">{label}</p>
              <p className="mt-3 text-4xl font-black text-[#000B3D]">{value}</p>
            </a>
          ))}
        </div>

        <section className="mt-8 rounded-[28px] border border-[#000B3D]/10 bg-[#F7F9FD] p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div><h2 className="text-2xl font-black text-[#000B3D]">Upcoming appointments</h2><p className="mt-1 text-sm text-black/45">Current booking requests and confirmed details.</p></div>
            <a href="/contact" className="rounded-2xl bg-[#000B3D] px-4 py-2.5 text-sm font-bold text-white">Book a Detail</a>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {upcoming.map((booking) => (
              <div key={booking.id} className="rounded-2xl border border-[#000B3D]/10 bg-white p-4">
                <div className="flex justify-between gap-3"><span className="font-bold">{booking.serviceName}</span><span className="text-xs uppercase text-[#000B3D]">{booking.status}</span></div>
                <p className="mt-1 text-sm text-black/45">{booking.preferredDate || "Date pending"}{booking.preferredTime ? ` · ${booking.preferredTime}` : ""}</p>
                {booking.quotedPrice != null && <p className="mt-2 text-sm font-bold text-[#000B3D]">${booking.quotedPrice.toFixed(2)} total</p>}
                <a href={`/booking-chat/${booking.id}`} className="mt-3 inline-block text-xs font-bold text-[#000B3D]">Open booking chat →</a>
              </div>
            ))}
            {!upcoming.length && <p className="text-sm text-black/35">No upcoming appointments.</p>}
          </div>
        </section>

        <section className="mt-6 rounded-[28px] border border-[#000B3D]/10 bg-white p-6">
          <h2 className="text-2xl font-black text-[#000B3D]">Appointment history</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {history.map((booking) => (
              <div key={booking.id} className="rounded-2xl border border-[#000B3D]/10 bg-[#F7F9FD] p-4">
                <p className="font-bold">{booking.serviceName}</p>
                <p className="mt-1 text-sm text-black/45">{booking.status} · {booking.preferredDate || new Date(booking.createdAt).toLocaleDateString()}</p>
                <a href={`/booking-chat/${booking.id}`} className="mt-3 inline-block text-xs font-bold text-[#000B3D]">View details →</a>
              </div>
            ))}
            {!history.length && <p className="text-sm text-black/35">Past appointments will appear here.</p>}
          </div>
        </section>
      </div>
    </main>
  );
}
