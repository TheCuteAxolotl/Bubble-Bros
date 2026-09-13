"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { STAFF_PERMISSIONS } from "@/lib/access-control";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type Booking = {
  id: string;
  serviceName: string;
  serviceMethod: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleTrim?: string | null;
  preferredDate?: string | null;
  quotedPrice?: number | null;
  status: string;
  createdAt: string;
};

const statusDetails: Record<string, { label: string; description: string; className: string }> = {
  pending: {
    label: "Requested",
    description: "Your request was received and is waiting for confirmation.",
    className: "border-amber-400/20 bg-amber-400/10 text-amber-800",
  },
  confirmed: {
    label: "Confirmed",
    description: "Your detail has been confirmed.",
    className: "border-sky-400/20 bg-sky-400/10 text-sky-700",
  },
  completed: {
    label: "Completed",
    description: "This detail has been completed.",
    className: "border-emerald-400/20 bg-emerald-400/10 text-emerald-700",
  },
  cancelled: {
    label: "Cancelled",
    description: "This request was cancelled.",
    className: "border-red-400/20 bg-red-400/10 text-red-700",
  },
};

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [staffAccess, setStaffAccess] = useState(false);
  const [staffPermissions, setStaffPermissions] = useState<string[]>([]);
  const [customRoles, setCustomRoles] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [profileSaving, setProfileSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [deleteSaving, setDeleteSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const authResponse = await fetch("/api/auth/me", { cache: "no-store" });
        if (!authResponse.ok) {
          window.location.assign("/login");
          return;
        }

        const authData = await authResponse.json();
        const currentUser = authData.user as User;

        if (currentUser.role === "owner") {
          window.location.assign("/owner/dashboard");
          return;
        }
        const hasStaffAccess = Boolean(authData.staffAccess);
        setStaffAccess(hasStaffAccess);
        setStaffPermissions(Array.isArray(authData.permissions) ? authData.permissions : []);
        setCustomRoles(Array.isArray(authData.customRoles) ? authData.customRoles : []);

        setUser(currentUser);
        setName(currentUser.name);

        if (!hasStaffAccess) {
          const bookingResponse = await fetch("/api/bookings", { cache: "no-store" });
          if (bookingResponse.ok) {
            setBookings(await bookingResponse.json());
          }
        }
      } catch (error) {
        console.error(error);
        window.location.assign("/login");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const activeBookings = useMemo(
    () => bookings.filter((booking) => !["completed", "cancelled"].includes(booking.status.toLowerCase())),
    [bookings]
  );

  const saveProfile = async (event: FormEvent) => {
    event.preventDefault();
    setProfileSaving(true);
    setProfileMessage("");

    try {
      const response = await fetch("/api/auth/update-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await response.json();

      if (!response.ok) {
        setProfileMessage(data.error || "Unable to save account information.");
        return;
      }

      setProfileMessage("Account information updated.");
      setUser(data.user);
    } catch {
      setProfileMessage("Unable to save account information right now.");
    } finally {
      setProfileSaving(false);
    }
  };

  const changePassword = async (event: FormEvent) => {
    event.preventDefault();
    setPasswordSaving(true);
    setPasswordMessage("");

    try {
      const response = await fetch("/api/auth/change-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });
      const data = await response.json();

      if (!response.ok) {
        setPasswordMessage(data.error || "Unable to update password.");
        return;
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordMessage("Password updated successfully.");
    } catch {
      setPasswordMessage("Unable to update password right now.");
    } finally {
      setPasswordSaving(false);
    }
  };


  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      window.location.assign("/");
    }
  };

  const deleteAccount = async (event: FormEvent) => {
    event.preventDefault();
    setDeleteMessage("");

    if (deleteConfirmation !== "DELETE") {
      setDeleteMessage("Type DELETE exactly to confirm account deletion.");
      return;
    }

    setDeleteSaving(true);

    try {
      const response = await fetch("/api/auth/delete-account", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: deletePassword,
          confirmation: deleteConfirmation,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        setDeleteMessage(data.error || "Unable to delete your account.");
        return;
      }

      window.location.replace("/");
    } catch {
      setDeleteMessage("Unable to delete your account right now.");
    } finally {
      setDeleteSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="grid min-h-[70vh] place-items-center bg-white text-[#0B0F19]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#000B3D]/10 border-t-[#000B3D]" />
          <p className="mt-4 text-sm text-black/45">Loading account…</p>
        </div>
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-white text-[#0B0F19]">
      <section className="border-b border-[#000B3D]/10">
        <div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#000B3D]">Account</p>
              <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                {staffAccess ? "Your Bubbles & Bros. account and staff access." : "Everything about your detail, in one place."}
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-black/45 sm:text-base">
                {staffAccess
                  ? "Manage your profile and password, review the permissions assigned to you, or return to the Staff Dashboard."
                  : "View your account information, follow the status of your detailing requests, and manage your password."}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {user.role !== "owner" && (
                <a href={staffAccess ? "/admin/dashboard" : "/dashboard"} className="rounded-full border border-[#000B3D]/15 px-5 py-3 text-sm font-semibold text-black/70 transition hover:border-[#000B3D]/30 hover:text-[#0B0F19]">
                  {staffAccess ? "Staff Dashboard" : "Dashboard"}
                </a>
              )}
              <a href="/contact" className="rounded-full bg-[#000B3D] px-5 py-3 text-sm font-semibold text-[#0B0F19] transition hover:bg-[#000B3D]">
                Request a Detail
              </a>
              <button
                type="button"
                onClick={logout}
                className="rounded-full border border-[#000B3D]/15 px-5 py-3 text-sm font-semibold text-black/60 transition hover:border-red-400/35 hover:bg-red-500/[0.06] hover:text-red-700"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1280px] gap-6 px-5 py-10 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:py-14">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#000B3D]/10 bg-[#F5F7FB] p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/35">Account information</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.025em]">Profile</h2>
              </div>
              <div className="grid h-11 w-11 place-items-center rounded-full border border-[#000B3D]/20 bg-[#000B3D]/10 text-sm font-semibold text-[#000B3D]">
                {user.name?.slice(0, 1).toUpperCase() || "C"}
              </div>
            </div>

            <form onSubmit={saveProfile} className="mt-7 space-y-5">
              <label className="block">
                <span className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-black/40">Name</span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  className="w-full rounded-2xl border border-[#000B3D]/10 bg-[#F4F7FB] px-4 py-3.5 text-sm text-[#0B0F19] outline-none transition focus:border-[#000B3D]/60"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-black/40">Email</span>
                <input
                  value={user.email}
                  readOnly
                  className="w-full cursor-not-allowed rounded-2xl border border-[#000B3D]/10 bg-[#F7F9FC] px-4 py-3.5 text-sm text-black/50 outline-none"
                />
                <span className="mt-2 block text-xs leading-5 text-black/30">Email changes are currently handled by Bubbles & Bros.</span>
              </label>

              {profileMessage && (
                <p className="rounded-2xl border border-[#000B3D]/10 bg-[#F7F9FC] px-4 py-3 text-sm text-black/65">{profileMessage}</p>
              )}

              <button
                type="submit"
                disabled={profileSaving}
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#F1F4F8]5 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {profileSaving ? "Saving…" : "Save Profile"}
              </button>
            </form>
          </section>

          <section className="rounded-[28px] border border-[#000B3D]/10 bg-[#F5F7FB] p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/35">Security</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.025em]">Change password</h2>
            <p className="mt-2 text-sm leading-6 text-black/40">Use at least 8 characters for your new password.</p>

            <form onSubmit={changePassword} className="mt-7 space-y-4">
              <input
                type="password"
                autoComplete="current-password"
                placeholder="Current password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                required
                className="w-full rounded-2xl border border-[#000B3D]/10 bg-[#F4F7FB] px-4 py-3.5 text-sm text-[#0B0F19] placeholder:text-black/25 outline-none transition focus:border-[#000B3D]/60"
              />
              <input
                type="password"
                autoComplete="new-password"
                placeholder="New password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                minLength={8}
                required
                className="w-full rounded-2xl border border-[#000B3D]/10 bg-[#F4F7FB] px-4 py-3.5 text-sm text-[#0B0F19] placeholder:text-black/25 outline-none transition focus:border-[#000B3D]/60"
              />
              <input
                type="password"
                autoComplete="new-password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                minLength={8}
                required
                className="w-full rounded-2xl border border-[#000B3D]/10 bg-[#F4F7FB] px-4 py-3.5 text-sm text-[#0B0F19] placeholder:text-black/25 outline-none transition focus:border-[#000B3D]/60"
              />

              {passwordMessage && (
                <p className="rounded-2xl border border-[#000B3D]/10 bg-[#F7F9FC] px-4 py-3 text-sm text-black/65">{passwordMessage}</p>
              )}

              <button
                type="submit"
                disabled={passwordSaving}
                className="rounded-full border border-[#000B3D]/15 px-5 py-3 text-sm font-semibold text-black/75 transition hover:border-[#000B3D]/30 hover:text-[#0B0F19] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {passwordSaving ? "Updating…" : "Update Password"}
              </button>
            </form>
          </section>

          {user.role === "user" && !staffAccess && (
            <section className="rounded-[28px] border border-red-500/20 bg-red-500/[0.035] p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-700/70">Danger zone</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.025em]">Delete account</h2>
              <p className="mt-2 text-sm leading-6 text-black/45">
                Permanently delete your Bubbles & Bros. account and account-linked data, including saved vehicles, booking history,
                quote conversations, and warranty records. This cannot be undone.
              </p>

              <form onSubmit={deleteAccount} className="mt-7 space-y-4">
                <input
                  type="password"
                  autoComplete="current-password"
                  placeholder="Current password"
                  value={deletePassword}
                  onChange={(event) => setDeletePassword(event.target.value)}
                  required
                  className="w-full rounded-2xl border border-red-400/15 bg-[#F7F9FC] px-4 py-3.5 text-sm text-[#0B0F19] placeholder:text-black/25 outline-none transition focus:border-red-400/55"
                />
                <label className="block">
                  <span className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-black/40">
                    Type DELETE to confirm
                  </span>
                  <input
                    value={deleteConfirmation}
                    onChange={(event) => setDeleteConfirmation(event.target.value)}
                    placeholder="DELETE"
                    autoComplete="off"
                    required
                    className="w-full rounded-2xl border border-red-400/15 bg-[#F7F9FC] px-4 py-3.5 text-sm text-[#0B0F19] placeholder:text-black/25 outline-none transition focus:border-red-400/55"
                  />
                </label>

                {deleteMessage && (
                  <p className="rounded-2xl border border-red-400/15 bg-red-500/[0.06] px-4 py-3 text-sm text-red-700/75">
                    {deleteMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={deleteSaving || deleteConfirmation !== "DELETE" || !deletePassword}
                  className="rounded-full border border-red-400/35 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-700 transition hover:border-red-400/60 hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {deleteSaving ? "Deleting account…" : "Permanently Delete Account"}
                </button>
              </form>
            </section>
          )}
        </div>

        {staffAccess ? (
          <section className="rounded-[28px] border border-[#000B3D]/10 bg-[#F5F7FB] p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#000B3D]">Staff access</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.025em]">Your Bubbles & Bros. permissions</h2>
            <p className="mt-2 text-sm leading-6 text-black/40">Your dashboard access is controlled by the Owner. Changes take effect the next time a protected panel or API is opened.</p>

            <div className="mt-7 rounded-2xl border border-[#000B3D]/10 bg-[#F7F9FC] p-5">
              <p className="text-[10px] font-bold uppercase tracking-[.2em] text-black/35">Assigned roles</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {user.role === "admin" && <span className="rounded-full border border-[#000B3D]/25 bg-[#000B3D]/10 px-3 py-1.5 text-xs font-semibold text-[#000B3D]">Admin</span>}
                {customRoles.map((role) => <span key={role.id} className="rounded-full border border-[#000B3D]/10 bg-[#F4F7FB] px-3 py-1.5 text-xs font-semibold text-black/70">{role.name}</span>)}
                {user.role !== "admin" && !customRoles.length && <span className="text-sm text-black/35">Direct permissions only</span>}
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {STAFF_PERMISSIONS.map((permission) => {
                const allowed = staffPermissions.includes(permission.key);
                return (
                  <div key={permission.key} className={`rounded-2xl border p-4 ${allowed ? "border-emerald-400/15 bg-emerald-400/[.045]" : "border-[#000B3D]/[.08] bg-[#F7F9FC]"}`}>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold">{permission.label}</p>
                      <span className={`rounded-full px-2 py-1 text-[9px] font-bold uppercase ${allowed ? "bg-emerald-400/10 text-emerald-700" : "bg-[#F4F7FB] text-black/30"}`}>{allowed ? "Access" : "No access"}</span>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-black/35">{permission.description}</p>
                  </div>
                );
              })}
            </div>

            <a href="/admin/dashboard" className="mt-7 inline-flex rounded-full bg-[#000B3D] px-5 py-3 text-sm font-semibold text-[#0B0F19]">Open Staff Dashboard</a>
          </section>
        ) : (
        <section className="rounded-[28px] border border-[#000B3D]/10 bg-[#F5F7FB] p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#000B3D]">Detail status</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.025em]">Your requests</h2>
              <p className="mt-2 text-sm text-black/40">Updates appear here when Bubbles & Bros. changes your booking status.</p>
            </div>
            <div className="rounded-2xl border border-[#000B3D]/10 bg-[#F7F9FC] px-4 py-3 text-right">
              <p className="text-2xl font-semibold">{activeBookings.length}</p>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-black/35">Active</p>
            </div>
          </div>

          {bookings.length ? (
            <div className="mt-8 space-y-4">
              {bookings.map((booking) => {
                const status = booking.status.toLowerCase();
                const detail = statusDetails[status] ?? {
                  label: booking.status,
                  description: "Your request status has been updated.",
                  className: "border-[#000B3D]/10 bg-[#F4F7FB] text-black/70",
                };

                return (
                  <article key={booking.id} className="rounded-3xl border border-[#000B3D]/10 bg-[#F7F9FC] p-5 sm:p-6">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-lg font-semibold tracking-[-0.015em]">{booking.serviceName}</p>
                        <p className="mt-1 text-sm text-black/40">
                          {booking.vehicleYear} {booking.vehicleMake} {booking.vehicleModel} {booking.vehicleTrim || ""}
                        </p>
                        <div className="mt-4 grid gap-2 text-xs text-black/35 sm:grid-cols-2">
                          <p>Requested {new Date(booking.createdAt).toLocaleDateString()}</p>
                          <p>Preferred {booking.preferredDate || "Not specified"}</p>
                          <p className="sm:col-span-2 text-emerald-700/80">Booking total: {booking.quotedPrice != null ? `$${booking.quotedPrice.toFixed(2)}` : "Legacy booking"}</p>
                        </div>
                      </div>
                      <span className={`w-fit rounded-full border px-3.5 py-2 text-xs font-semibold ${detail.className}`}>
                        {detail.label}
                      </span>
                    </div>
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#000B3D]/10 pt-4">
                      <p className="text-sm leading-6 text-black/40">{detail.description}</p>
                      <a
                        href={`/booking-chat/${booking.id}`}
                        className="rounded-full border border-[#000B3D]/35 bg-[#000B3D]/10 px-4 py-2 text-xs font-semibold text-[#000B3D] transition hover:bg-[#000B3D]/20"
                      >
                        Message Bubbles & Bros.
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="mt-8 rounded-3xl border border-dashed border-[#000B3D]/10 px-6 py-12 text-center">
              <p className="text-lg font-semibold">No detail requests yet.</p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-black/40">When you request a service while signed in, its status will appear here.</p>
              <a href="/contact" className="mt-6 inline-block rounded-full bg-[#000B3D] px-5 py-3 text-sm font-semibold text-[#0B0F19] transition hover:bg-[#000B3D]">Request a Detail</a>
            </div>
          )}
        </section>
        )}
      </div>
    </main>
  );
}
