// src/app/entries/new/page.tsx
"use client";

import { useState } from "react";

export default function NewEntryPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<null | { draft: string; transcript: string }>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to create entry");
      setResult({ draft: data.entry.draft, transcript: data.entry.transcript });
      setText("");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">New Entry</h1>

      <textarea
        className="w-full border rounded p-3 min-h-[160px]"
        placeholder="Dump your thoughts here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        className="px-3 py-2 border rounded"
        onClick={handleSubmit}
        disabled={loading || !text.trim()}
      >
        {loading ? "Rewriting..." : "Rewrite & Save"}
      </button>

      {result && (
        <section className="border rounded p-3">
          <h2 className="font-medium mb-2">Draft</h2>
          <p className="whitespace-pre-wrap">{result.draft}</p>
          <h3 className="font-medium mt-4 mb-2">Original</h3>
          <p className="whitespace-pre-wrap text-sm opacity-80">{result.transcript}</p>
        </section>
      )}
    </main>
  );
}
