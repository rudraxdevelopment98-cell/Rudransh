import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminSubscribersPage() {
  const subscribers = await prisma.subscriber.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-h2 text-forest-deep">Subscribers</h1>
        <p className="text-ink/50">{subscribers.length} total</p>
      </div>

      {subscribers.length === 0 ? (
        <p className="mt-8 text-ink/50">No subscribers yet.</p>
      ) : (
        <div className="mt-8 overflow-x-auto border border-ink/10 bg-bone">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink/10 text-ink/50">
              <tr>
                <th className="px-5 py-3 font-normal">Email</th>
                <th className="px-5 py-3 font-normal">Joined</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s) => (
                <tr key={s.id} className="border-b border-ink/5">
                  <td className="px-5 py-3">{s.email}</td>
                  <td className="px-5 py-3 text-ink/50">
                    {formatDate(s.createdAt.toISOString())}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
