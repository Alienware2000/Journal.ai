// src/app/api/entries/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { CreateEntrySchema } from "@/lib/validation";
import { rewriteDraft } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = CreateEntrySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { transcript } = parsed.data;

    // Try AI rewrite, but don't fail the whole request if it errors.
    let draft: string;
    try {
      draft = await rewriteDraft(transcript);
    } catch (e) {
      console.error("[rewrite error]", e);
      // Fallback: a safe deterministic draft
      draft = `Here’s what I’m really trying to say:\n\n${transcript}`;
    }

    const entry = await prisma.entry.create({
      data: {
        source: "typed",
        transcript,
        draft,
      },
    });

    return NextResponse.json({ entry }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
