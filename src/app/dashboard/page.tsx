// src/app/dashboard/page.tsx
import { entries } from "@/lib/store";

export default async function DashboardPage() {
  const list = [...entries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Your Entries</h1>
      <ul className="space-y-3">
        {list.map((e) => (
          <li key={e.id} className="border rounded p-3">
            <div className="text-sm opacity-70">{new Date(e.createdAt).toLocaleString()}</div>
            <div className="font-medium mt-1">Draft</div>
            <p className="whitespace-pre-wrap">{e.draft}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
