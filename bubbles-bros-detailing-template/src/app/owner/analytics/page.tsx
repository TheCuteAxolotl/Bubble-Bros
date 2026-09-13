import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { getPermissionSnapshotForUser } from "@/lib/permissions";

export const dynamic = "force-dynamic";

export default async function Analytics() {
  const tokenUser = await getCurrentUser();
  if (!tokenUser) redirect("/login");

  const dbUser = await prisma.user.findUnique({
    where: { id: tokenUser.id },
    select: { id: true, email: true, role: true, name: true },
  });
  if (!dbUser) redirect("/login");

  const access = await getPermissionSnapshotForUser(dbUser);
  if (access.role !== "owner" && !access.permissions.includes("analytics")) {
    redirect(access.staffAccess ? "/admin/dashboard" : "/dashboard");
  }

  const [bookings, quoteCount, acceptedQuotes, users] = await Promise.all([
    prisma.booking.findMany({ select: { status: true, quotedPrice: true, createdAt: true } }),
    prisma.quoteThread.count(),
    prisma.quoteThread.findMany({
      where: { status: { in: ["accepted", "booked"] }, quotedPrice: { not: null } },
      select: { quotedPrice: true, status: true },
    }),
    prisma.user.count({ where: { role: "user" } }),
  ]);

  const completed = bookings.filter((booking) => booking.status === "completed");
  const pending = bookings.filter((booking) => booking.status === "pending").length;
  const completedRevenue = completed.reduce((sum, booking) => sum + (booking.quotedPrice || 0), 0);
  const bookedValue = bookings
    .filter((booking) => !["cancelled"].includes(booking.status))
    .reduce((sum, booking) => sum + (booking.quotedPrice || 0), 0);
  const acceptedQuoteValue = acceptedQuotes.reduce((sum, quote) => sum + (quote.quotedPrice || 0), 0);

  const cards = [
    ["Total bookings", bookings.length],
    ["Pending requests", pending],
    ["Completed", completed.length],
    ["Quote chats", quoteCount],
    ["Customers", users],
    ["Active booking value", `$${bookedValue.toLocaleString()}`],
    ["Completed booking value", `$${completedRevenue.toLocaleString()}`],
    ["Accepted / booked quote value", `$${acceptedQuoteValue.toLocaleString()}`],
  ];

  return (
    <main className="min-h-screen bg-white px-6 py-10 text-[#0B0F19]">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-between gap-5">
          <div>
            <p className="text-xs uppercase tracking-[.28em] text-[#000B3D]">{access.role === "owner" ? "Owner" : "Staff"}</p>
            <h1 className="mt-2 text-4xl font-semibold">Analytics</h1>
            <p className="mt-2 text-black/45">Bookings, leads, customers, and exact booking totals.</p>
          </div>
          <a href={access.role === "owner" ? "/owner/dashboard" : "/admin/dashboard"} className="h-fit rounded-full border border-[#000B3D]/15 px-5 py-3 text-sm">Back</a>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(([key, value]) => (
            <div key={String(key)} className="rounded-[26px] border border-[#000B3D]/10 bg-[#F5F7FB] p-6">
              <p className="text-sm text-black/45">{key}</p>
              <p className="mt-3 text-4xl font-semibold">{value}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-black/30">
          Booking values use the exact total saved with each new booking. Payment processing is separate.
        </p>
      </div>
    </main>
  );
}
