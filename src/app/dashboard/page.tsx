// src/app/dashboard/page.tsx
import { prisma } from "@/lib/db";

export default async function DashboardPage() {
  const list = await prisma.entry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Your Entries</h1>
      {list.length === 0 ? (
        <p className="opacity-70">No entries yet. Create one on the “New Entry” page.</p>
      ) : (
        <ul className="space-y-3">
          {list.map((e) => (       
        <li key={e.id} className="border rounded p-3">
          <div className="text-sm opacity-70">{new Date(e.createdAt).toLocaleString()}</div>
          <div className="font-medium mt-1">
            <a className="underline" href={`/entries/${e.id}`}>Open entry</a>
          </div>
          <p className="whitespace-pre-wrap mt-2">{e.draft}</p>
        </li>
          ))}
        </ul>
      )}
    </main>
  );
}
