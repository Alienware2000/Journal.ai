import { prisma } from "@/lib/db";
import Link from "next/link";

type Props = { params: Promise<{ id: string }> }; // 👈 async params

export default async function EntryPage({ params }: Props) {
  // 1) resolve the params first
  const { id } = await params; // 👈 await before destructuring

  // 2) fetch the entry from your database
  const entry = await prisma.entry.findUnique({ where: { id } });

  // 3) handle not-found
  if (!entry) {
    return (
      <main className="max-w-2xl mx-auto p-6 space-y-4">
        <p className="text-lg">Entry not found.</p>
        <Link className="underline" href="/dashboard">
          Back to dashboard
        </Link>
      </main>
    );
  }

  // 4) render the entry
  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <Link className="underline" href="/dashboard">← Back</Link>

      <header>
        <h1 className="text-2xl font-semibold">Entry</h1>
        <p className="text-sm opacity-70">
          {new Date(entry.createdAt).toLocaleString()}
        </p>
      </header>

      <section className="border rounded p-3">
        <h2 className="font-medium mb-2">Draft</h2>
        <p className="whitespace-pre-wrap">{entry.draft}</p>
      </section>

      <section className="border rounded p-3">
        <h2 className="font-medium mb-2">Original (Transcript)</h2>
        <p className="whitespace-pre-wrap opacity-90">{entry.transcript}</p>
      </section>
    </main>
  );
}
