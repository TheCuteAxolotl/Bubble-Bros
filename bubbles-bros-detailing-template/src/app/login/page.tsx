"use client";

import { FormEvent, useEffect, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [claimQuoteId, setClaimQuoteId] = useState("");


  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    setClaimQuoteId(q.get("claimQuoteId") || "");
    const prefillEmail = q.get("email");
    if (prefillEmail) setEmail(prefillEmail);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Login failed");
        return;
      }

      if (claimQuoteId && data.user.role !== "owner" && !data.staffAccess) {
        const claim = await fetch("/api/quotes/claim", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quoteId: claimQuoteId }),
        });
        if (claim.ok) return window.location.assign(`/quote?thread=${encodeURIComponent(claimQuoteId)}`);
      }

      if (data.user.role === "owner") window.location.assign("/owner/dashboard");
      else if (data.staffAccess) window.location.assign("/admin/dashboard");
      else window.location.assign("/dashboard");
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[72vh] bg-white px-6 py-16 text-[#0B0F19] sm:py-24">
      <div className="mx-auto w-full max-w-md">
        <div className="rounded-[32px] border border-[#000B3D]/10 bg-[linear-gradient(145deg,#FFFFFF,#F5F7FB)] p-7 shadow-[0_28px_90px_rgba(0,11,61,.10)] sm:p-8">
          <p className="text-[10px] font-bold uppercase tracking-[.28em] text-[#000B3D]">Customer Account</p>
          <h1 className="mt-3 text-3xl font-bold tracking-[-.04em]">Welcome Back</h1>
          <p className="mt-2 text-sm text-black/45">Sign in to view bookings, quotes, vehicles, and messages.</p>

          {error && <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-700">{error}</div>}

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-black/75">Email</label>
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-2xl border border-[#000B3D]/10 bg-white px-4 py-3 text-[#0B0F19] placeholder:text-black/30 outline-none transition focus:border-[#000B3D]/65 focus:bg-white focus:shadow-[0_0_0_3px_rgba(0,11,61,.07)]" placeholder="your@email.com" required />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-black/75">Password</label>
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-2xl border border-[#000B3D]/10 bg-white px-4 py-3 text-[#0B0F19] placeholder:text-black/30 outline-none transition focus:border-[#000B3D]/65 focus:bg-white focus:shadow-[0_0_0_3px_rgba(0,11,61,.07)]" placeholder="••••••••" required />
            </div>
            <button type="submit" disabled={loading} className="w-full rounded-2xl bg-[#000B3D] py-3.5 font-semibold text-white shadow-[0_0_30px_rgba(0,11,61,.12)] hover:bg-[#000B3D] disabled:cursor-not-allowed disabled:opacity-45">
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-black/45">
            Don&apos;t have an account? <a href={claimQuoteId ? `/register?claimQuoteId=${encodeURIComponent(claimQuoteId)}&email=${encodeURIComponent(email)}` : "/register"} className="font-semibold text-[#000B3D] hover:text-[#000B3D]">Create one</a>
          </div>
        </div>
      </div>
    </div>
  );
}

