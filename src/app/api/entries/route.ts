// src/app/api/entries/route.ts
import { NextResponse } from "next/server";
import { entries, type Entry } from "@/lib/store";

export async function GET() {
  // Return entries newest-first
  const list = [...entries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return NextResponse.json({ entries: list });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  // Simple validation (we'll add Zod later)
  const transcript = typeof body?.transcript === "string" ? body.transcript.trim() : "";
  if (!transcript) {
    return NextResponse.json({ error: "transcript is required" }, { status: 400 });
  }

  // MOCK rewrite: this is where the AI call will go later
  const draft = `Here’s what I’m really trying to say:\n\n${transcript}`;

  const entry: Entry = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    source: "typed",
    transcript,
    draft,
  };

  entries.push(entry);

  return NextResponse.json({ entry }, { status: 201 });
}
