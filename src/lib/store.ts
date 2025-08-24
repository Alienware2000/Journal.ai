// src/lib/store.ts
export type Entry = {
  id: string;            // unique id for each entry
  createdAt: string;     // ISO string; easier to send as JSON
  source: "typed";       // later we can add "audio"
  transcript: string;    // raw text user typed
  draft: string;         // polished text (mock for now)
};

// Use a global to keep entries during dev/hot reloads
const g = global as unknown as { __entries?: Entry[] };
if (!g.__entries) g.__entries = [];

export const entries = g.__entries!;