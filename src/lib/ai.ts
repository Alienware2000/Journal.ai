// src/lib/ai.ts
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = [
  "You are a journaling assistant.",
  "Transform the raw transcript into a first-person draft that preserves the speaker’s voice and emotions.",
  "Do not add facts not present in the transcript.",
  "Keep it grounded, compassionate, and concise (150–300 words).",
].join(" ");

export async function rewriteDraft(transcript: string): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY");
  }

  // Keep the simplest shape: return plain text (the draft)
  const userPrompt = [
    "TRANSCRIPT (verbatim):",
    transcript,
    "",
    "Return ONLY the rewritten draft text. No preface, no JSON, no extra words.",
  ].join("\n");

  // Using a small, fast model is fine for now.
  const resp = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.4, // slightly creative, still faithful
  });

  const text = resp.choices[0]?.message?.content?.trim();
  if (!text) throw new Error("Empty draft from model");
  return text;
}
